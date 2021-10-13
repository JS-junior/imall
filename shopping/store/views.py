from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404,render, redirect
from django.contrib.auth.models import User
from django.contrib import auth, messages
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
from functools import wraps
from django.template.loader import get_template
from .models import Product, Cart, Order, Review, Notification
from django.core import serializers
from django.template import Context
from django.core.exceptions import ObjectDoesNotExist
from django.template.loader import render_to_string
from exponent_server_sdk import (
    DeviceNotRegisteredError,
    PushClient,
    PushMessage,
    PushServerError,
    PushTicketError,
)
from requests.exceptions import ConnectionError, HTTPError
from django.core.mail import EmailMessage, EmailMultiAlternatives
import datetime
import stripe
import jwt
import json

stripe.api_key = settings.STRIPE_SECRET_KEY
base_url = settings.BASE_URL


def send_push_message(token, message, extra=None):
  try:
    response = PushClient().publish(PushMessage(to=token,body=message,data=extra))
  except PushServerError as exc:
    # Encountered some likely formatting/validation error.
    rollbar.report_exc_info(extra_data={'token': token,'message': message,'extra': extra,'errors': exc.errors,'response_data': exc.response_data })
    raise
  except (ConnectionError, HTTPError) as exc:
    # Encountered some Connection or HTTP error - retry a few times in
    # case it is transient.
    rollbar.report_exc_info(extra_data={'token': token, 'message': message, 'extra': extra})
    raise self.retry(exc=exc)
  try:
      # We got a response back, but we don't know whether it's an error yet.
      # This call raises errors so we can handle them with normal exception
      # flows.
    response.validate_response()
  except DeviceNotRegisteredError:
      # Mark the push token as inactive
    from notifications.models import PushToken
    PushToken.objects.filter(token=token).update(active=False)
  except PushTicketError as exc:
        # Encountered some other per-notification error.
    rollbar.report_exc_info(
    extra_data={'token': token,'message': message,'extra':extra,'push_response': exc.push_response._asdict()})
    raise self.retry(exc=exc)
    

def verify_token(f):
  @wraps(f)
  def decorated(req,*args, **kwargs):
    token = req.GET.get("token")
    if not token:
      return JsonResponse({ "message": "token is missing" })
    else:
      try:
        data = jwt.decode(token,settings.SECRET_KEY, algorithms=["HS256"])
      except:
        return JsonResponse({ "error": "an problem occured while decoding token"})
    return f(req,*args,**kwargs)
  return decorated


@csrf_exempt
def signup(req):
  if req.method == "POST":
    try:
      username = req.POST["username"]
      password = req.POST["password"]
      email = req.POST["email"]

      if User.objects.filter(email=email).exists():
        return JsonResponse({ "message" : "email already exists" })
      else:
        user = User.objects.create_user(username=username,password=password,email=email)
        user.save()
        return JsonResponse({ "message": "signup successful" })
    except Exception as e:
      print(e)
      return JsonResponse({ 'error': "error" })
    
@csrf_exempt
def login(req):
  if req.method == "POST":
    try:
      username = req.POST["username"]
      password = req.POST["password"]
      email = req.POST["email"]
      user = auth.authenticate(username=username,password=password)
      if user is not None:
        if User.objects.filter(email=email).exists():
          token = jwt.encode({"email": email}, settings.SECRET_KEY, algorithm="HS256")
          return JsonResponse({ "token": token })
        else:
          return JsonResponse({ "message": "email not found"})
      else:
        return JsonResponse({ "message": "email not found"})
    except Exception as e:
      print(e)
      return JsonResponse({ "error": "error" })
      

def specific_product(req):
  if req.method == "GET":
    id = req.GET.get("id")
    products = Product.objects.filter(pk=id)
    data = serializers.serialize("json", products)
    return HttpResponse(data, content_type='application/json')


def category(req):
  if req.method == "GET":
    cat = req.GET.get("cat")
    products = Product.objects.filter(category=cat)
    data = serializers.serialize("json", products)
    return HttpResponse(data, content_type='application/json')
  
def get_reviews(req):
  if req.method == "GET":
    id = req.GET.get('id')
    product = get_object_or_404(Product, pk=id)
    reviews = Review.objects.select_related().filter(product=product)
   # reviews = Review.objects.filter(product=product)
    data = serializers.serialize("json", reviews)
   
    return HttpResponse(data, content_type='application/json')


def get_user(req):
  if req.method == "GET":
    token = req.GET.get("token")
    decoded = jwt.decode(token,settings.SECRET_KEY, algorithms=["HS256"])
    user = get_object_or_404(User, email=decoded["email"])
    data = { "uid": user.pk, "name": user.username, "email": decoded["email"] }
    return JsonResponse(data)

