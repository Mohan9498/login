from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import login
from .serializers import RegisterSerializer,LoginSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.create_user()
        return Response({"mess"
        "age": "User created"})
    return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        return Response({"message": "Login successful"})
    return Response(serializer.errors, status=400)

@api_view(['GET'])  
@permission_classes([IsAuthenticated])
def protected(request):
    return Response({"message": "Protected route accessed"})
