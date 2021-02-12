from django.db import models 
from django.core.validators import MaxValueValidator, MinValueValidator 
from datetime import date
from datetime import time

  
# Create your models here. 
  
  
# class React(models.Model): 
#     name = models.CharField(max_length=30) 
#     detail = models.CharField(max_length=500)

# class Patient(models.Model):
#     nhs_num = models.IntegerField(primary_key=int)
#     #nhs_num = Required(int)
#     email = models.EmailField(max_length=254, unique=True)
#     #email = Required(str, unique=True)
#     password=models.CharField(max_length=30)
#     #password = Required(str)
#     firstname= models.CharField(max_length=50)
#     #name = Optional(str)
#     lastname=models.CharField(max_length=50)
#     #lastname = Optional(str)
#     dob=models.DateField()
#     #dob = Optional(str)
#     phone= models.IntegerField(validators=[MinValueValidator(999999999), MaxValueValidator(9999999999)])
#     #phone = Optional(str)
#     bookings= models.SET('Booking')
#     #bookings = Set('Booking')
#     status= models.BooleanField(default=False)
#     notes= models.CharField(max_length=9999)
#     #notes = Optional(str)

# class Doctor(models.Model):
#     nhs_num = models.IntegerField(primary_key=int)
#     #nhs_num = PrimaryKey(int, auto=True)
#     email = models.EmailField(max_length=254, unique=True)
#     #email = Required(str)
#     password=models.CharField(max_length=30)
#     #password = Required(str)
#     firstname=models.CharField(max_length=50)
#     #name = Optional(str)
#     lastname=models.CharField(max_length=50)
#     #lastname = Optional(str)
#     dob=models.DateField()
#     #dob = Optional(str)
#     phone= models.IntegerField(validators=[MinValueValidator(999999999), MaxValueValidator(9999999999)])
#     #phone = Optional(str)

# class Booking(models.Model):
#     id=models.IntegerField(primary_key=int,auto_created=True)
#     #id = PrimaryKey(int, auto=True)
#     patient= models.ForeignKey(Patient,on_delete=models.CASCADE)
#     #patient = Required(Patient)
#     date=models.DateField()
#     #date = Required(date)
#     time=models.TimeField()
#     #time = Required(time)
#     doctor=models.ForeignKey(Doctor,on_delete=models.CASCADE)
#     #doctor = Optional(str)
#     notes=models.CharField(max_length=9999)
#     #notes = Optional(LongStr)


# class WorkingHour(models.Model):
#     id=models.IntegerField(primary_key=int,auto_created=True)
#     #id = PrimaryKey(int, auto=True)
#     startTime=models.TimeField()
#     #startTime = Required(time)
#     endTime=models.TimeField()
#     #endTime = Required(time)
#     quantity=models.IntegerField(default=4)
#     #quantity = Required(int, default=4)

class Patient(models.Model):

    nhs_num=models.IntegerField()
    email= models.CharField(max_length=100)
    #salt= b'\xd4\xb0e\x1e\xc3]\xaa9K\x15\xbd\x1c\x9c\x0bCo\x92\x87B\x1dyl1\xd2\xc2\xce\xa2\xed_\xf3\x04\x80'
    #pass_keey=models.CharField(max_length=120)
    password=models.CharField(max_length=120)
    firstname=models.CharField(max_length=254)
    lastname=models.CharField(max_length=254)
    dob=models.DateField()
    phone=models.IntegerField()
    status=models.BooleanField(default=False)

    def __str__(self):
        return self.firstname
