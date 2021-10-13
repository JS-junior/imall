from django.contrib import admin
from .models import Product, Review, Cart, Order, Notification

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Cart)
admin.site.register(Order)
admin.site.register(Notification)
# Register your models here.
