from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin, DestroyModelMixin, RetrieveModelMixin
from rest_framework.permissions import IsAdminUser, IsAuthenticated, SAFE_METHODS
from . import serializers
from .models import *
from rest_framework.views import APIView
from rest_framework import generics
from .utils import get_tokens_for_user
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from .models import CustomUser



class RegistrationView(generics.CreateAPIView):
    serializer_class = serializers.RegistrationSerializer
    queryset = CustomUser.objects.all()


class LoginView(generics.GenericAPIView):
    serializer_class = serializers.LoginSerializer
    queryset = CustomUser.objects.all()

    def post(self, request):
        if 'email' not in request.data or 'password' not in request.data:
            return Response({'msg': 'Credentials missing'}, status=status.HTTP_400_BAD_REQUEST)
        email = request.data.get("email", None)
        password = request.data.get("password", None)
        if email is not None and password is not None:
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)
                auth_data = get_tokens_for_user(request.user)
                return Response({'msg': 'Login Success', **auth_data}, status=status.HTTP_200_OK)
            return Response({'msg': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    serializer_class = serializers.LogoutSerializer
    queryset = CustomUser.objects.all()

    def post(self, request):
        logout(request)
        return Response({'msg': 'Successfully Logged out'}, status=status.HTTP_200_OK)


class ChangePasswordView(generics.GenericAPIView):
    serializer_class = serializers.PasswordChangeSerializer
    queryset = CustomUser.objects.all()
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True) #Another way to write is as in Line 17
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)



##############################################
class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer

    def get_permissions(self):
        if self.action in SAFE_METHODS:
            return [IsAuthenticated()]
        else:
            return [IsAdminUser()]


class ProducerViewSet(ModelViewSet):

    queryset = Producer.objects.all()
    serializer_class = serializers.ProducerSerializer

    def get_permissions(self):
        if self.action in SAFE_METHODS:
            return [IsAuthenticated()]
        else:
            return [IsAdminUser()]


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()

    def get_serializer_class(self):
        if self.action in SAFE_METHODS:
            return serializers.ShowProductSerializer
        else:
            return serializers.ProductSerializer

    def get_permissions(self):
        if self.action in SAFE_METHODS:
            return [IsAuthenticated()]
        else:
            return [IsAdminUser()]


class OrderViewSet(CreateModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet):
    queryset = Order.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action in SAFE_METHODS:
            return serializers.ShowOrderSerializer
        else:
            return serializers.OrderSerializer

    def list(self, request):
        qs = self.queryset.filter(user=request.user.id)
        ser = self.get_serializer(qs, many=True)
        return Response(ser.data, status=status.HTTP_200_OK)
