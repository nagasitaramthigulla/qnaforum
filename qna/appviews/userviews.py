from django.contrib.auth import authenticate, login
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.shortcuts import redirect
from django.urls import reverse

from qna import models
from django.views import generic

class SignUpView(generic.CreateView):
    model = models.User
    fields = ['username','password','email','first_name','last_name']
    template_name = 'login.html'
    def get_context_data(self, **kwargs):
        context=super(SignUpView,self).get_context_data(**kwargs)
        context.update({"title":"SignUp","submit":"sign up"})
        return context
    def post(self, request, *args, **kwargs):
        user=models.User.objects.create_user(request.POST)
        user.save()
        up=models.UserProfile(user=user)
        up.save()
        login(request, user)
        return reverse('userview',kwargs={'pk':user.id})

class LoginView(generic.CreateView):
    model = models.User
    fields = ['username','password']
    template_name = 'login.html'
    def get_context_data(self, **kwargs):
        context=super(LoginView,self).get_context_data(**kwargs)
        context.update({"title":"Login","submit":"login"})
        return context
    def post(self, request, *args, **kwargs):
        user=authenticate(request=request)
        if user != None:
            login(request,user)
        return redirect('userview',pk=user.id)

class ManageUserView(LoginRequiredMixin,generic.UpdateView):
    login_url = '/login/'
    model = models.User
    fields = ['username','password']
    template_name = 'login.html'
    def get_context_data(self, **kwargs):
        context=super(ManageUserView,self).get_context_data(**kwargs)
        context.update({"title":"Login","submit":"update"})
        return context
    def put(self,request, *args, **kwargs):
        user=request.user
        user.set_password(request.data['password'])
        user.save()
        login(request,user)
        return redirect('userview',pk=user.id)

class RetriveUserView(LoginRequiredMixin,generic.DetailView):
    model = models.UserProfile
    login_url = '/login/'
    template_name = 'userprofile.html'
    def get_object(self, queryset=None):
        return self.request.user