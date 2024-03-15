from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from Auth.views import UserListView, UserRegisterView, LoginUserView, DoctorView


urlpatterns = [
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("user-profile/", UserListView.as_view(), name="user_profile"),
    path("register-user/", UserRegisterView.as_view(), name="register_user"),
    path("login-user/", LoginUserView.as_view(), name="login_user"),
    path("doctors-list/", DoctorView.as_view(), name="doctors"),
]
