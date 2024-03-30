from django.conf.urls import url
from authAPI import views

urlpatterns = [
    url(r'register', views.register),
]