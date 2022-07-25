from rest_framework.serializers import ModelSerializer
from .models import User1,Course

class UserSerializer(ModelSerializer):
    class Meta:
        model = User1
        fields = ['first_name','last_name','username','email',]

class CourseSerializer(ModelSerializer):
    users = UserSerializer(many=True)
    educator = UserSerializer()
    class Meta:
        model = Course
        fields = ["id","educator","description","image","content","name","users"]