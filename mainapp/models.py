import re
from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User1(AbstractUser):
    is_user = models.BooleanField('Is_User', default=False)
    is_educator = models.BooleanField('Is_educator', default=False)


class Course(models.Model):
    educator = models.ForeignKey(User1,related_name='educator',on_delete=models.CASCADE)
    users = models.ManyToManyField(User1,related_name='users')
    name = models.CharField(max_length=50,null=True)
    content = models.TextField(null=True)
    image = models.FileField(upload_to='imgs',null=True,blank=True)
    description = models.TextField(null=True)
    
    def __str__(self):
        return self.name
