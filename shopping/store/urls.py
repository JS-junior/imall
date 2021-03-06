from django.urls import  path, include
from django.contrib.auth import views as auth_views 
from django.conf.urls import url
from . import views

urlpatterns = [
  path("signup", views.signup, name="SIGNUP"),
  path('login', views.login, name="lOGIN"),
  path("get-user", views.get_user, name="GET-USER"),
  path("category", views.category, name="CATEGORY"),
  path("id", views.specific_product, name="SPECIFIC_PRODUCT"), 
  path("get-cart-total", views.get_cart_total, name="GET-CART-TOTAL"),
  path("get-cart", views.get_cart, name="GET-CART"),
  path("add-to-cart", views.add_to_cart, name="ADD_TO_CART"),
  path("delete-cart", views.delete_cart, name="DELETE_CART"),
  path("get-reviews", views.get_reviews, name="GET_REVIEWS"),
  path("add-review", views.add_review, name="ADD_REVIEW"),
  path("delete-review", views.delete_review, name="DELETE_REVIEW"),
  path("orders", views.orders, name="GET_ORDERS"),
  path("order", views.order_cart, name="ORDER"),
  path("buy-now", views.buy_now, name="BUY_NOW"),
  path("success", views.success, name="SUCCESS"),
  path("success-cart", views.success_cart, name="SUCCESS-CART"),
  path("refund", views.refund, name="REFUND"),
  path("search", views.search, name="SEARCH"),
  path("success-redirect", views.success_redirect, name="SUC_RED"),
  path("forgotpass", views.forgotpass, name="FORGOTPASS"),
 path('forgotpass/<token>', views.forgotView, name="FORGOT_PASSWORD"),
 path('resetpass/<token>', views.resetpass, name="RESET-PASSWORD"),
 path('add-push-token',views.add_push_token, name="PUSH-TOKEN"),
 path('notification', views.notify, name="PUSH-NOTIFICATION"),
 path('post', views.post, name="POST"),
 path('comment', views.comment, name="COMMENT"),
 path('likes', views.likes, name="LIKES"),
 path('delete-post', views.delete_post, name="DELETE-POST"),
 path('delete-comment', views.delete_comment, name="DELETE-COMMENT")
  ] 
