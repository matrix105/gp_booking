from django.db import models 
from datetime import date
from datetime import time
from pony.orm import *

  
# Create your models here. 
  
  
class React(models.Model): 
    name = models.CharField(max_length=30) 
    detail = models.CharField(max_length=500)

db = Database()
db.bind(provider='sqlite', filename='../db.sqlite3', create_db=True)


class Patient(db.Entity):
    nhs_num = Required(int)
    email = Required(str, unique=True)
    password = Required(str)
    name = Optional(str)
    lastname = Optional(str)
    dob = Optional(str)
    phone = Optional(str)
    bookings = Set('Booking')
    notes = Optional(str)


class Booking(db.Entity):
    id = PrimaryKey(int, auto=True)
    patient = Required(Patient)
    date = Required(date)
    time = Required(time)
    doctor = Optional(str)
    notes = Optional(LongStr)


class Doctor(db.Entity):
    nhs_num = PrimaryKey(int, auto=True)
    email = Required(str)
    password = Required(str)
    name = Optional(str)
    lastname = Optional(str)
    dob = Optional(str)
    phone = Optional(str)


class WorkingHour(db.Entity):
    id = PrimaryKey(int, auto=True)
    startTime = Required(time)
    endTime = Required(time)
    quantity = Required(int, default=4)



db.generate_mapping(create_tables=True)