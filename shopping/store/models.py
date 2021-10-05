from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

categories = (
  ("L", "laptop"),
  ("PC", "computer"),
  ("CPU", "cpu"),
  ("SHI", "shirt"),
  ("CTH", "clothes"),
  ("MOB","mobile"),
  ("CAM", "camera"),
  ("APP", "appliances"),
  ("TAB","tablet"),
  ("HOM","home_decorators"),
  ("MED","medicines"),
  ("STA","stationery"),
  ("GRO","grocery"),
  ("CUT","cutlery"),
  ("GC","gaming_consoles"),
  ("PCA", "computer_accessories"),
  ("SPE", "spectacles"),
  ("BUK", "books"),
  ("WAT","watch"),
  ("TUL", "tools"),
  ("DIS", "dishes"),
  ("ACS", "accessories"),
  ("ESS", "essentials")
  )

class Product(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=50)
  desc = models.TextField(max_length=200)
  discount = models.IntegerField()
  image = models.TextField()
  category = models.CharField(choices=categories, max_length=3)
  seller = models.ForeignKey(User,on_delete=models.CASCADE)
  price = models.IntegerField()
  
  def __str__(self):
      return "%s %s %s %s %s %s %s %s" % (self.id,self.name,self.desc,self.discount,self.image,self.seller,self.price,self.category)

class Review(models.Model):
  id = models.AutoField(primary_key=True)
  review = models.TextField(max_length=200)
  product = models.ForeignKey(Product, on_delete=models.CASCADE)
  user = models.CharField(max_length=50)
  rating = models.IntegerField()
  
  def __str__(self):
      return "%s %s %s %s %s" % (self.id,self.review,self.user,self.product,self.rating)

class Cart(models.Model):
  id = models.AutoField(primary_key=True)
  timestamp = models.DateTimeField(default=now)
  user = models.ForeignKey(User,on_delete=models.CASCADE)
  product = models.ForeignKey(Product,on_delete=models.CASCADE)
  def __str__(self):
      return "%s %s %s %s" % (self.id,self.timestamp,self.user,self.product)


class Order(models.Model):
  id = models.AutoField(primary_key=True)
  status = models.CharField(max_length=50)
  quantity = models.IntegerField()
  timestamp = models.DateTimeField(default=now)
  user = models.ForeignKey(User,on_delete=models.CASCADE)
  product = models.ForeignKey(Product,on_delete=models.CASCADE)
  location = models.CharField(max_length=25)
  state = models.CharField(max_length=25)
  intent_id = models.CharField(max_length=250)
  type = models.CharField(max_length=25)
  country = models.CharField(max_length=25)
  total = models.IntegerField()
  
  def __str__(self):
      return "%s %s %s %s %s %s %s %s %s %s %s %s" % (self.id,self.status,self.quantity,self.timestamp,self.user,self.product,self.location,self.state,self.country,self.type,self.total,self.intent_id)
