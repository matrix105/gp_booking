from rest_framework import serializers 
from . models import *
  
class ReactSerializer(serializers.ModelSerializer): 
#     class Meta: 
#         model = React 
#         fields = ['name', 'detail'] 
    class Meta: 
        model = Patient 
        fields = ['nhs_num', 'email','password','firstname','lastname','dob','phone','status']
#     class Doctor: 
#         model = Doctor 
#         fields = ['nhs_num','email','password','firstname','lastname','dob','phone']
#     class Booking: 
#         model = Booking 
#         fields = ['id','patient','date','time','doctor','notes']
#     class WorkingHour: 
#         model = WorkingHour 
#         fields = ['id','startTime','endTime','quantity'] 
 


