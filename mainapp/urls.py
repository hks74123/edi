from django.urls import path
from . import views
from mainapp.views import *

urlpatterns = [
    path('',views.home),
    path('studentportal/',views.studentportal),
    path('educatorlogin/',views.educatorlogin),
    path('signup/',register.as_view()),
    path('login/',logginuser.as_view()),
    path('courses/',all_courses.as_view()),
    path('enrolle/<int:pid>/',enroll.as_view()),
    path('course/<int:pid>/',views.course_details),
    path('create/',views.create),
    path('create_course/',views.create_course),
    path('logout/',views.logout),
]
