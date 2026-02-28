from django.contrib import admin
from django.urls import path, include
from api.views import register, login_view, protected, StudentViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from django.http import HttpResponse

router = DefaultRouter()
router.register(r'students', StudentViewSet)

urlpatterns = [
    path('', lambda request: HttpResponse("Backend is running ")),

    path('admin/', admin.site.urls),

    path('register/', register, name='register'),
    path('login/', login_view, name='login'),

    path('api/', include('api.urls')),  # include app urls

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('protected/', protected),
] + router.urls
