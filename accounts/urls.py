from django.urls import path
from . import views
from knox.views import LogoutView


urlpatterns = [
    path('create-user/', views.CreateUserAPI.as_view()),
    path('update-user/', views.UpdateUserAPI.as_view()),
    path('get-user/', views.GetUserAPI.as_view()),
    path('login/', views.LoginAPIView.as_view()),
    
    path('logout/', LogoutView.as_view()), # This API handles user logout functionality by inheriting from the `LogoutView` class provided by Knox.

]
