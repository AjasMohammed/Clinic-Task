from django.db import models

class Appointment(models.Model):
    user = models.ForeignKey("Auth.UserProfile", verbose_name="User", on_delete=models.CASCADE)
    patient_name = models.CharField(max_length=100)
    age = models.IntegerField()
    appointment_date = models.DateField()
    doctor = models.ForeignKey("Auth.Doctor", verbose_name="Doctor", on_delete=models.CASCADE)

    class Meta:
        db_table = "appoinments"
        verbose_name = "Appoinment"
        verbose_name_plural = "Appoinments"

    def __str__(self):
        return f'{self.pk} - {self.patient_name}'
