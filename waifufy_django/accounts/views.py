from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer

# Create your views here.
class UserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        register_serializer = RegisterSerializer(data=request.data)
        if register_serializer.is_valid():
            new_user = register_serializer.save()
            if new_user:
                return Response(status=status.HTTP_201_CREATED)
        return Response(register_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

