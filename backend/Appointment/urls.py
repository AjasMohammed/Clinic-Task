from django.urls import path
from .views import AppointmentListView, AppointmentCreateView

urlpatterns = [
    path('', AppointmentListView.as_view()),
    path('create-appointment/', AppointmentCreateView.as_view()),
]
