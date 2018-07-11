from django.urls import path
from .appviews import userviews
from rest_framework_jwt.views import refresh_jwt_token

urlpatterns=[
    path('',userviews.RetriveUserView.as_view(),name="userview"),
    path(r'login/',userviews.LoginView.as_view(),name="login"),
    path(r'signup/',userviews.SignUpView.as_view(),name="signup"),
]