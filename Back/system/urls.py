from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path, include


router = DefaultRouter()

router.register('producer', views.ProducerViewSet)
router.register('category', views.CategoryViewSet)
router.register('product', views.ProductViewSet)
router.register('order', views.OrderViewSet)

urlpatterns = [
    path('register/', views.RegistrationView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('change-password/<int:pk>/', views.ChangePasswordView.as_view(), name='change-password'),

    path('', include(router.urls)),
]
