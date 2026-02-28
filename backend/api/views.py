from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, viewsets, permissions
from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, LoginSerializer
from django.http import JsonResponse


class StudentSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class IsAdminUserOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff


class StudentViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_staff=False)
    serializer_class = StudentSerializer
    permission_classes = [IsAdminUserOnly]


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(
            {"message": "User created successfully", "username": user.username},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def test_view(request):
    return JsonResponse({"message": "API working successfully"})


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Login successful",
            "username": user.username,
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])  
@permission_classes([IsAuthenticated])
def protected(request):
    return Response({
        "message": "Protected route accessed",
        "user": request.user.username
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_role(request):
    return Response({
        "username": request.user.username,
        "is_staff": request.user.is_staff
    })
