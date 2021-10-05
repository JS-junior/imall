from django.contrib import admin
from .models import Product, Review, Cart, Order

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Cart)
admin.site.register(Order)
# Register your models here.
