from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import UserSerializer
from .models import CropRecommendation
from .serializers import CropRecommendationSerializer
import logging

class SignupView(APIView):
    def post(self, request):
        print('Request',request.data)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        print("Login request data:", request.data)


        username = request.data.get("username")
        password = request.data.get("password")
        print("Username:", username)
        print("Password:", password)
        # print("User from DB:", user)
        # print("Password correct:", user.check_password(password))

        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        if user.check_password(password):
            return Response({
                "message": "Login successful",
                "user": {
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# Set up logging
logger = logging.getLogger(__name__)

class SaveCropInputView(APIView):
    def post(self, request, *args, **kwargs):
        # Log incoming request data
        logger.info("Received data: %s", request.data)
        print("Received data:", request.data)   # Add this!

        # Deserialize the incoming data
        serializer = CropRecommendationSerializer(data=request.data)
        
        if serializer.is_valid():
            # Log success and save the data
            logger.info("Saving data: %s", serializer.validated_data)
            serializer.save()
            return Response({"message": "Data saved successfully"}, status=status.HTTP_201_CREATED)
        else:
            # Log validation errors
            logger.error("Validation failed: %s", serializer.errors)
            print("Validation Errors:", serializer.errors)   # Add this!
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
