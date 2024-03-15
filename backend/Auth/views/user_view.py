import datetime
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from Auth.models import UserProfile
from Auth.serializers import UserSerializer, LoginUserSerializer


class UserListView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        users = UserProfile.objects.get(pk=request.user.pk)
        serializer = UserSerializer(users)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserRegisterView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        data = request.data
        print(data)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginUserView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        data = request.data
        
        serializer = LoginUserSerializer(data=data)
        context = {}
        if serializer.is_valid():
            context["data"] = serializer.validated_data
            data = serializer.validated_data
            context["access_token"] = data["access"]
            response = Response(context, status=status.HTTP_200_OK)
            response.set_cookie(
                key="refresh_token",
                value=data["refresh"],
                httponly=True,
                secure=False,
                expires=datetime.datetime.now() + datetime.timedelta(days=90),
            )
            return response
        context["message"] = serializer.errors
        return Response(context, status=status.HTTP_400_BAD_REQUEST)
