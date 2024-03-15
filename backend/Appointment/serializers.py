from rest_framework import serializers
from .models import Appointment
from datetime import date


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"

    def validate_appointment_date(self, value):
        current_date = date.today()
        if value < current_date:
            raise serializers.ValidationError("Appoinment date cannot be in the past")
        return value