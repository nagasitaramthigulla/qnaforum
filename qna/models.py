from annoying.fields import AutoOneToOneField
from django.contrib.auth.models import User
from django.db import models
from django.db.models import F
from django.utils.text import slugify
from django_mysql.models import ListCharField

# Create your models here.

class UserProfile(models.Model):
    user = AutoOneToOneField(to=User,on_delete=models.CASCADE,primary_key=True)
    points=models.IntegerField(default=0)
    
    def modify_reputation(self, added_points):
        """Core function to modify the reputation of the user profile."""
        self.points = F('points') + added_points
        self.save()

    def __str__(self):
        return self.user.username

class Question(models.Model):
    slug=models.SlugField(max_length=200)
    title=models.CharField(max_length=200,blank=False)
    description = models.TextField(max_length=500)
    date=models.DateTimeField(auto_now_add=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    tags=ListCharField(base_field=models.CharField(max_length=20),size=5,max_length=110)
    closed=models.BooleanField(default=False)
    upvotes=models.IntegerField(default=0)
    downvotes=models.IntegerField(default=0)
    points=models.IntegerField(default=0)
    acceptedanswer=models.IntegerField(default=None)

    def save(self,*args,**kwargs):
        if not self.id:
            self.slug=slugify(self.title)
            self.user.userprofile.modify_reputation(1)
        self.points=self.upvotes-self.downvotes
        super(Question, self).save(*args, **kwargs)

    def addvote(self,upvote):
        if upvote:
            self.upvotes+=1
            self.user.userprofile.modify_reputation(1)
        else:
            self.downvotes+=1
            self.user.userprofile.modify_reputation(-1)
        self.save()
    
    def __str__(self):
        return self.title
    
class Answer(models.Model):
    question=models.ForeignKey(Question,on_delete=models.CASCADE)
    answer=models.TextField(max_length=500)
    date=models.DateTimeField(auto_now_add=True)
    updated=models.DateTimeField(auto_now=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    accepted=models.BooleanField(default=False)
    upvotes=models.IntegerField(default=0)
    downvotes=models.IntegerField(default=0)
    points=models.IntegerField(default=0)

    def save(self,*args,**kwargs):
        if not self.id:
            self.user.userprofile.modify_reputation(1)
        self.points=self.upvotes-self.downvotes
        super(Answer,self).save(*args,**kwargs)

    def addvote(self,upvote):
        if upvote:
            self.upvotes+=1
        else:
            self.downvotes+=1
        self.save()

    def __str__(self):
        return self.answer
    
    class Meta:
        ordering=['-accepted','-date']

class Vote(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    upvote=models.BooleanField()
    class Meta:
        abstract=True

class AnswerVote(Vote):
    answer=models.ForeignKey(Answer,on_delete=models.CASCADE)

    class Meta:
        unique_together=(('user','answer'),)
    
class QuestionVote(Vote):
    question=models.ForeignKey(Question,on_delete=models.CASCADE)

    class Meta:
        unique_together=(('user','question'),)

class Comment(models.Model):
    date=models.DateTimeField(auto_now_add=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    text = models.TextField(max_length=200)
    
    class Meta:
        abstract=True
    
    def __str__(self):
        return self.text

class CommentAnswer(Comment):
    answer=models.ForeignKey(Answer,on_delete=models.CASCADE)

class CommentQuestion(Comment):
    question=models.ForeignKey(Question,on_delete=models.CASCADE)


