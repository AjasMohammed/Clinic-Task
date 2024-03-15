from django.db import models


class Doctor(models.Model):
    name = models.CharField(max_length=100)
    speciality = models.CharField(max_length=100)
    department = models.CharField(max_length=100)

    class Meta:
        db_table = "doctors"
        verbose_name = "Doctor"
        verbose_name_plural = "Doctors"

    def __str__(self):
        return self.name