@csrf_exempt
@verify_token
def add_review(req):
  if req.method == "POST":
    review = req.POST['review']
    rating = req.POST['rating']
    pid = req.POST['pid']
    token = req.GET.get("token")
    uid = jwt.decode(token,settings.SECRET_KEY, algorithms=["HS256"])
    user = get_object_or_404(User,email=uid["email"])
    product = get_object_or_404(Product,pk=pid)
    model = Review.objects.create(review=review, product=product, rating=rating, user=user.username)
    model.save()
    return JsonResponse({ "message": "review added" })

@csrf_exempt
@verify_token
def add_to_cart(req):
  if req.method == "POST":
      pid = req.POST["pid"]
      token = req.GET.get("token")
      product = get_object_or_404(Product, pk=pid)
      decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
      user = get_object_or_404(User, email=decoded["email"])
      cart = Cart.objects.create(user=user, product=product)
      cart.save()
      return JsonResponse({"message": "added to cart"})

@csrf_exempt
@verify_token  
def delete_review(req):
  if req.method == "POST":
    id = req.POST["pid"]
    object = get_object_or_404(Review,pk=id)
    object.delete()
    return JsonResponse({ "message": "review removed"})

@verify_token
def get_cart(req):
  if req.method == "GET":
    token = req.GET.get('token')
    decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    user = get_object_or_404(User, email=decoded["email"])
    carts = Cart.objects.filter(user=user)
    data = []
    for cart in carts:
      data.append({ "id": cart.id,"price": cart.product.price, "name": cart.product.name, "image": cart.product.image, "seller": cart.product.seller.username })
    return JsonResponse({ "message": data })
    
@csrf_exempt
@verify_token
def delete_cart(req):
  if req.method == "POST":
    id = req.POST['id']
    cart = get_object_or_404(Cart,pk=id)
    cart.delete()
    return JsonResponse({ "message":"cart deleted" })

@verify_token   
def get_cart_total(req):
  if req.method == "GET":
    total_list = []
    token = req.GET.get("token") 
    decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    user = get_object_or_404(User, email=decoded["email"])
    carts = Cart.objects.filter(user=user)
    for cart in carts:
       total_list.append(cart.product.price)
    total = sum(total_list)
    quantity = len(total_list)
    msg = { "total": total, "quantity": quantity, "user": user.username }
    return JsonResponse({ "message": msg})


def success(req):
  if req.method == "GET":
    id = req.GET.get("id")
    session_id = req.GET.get("session_id")
    session = stripe.checkout.Session.retrieve(session_id)
    payment_intent_id = session["payment_intent"]
    Order.objects.filter(pk=id).update(intent_id=payment_intent_id)
    return redirect("SUC_RED")
 
def success_cart(req):
  if req.method == "GET":
    session_id = req.GET.get("session_id")
    session = stripe.checkout.Session.retrieve(session_id)
    payment_intent_id = session["payment_intent"]
    orders = Order.objects.filter(type="cart")
    for order in orders:
      Order.objects.filter(pk=order.id).update(intent_id=payment_intent_id)
    return redirect("SUC_RED")

def success_redirect(req):
  if req.method == "GET":
    return JsonResponse({ "message": "done!" })
    
@csrf_exempt
@verify_token
def order_cart(req):
  if req.method == "POST":
    token = req.GET.get("token") 
    decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    user = get_object_or_404(User, email=decoded["email"])
    client_secret = req.POST["secret"]
    location = req.POST["location"]
    state = req.POST["state"]
    total = req.POST["total"]
    country = req.POST["country"]
    carts = Cart.objects.filter(user=user)
    quantity = req.POST["quantity"]
    status = "Delivered"
    for cart in carts:
      order = Order.objects.create(product=cart.product,location=location,state=state,status=status,country=country,quantity=quantity,type="cart",total=cart.product.price,user=user) 
      order.save()
      cart.delete()
    session = stripe.checkout.Session.create(
    payment_method_types=["card"],
    line_items=[{
        'price_data': { 'currency': 'inr', 
        'product_data': { 'name': 'cart' },
        'unit_amount': total },
        'quantity': quantity,}],
      mode="payment",
       success_url= base_url + "/success-cart?session_id={CHECKOUT_SESSION_ID}",
        cancel_url= base_url + "/error")
    subject = "RN eshop receipt"
    message = "You have ordered a package 📦 "  + " \n amount: " + str(total) + "\n quantity: " + str(quantity)
    receiver = []
    receiver.append(decoded["email"])
    EmailMessage(subject,message,to=receiver).send()
    return JsonResponse({ "url": session.url, "message": "ordered"})
    
