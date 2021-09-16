from django.urls import  path, include
from . import views

urlpatterns = [
  path("signup", views.signup, name="Signup"),
  path("login", views.login, name="Login"),
  path("logout", views.logout, name="Logout"),
  path("home", views.home, name="Home"),
  path("error", views.error, name="Error"),
  path("settings", views.settings, name="Settings"),
  path("success", views.success, name="Success"),
  ] 
