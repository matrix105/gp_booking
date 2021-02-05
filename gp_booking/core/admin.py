from django.contrib import admin
from . models import  Booking, Patient

# Register your models here.
admin.site.register(Booking)
admin.site.register(Patient)