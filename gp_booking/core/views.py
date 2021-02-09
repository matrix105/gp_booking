from django.shortcuts import render 
from rest_framework.views import APIView 
from . models import *
from rest_framework.response import Response 
from . serializer import *
from django.db import connection
import hashlib, os
# Create your views here. 
  
class ReactView(APIView): 
    
    serializer_class = ReactSerializer 
  
    def get(self, request): 
        detail = [ {"name": detail.name,"detail": detail.detail}  
        for detail in React.objects.all()] 
        return Response(detail) 
  
    def post(self, request): 
  
        serializer = ReactSerializer(data=request.data) 
        if serializer.is_valid(raise_exception=True): 
            serializer.save() 
            return  Response(serializer.data) 


class login():
    username='123423'
    password='1234567890'
    salt = b'\xd4\xb0e\x1e\xc3]\xaa9K\x15\xbd\x1c\x9c\x0bCo\x92\x87B\x1dyl1\xd2\xc2\xce\xa2\xed_\xf3\x04\x80'
    new_key= hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000,dklen=128)

    def login(nhs_num,password,salt):
        with connection.cursor() as cursor:
        #cursor.execute("UPDATE bar SET foo = 1 WHERE baz = %s", [self.baz])
            cursor.execute("SELECT nhs_num,password FROM core_Patient WHERE nhs_num = %s", [nhs_num])
            row = cursor.fetchone()
            key= hashlib.pbkdf2_hmac('sha256', row[1].encode('utf-8'), salt, 100000,dklen=128)
            if password==key:
                print("True")
            else:
                print("False")
            print(row[1])

    login(username,new_key,salt)

# class register():
    
#     nhs_num='1234235'
#     email='deepesg@emael.com'
#     salt = b'\xd4\xb0e\x1e\xc3]\xaa9K\x15\xbd\x1c\x9c\x0bCo\x92\x87B\x1dyl1\xd2\xc2\xce\xa2\xed_\xf3\x04\x80'
#     pass_key='1234567890'
#     password=new_key= hashlib.pbkdf2_hmac('sha256', pass_key.encode('utf-8'), salt, 100000,dklen=128)
#     firstname='Deepesh'
#     lastname='Patel'
#     dob='2000-12-05'
#     phone='1234567890'
#     status=False

#     def register(nhs_num,email,password,firstname,lastname,dob,phone,status):
#         entry=Patient.objects.create(nhs_num=nhs_num,email=email,password=password,firstname=firstname,lastname=lastname,dob=dob,phone=phone,status=status)

#     register(nhs_num,email,password,firstname,lastname,dob,phone,status)



    