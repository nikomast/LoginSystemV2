from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .serializers import CustomUserSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
import random
from django.core.cache import cache
from datetime import datetime, timedelta


User = get_user_model()

class RegistrationAPIView(APIView):
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

TWO_FA_CODES = {}

def generate_2fa_code(username):
    TWO_FA_CODES[username] = {'code': str(random.randint(100000, 999999)), 'expires': datetime.now() + timedelta(minutes=5)}
    return TWO_FA_CODES[username]['code']

class LoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            two_fa_code = generate_2fa_code(username)
            print(f"2FA Code for {user.username}: {two_fa_code}")  # For debugging, consider a more secure logging method for production
            user_details = {
                'username': user.username,
                'email': user.email,
            }
            return Response({'token': token.key, 'user': user_details, '2fa_required': True}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

class Verify2FAAPIView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        submitted_code = request.data.get('code')

        # Check if the user's 2FA code exists and is valid
        if username in TWO_FA_CODES:
            code_info = TWO_FA_CODES[username]
            if code_info['code'] == submitted_code and datetime.now() < code_info['expires']:
                # If valid, remove the code and return success response
                del TWO_FA_CODES[username]
                return Response({'message': '2FA Verified'}, status=status.HTTP_200_OK)
            else:
                # If code is invalid or expired
                return Response({'error': 'Invalid or Expired 2FA Code'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': '2FA Code Not Found'}, status=status.HTTP_400_BAD_REQUEST)
        

class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except (AttributeError, Token.DoesNotExist):
            return Response({"error": "Bad token"}, status=status.HTTP_400_BAD_REQUEST)