@csrf_exempt
@verify_token
def buy_now(req):
  if req.method == "POST":
    token = req.GET.get("token")
    decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    user = get_object_or_404(User, email=decoded["email"])
    pid = req.POST["pid"]
    client_secret = req.POST["secret"]
    location = req.POST["location"]
    state = req.POST["state"]
    country = req.POST["country"]
    total = req.POST["total"]
    product = get_object_or_404(Product, pk=pid)
    quantity = req.POST["quantity"]
    status = "Delivered"
    order = Order.objects.create(product=product,location=location,state=state,status=status,type='product',country=country,quantity=quantity,total=total,user=user)
    order.save()
    session = stripe.checkout.Session.create(
    payment_method_types=["card"],
    line_items=[{
        'price_data': { 'currency': 'inr', 
        'product_data': { 'name': 'order' },
        'unit_amount': total },
        'quantity': 1 }],
      mode="payment",
     success_url= base_url + "/success?session_id={CHECKOUT_SESSION_ID}&id=" + str(order.id),
        cancel_url= base_url + "/error")
    subject = "RN eshop receipt"
    message = "You have ordered " + str(order.product.name) + " of rupees " + str(total)
    receiver = []
    receiver.append(decoded["email"])
    EmailMessage(subject,message,to=receiver).send()
    return JsonResponse({ "url": session.url, "message": "ordered" })
    


def orders(req):
  if req.method == "GET":
    data = []
    token = req.GET.get("token") 
    decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    user = get_object_or_404(User, email=decoded["email"])
    orders = Order.objects.filter(user=user)
    for order in orders:
      data.append({"id": order.id, "product": order.product.name, "price": order.product.price, "location": order.location, "quantity": order.quantity, "timestamp": order.timestamp, "status": order.status, "image": order.product.image })
    return JsonResponse({ "message": data })
 
 
@csrf_exempt
def search(req):
  if req.method == "POST":
    query = req.POST["query"]
    data = []
    products = Product.objects.filter(name__icontains=query)
    for product in products:
      data.append({"name": product.name, "id": product.id,"image": product.image, "desc": product.desc, "discount": product.discount, "price": product.price })
    return JsonResponse({ "message": data })
   
@csrf_exempt
@verify_token
def refund(req):
  if req.method == "POST":
    id = req.POST["id"]
    intent_id = ""
    orders = Order.objects.filter(pk=id)
    prices = []
    for order in orders:
      Order.objects.filter(id=order.id).update(status="refunded")
      prices.append(order.total)
      intent_id = order.intent_id
    total = sum(prices)
    stripe.Refund.create(amount=total,payment_intent=intent_id)
    return JsonResponse({ 'message': 'refunded' })


@csrf_exempt
def forgotpass(req):
  if req.method == "GET":
    return render(req, "reset.html", { 'token': token })
  if req.method == "POST":
    if User.objects.filter(email=req.POST["email"]).exists():
      subject = "Forgot password?"
      message = "Forgot your password"
      receiver = []
      receiver.append(req.POST["email"])
      token = jwt.encode({"email": req.POST["email"] }, settings.SECRET_KEY, algorithm="HS256")
      html_content = render_to_string('forgotpass.html', {'token': token })
      email = EmailMultiAlternatives(subject,message,settings.EMAIL_HOST_USER, receiver)
      email.attach_alternative(html_content, "text/html")
      email.send()
      return JsonResponse({"message": "check your mail"})
 
def forgotView(req,token):
  if req.method == "GET":
    return render(req, "reset.html", { 'token': token })  

def resetpass(req,token):
  if req.method == "POST":
    decoded = jwt.decode(token, settings.SECRET_KEY, algorithms = ["HS256"])
    passwd = req.POST["password"]
    cpass = req.POST["cpass"]
    if passwd == cpass:
      user = get_object_or_404(User, email=decoded["email"])
      user.set_password(cpass)
      user.save()
      return JsonResponse({ "message": "password changed" })
    
@csrf_exempt
def notify(req):
  if req.method == "POST":
    message = req.POST["message"]
    notifications = Notification.objects.all()
    for notification in notifications:
      send_push_message(notification.token,message)
    
    return JsonResponse({ "message": "push notifications sended" })
    
@csrf_exempt    
@verify_token
def add_push_token(req):
  if req.method == "GET":
    push_token = req.GET.get("push-token")
    token = req.GET.get("token")
    decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    user = get_object_or_404(User, email=decoded["email"])
    Notification.objects.filter(token=push_token).delete()
    return JsonResponse({ "message":"notification turned off"})
      
  if req.method == "POST":
    token = req.GET.get("token") 
    decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    user = get_object_or_404(User, email=decoded["email"])
    push_token = req.POST["push-token"]
    notification = Notification.objects.create(user=user,token=push_token,turned=False)
    notification.save()
    print ("done!")
    return JsonResponse({ "message": "added push" })
    