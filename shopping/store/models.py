from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now


class Product(models.Model):
  id = models.AutoField(pk=True)
  name = models.CharField(max_length=50)
  desc = models.TextField(max_length=200)
  discount = models.IntegerField()
  image = models.TextField()
  seller = models.ForeignKey(User,on_delete=models.CASCADE)
  price = models.IntegerField()
    def__str__(self):
      return "%s %s %s %s %s %s %s %s" % 
(self.id,self.name,self.desc,self.discount,self.image,self.seller,self.reviews,self.price)

class Review(models.Model):
  id = models.AutoField(pk=True)
  review = models.TextField(max_length=200)
  user = models.ForeignKey(User,on_delete=models.CASCADE)
  rating = models.IntegerField()
    def__str__(self):
      return "%s %s %s %s" % 
(self.id,self.review,self.user,self.rating)

class Cart(models.Model):
  id = models.AutoField(pk=True)
  timestamp = models.DateTimeField(default=now)
  user = models.ForeignKey(User,on_delete=models.CASCADE)
  product = models.ForeignKey(Product,on_delete=models.CASCADE)
    def__str__(self):
      return "%s %s %s %s" % 
(self.tid,self.timestamp,self.user,self.product)


class Order(models.Model):
  id = models.AutoField(pk=True)
  status = models.CharField(max_length=50)
  quantity = models.Integer()
  timestamp = models.DateTimeField(default=now)
  user = models.ForeignKey(User,on_delete=models.CASCADE)
  product = models.ForeignKey(Product,on_delete=models.CASCADE)
  location = models.CharField()
  state = models.CharField()
  country = models.CharField()
  total = models.IntegerField()
    def__str__(self):
      return "%s %s %s %s %s %s %s %s %s %s" % 
(self.id,self.status,self.quantity,self.timestamp,self.user,self.product,self.location,self.state,self.country,self.total)
