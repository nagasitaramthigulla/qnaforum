from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly

from . import serializers
from rest_framework.generics import CreateAPIView,RetrieveUpdateDestroyAPIView,RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from qna import models
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


class SignUp(CreateAPIView):
    serializer_class=serializers.UserSerializer
    def create(self,request,*args,**kwargs):
        try:
            serializer=serializers.UserSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user=User.objects.create_user(**serializer.validated_data)
            user.save()
            profile=models.UserProfile(user=user)
            profile.save()
            return obtain_jwt_token(request._request,*args,**kwargs)
        except Exception as ve:
            print(ve)
            return Response({"detail":str(ve)},status=status.HTTP_400_BAD_REQUEST)
        pass

class UserPermission(IsAuthenticated):
    def has_permission(self, request, view):
        try:
            return request.user.id==request.GET.get('pk')
        except:
            return False
        pass


class ManageUser(RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.UserSerializer
    queryset = User.objects.all()
    permission_classes = ((IsAuthenticated,))
    authentication_classes = ((JSONWebTokenAuthentication,))
    def check_object_permissions(self, request, obj):
        super(ManageUser,self).check_object_permissions(request,obj)
        if obj.id!=request.user.id:
            self.permission_denied(request,message="you do not have rights to access this information")

    def update(self, request, *args, **kwargs):
        try:
            user=self.get_object()
            serializer = serializers.UserSerializer ( user,data=request.data )
            serializer.is_valid ( raise_exception=True )
            user.set_password(raw_password=serializer.validated_data['password'])
            user.save()
            return Response({"detail":"password change sucessful"},status=status.HTTP_200_OK)
        except Exception as ve:
            print(ve)
            return Response( dict( detail=str( ve)), status=status.HTTP_400_BAD_REQUEST)

class GetUserProfile(RetrieveAPIView):
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()