from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from .serializers import CreateUserSerializer, UpdateUserSerializer, LoginSerializer
from knox import views as knox_views
from django.contrib.auth import login
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile


class CreateUserAPI(CreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = (AllowAny,)

    def perform_create(self, serializer):
        """
        This API is used to create a new user with the provided data. It includes functionality to handle profile images by resizing and compressing them.
        """
        profile_image = self.request.FILES.get('profile_image')
        if profile_image and profile_image.size > 1024 * 1024:  # Check if the size exceeds 1MB
            image = Image.open(profile_image)
            # Resize the image to a maximum size of 500x500
            image.thumbnail((500, 500))
            output = BytesIO()
            # Compress the image with JPEG format and 70% quality
            image.save(output, format='JPEG', quality=70)
            output.seek(0)
            profile_image = InMemoryUploadedFile(output, 'ImageField', f"{profile_image.name.split('.')[0]}.jpg",
                                                 'image/jpeg', output.getbuffer().nbytes, None)

        serializer.save(profile_image=profile_image)


class UpdateUserAPI(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateUserSerializer

    def put(self, request):
        """
        This API allows authenticated users to update their user profile information, including the profile image. The API expects a PUT request with the updated data in the request body.
        """
        data = request.data
        user = request.user

        # Get the user instance to update
        snippet = CustomUser.objects.get(id=user.id)

        # Check if profile_image field exists in the request data
        profile_image = data.get('profile_image')
        if profile_image:
            if profile_image.size > 1024 * 1024:  # Check if the size exceeds 1MB
                image = Image.open(profile_image)
                # Resize the image to a maximum size of 500x500
                image.thumbnail((500, 500))
                output = BytesIO()
                # Compress the image with JPEG format and 70% quality
                image.save(output, format='JPEG', quality=70)
                output.seek(0)
                profile_image = InMemoryUploadedFile(output, 'ImageField', f"{profile_image.name.split('.')[0]}.jpg",
                                                     'image/jpeg', output.getbuffer().nbytes, None)

            data['profile_image'] = profile_image

        # Create the serializer instance with the retrieved user and modified data
        serializer = self.serializer_class(snippet, data=data)

        # Validate and save the data
        if serializer.is_valid():
            serializer.save()

            # Return the updated data in the response
            return Response(serializer.data, status=200)
        else:
            # Return validation errors if the data is not valid
            return Response(serializer.errors, status=400)


class GetUserAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        This API endpoint retrieves user information for an authenticated user.
        """
        user = request.user
        try:
            profile_image_url = user.profile_image.url if user.profile_image else None
        except ValueError:
            profile_image_url = None

        # Return the updated data in the response
        response_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'designation': user.designation,
            'profile_image': profile_image_url
        }
        return Response(response_data, status=200)


class LoginAPIView(knox_views.LoginView):
    permission_classes = (AllowAny, )
    serializer_class = LoginSerializer

    def post(self, request, format=None):
        """
        This API view is responsible for handling user login functionality. It extends the knox_views.LoginView class and allows anonymous access (AllowAny permission).
        """
        serializer = self.serializer_class(data=request.data)

        # Check if the serializer is valid
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data['user']
            login(request, user)

            # Call the parent's post method and get the response
            response = super().post(request, format=None)
        else:
            # Return a response with the serializer errors if the serializer is not valid
            return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response(response.data, status=status.HTTP_200_OK)
