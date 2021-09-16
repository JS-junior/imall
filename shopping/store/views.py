from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib import auth, messages
from django.core.mail import send_mail
from django.conf import settings
from .models import MyModel
from .forms import MyForm
import datetime
import stripe
import jwt

def signup(req):
  if req.method == "POST":
    username = req.POST["username"]
    password = req.POST["password"]
    email = req.POST["email"]

    if User.objects.filter(email=email).exists():
      return redirect("Signup")
    else:
      user = User.objects.create_user(username=username,password=password,email=email)
      user.save()
      return redirect("Login")
      
      
def login(req):
  if req.method == "POST":
    username = req.POST["username"]
    email = req.POST["email"]
    password = req.POST["password"]
    user = auth.authenticate(password=password,username=username,email=email)
    if user is not None:
      auth.login(request, user)
      return redirect("Home")
    else:
      return redirect("Error")


def logout(req):
  if not req.is_authenticated:
    return redirect("Login")
  elif req.method == "POST":
    auth.logout(req)
    return redirect("Login")
   
def all_cart_items(req):
  if not req.is_authenticated:
    return redirect("Login")
  elif req.method == "GET":
    products = Product.objects.all()
    return JsonResponse({product: product})
    
    
 def cart_item(req,id):
  if not req.is_authenticated:
    return redirect("Login")
  elif req.method == "POST":
    item = get_object_or_404(item,pk=id)
    product = item.objects.create(item=item)
    product.save()

    other_model.many.add(product)
    
def delete_cart_item(req,id):
  if not req.is_authenticated:
    return JsonResponse({ 'message':"no-login" })
  elif req.method == "POST":
    object = get_object_or_404(MyModel,pk=id)
    object.delete()
    return redirect("Home")



def success_payment(req):
  if not req.is_authenticated:
    return redirect("Login")
  elif req.method == "GET":
    session_id = req.GET.get("session_id")
    session = stripe.checkout.Session.retrieve(session_id)
    payment_intent_id = session["payment_intent"]
    return render(req,"success.html")
    
def refund_order_item(req,id):
  Orders.objects.filter(pk=id).update()
  refund = stripe.Refund.create(amount=amount, payment_intent=order.payment_id)