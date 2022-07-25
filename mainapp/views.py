from django.shortcuts import redirect, render
from rest_framework.response import Response
from rest_framework.status import *
from rest_framework.views import APIView
from .models import User1,Course
from django.contrib.auth.models import auth
from .serializers import User1,CourseSerializer
from django.contrib import messages


# Create your views here.
def home(request):
    if request.user.is_authenticated:
        if(request.user.is_user):
            return render(request,'all_courses.html')
        else:
            return render(request,'educator.html')
    else:
        return render(request,'home.html')


def studentportal(request):
    if request.user.is_authenticated:
        if(request.user.is_user):
            return render(request,'all_courses.html')
        else:
            return render(request,'educator.html')
    else:
        return render(request,'login.html')

def studentlogin(request):
    if request.user.is_authenticated:
        if(request.user.Is_User):
            return render(request,'all_courses.html')
        else:
            return render(request,'educator.html')
    else:
        return render(request,'login.html')

def educatorlogin(request):
    if request.user.is_authenticated:
        if(request.user.Is_User):
            return render(request,'all_courses.html')
        else:
            return render(request,'educator.html')
    else:
        return render(request,'edulogin.html')


class register(APIView):
    def post(self,request):

        data = request.data
        if data == None:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid Request'})

        try:
            first_name = data["f_name"]
            last_name = data['l_name']
            username = data["user_name"]
            mailid = data['mmail']
            password = data["pass"]
            password_again = data['pass1']
            type = data['type']
        except:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid data.'})
        
        try:
            user = User1.objects.get(username = username)
        except:
            user = None
        if(user is not None):
            return Response({'status':HTTP_200_OK,'message':'Username already exists'})
    
        if(password!=password_again):
            return Response({'status':HTTP_200_OK,'message':'Password does not match'})
        
        user=User1.objects.create_user(username = username,email=mailid, first_name=first_name,last_name=last_name,password = password)
        if(type=='Educator'):
            user.is_educator = True
        else:
            user.is_user = True
        user.save();

        return Response({'status':HTTP_200_OK,'message':'Success'})


class logginuser(APIView):
    def post(self,request):
        if request.user.is_authenticated: 
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'Already logined.'})
        try:
            data = request.data
            username = data["username"]
            password = data["password"]
            type = data['type']
        except:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':';Invalid Request.'})
        user = auth.authenticate(request,username=username,password=password)
        if user is None:
            return Response({'status':HTTP_200_OK,'message':'Invalid Username or Password'})
        if(type=='Educator'):
            if(user.is_educator):
                auth.login(request,user)
            else:
                return Response({'status':HTTP_200_OK,'message':'Invalid Request'})
        else:
            if(user.is_user):
                auth.login(request,user)
            else:
                return Response({'status':HTTP_200_OK,'message':'Invalid Request'})

        return Response({'status':HTTP_200_OK,'message':'success',})

class all_courses(APIView):
    def get(self,request):
        if request.user.is_authenticated:
            if(request.user.is_user):
                courses = Course.objects.all()
                course = []
                ncourses = []
                for i in courses:
                    if(request.user in i.users.all()):
                        course.append(i)
                    else:
                        ncourses.append(i)
                serializer = CourseSerializer(course,many=True)
                serializer1 = CourseSerializer(ncourses,many=True)
                return Response({'status':200,'message':'success','data':serializer1.data,'ndata':serializer.data})
            else:
                courses = Course.objects.filter(educator = request.user)
                serializer = CourseSerializer(courses,many=True)
                return Response({'status':200,'message':'success','data':serializer.data})
        else:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'need to login first'})


class enroll(APIView):
    def get(self,request,pid):
        if request.user.is_authenticated:
            if(request.user.is_user):
                course = Course.objects.get(id = pid)
                if(course is None):
                    return Response({'status':HTTP_400_BAD_REQUEST,'message':';Invalid Request.'})
                else:
                    course.users.add(request.user)
                    return Response({'status':200,'message':'success'})
            else:
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid Request.'})
        else:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'Need to login first'})
        
def course_details(request,pid):
    if request.user.is_authenticated:
        course = Course.objects.filter(id=pid)
        return render(request,'course_details.html',{'data':course})
    else:
        return redirect('/')


def create(request):
    if request.user.is_authenticated:
            if(request.user.is_user):
                return redirect('/')
            else:
                return render(request,'create.html')

def create_course(request):
    if request.user.is_authenticated:
            if(request.user.is_user):
                return redirect('/')
            else:
                try:
                    title=request.POST.get('title')
                    summary=request.POST.get('summary')
                    content=request.POST.get('content')
                except:
                    messages.error(request,'Please fill out all fields!!')
                    return render(request,"create.html")
                obj = Course.objects.create(educator = request.user,name = title, content = content,image = request.FILES['imgle'],description = summary)
                obj.save()
                messages.info(request,'Done!!')
                return render(request,"create.html")
    else:
        return redirect('/')


def logout(request):
    if request.user.is_authenticated:
        auth.logout(request)
        return redirect('/')
    else:
        return redirect('/')
