from rest_framework import serializers

from qna.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('id','username','password','email','first_name','last_name')
        extra_kwargs={'password':{'write_only':True,'style':{'input_type':'password'}},'id':{'required':False},'email':{'required':False},'first_name':{'required':False},'last_name':{'required':False}}

class UserProfileSerializer(serializers.ModelSerializer):
    user=UserSerializer()
    
    class Meta:
        model=UserProfile
        fields=('points','user')

class QuestionSerializer(serializers.ModelSerializer):
    user=serializers.PrimaryKeyRelatedField(read_only=True)
    tags=serializers.ListField()
    class Meta:
        model=Question
        fields=('id','title','description','date','user','tags','closed','upvotes','downvotes','points','acceptedanswer')
        extra_kwargs={'id':{'read_only':True},'date':{'read_only':True},'user':{'read_only':True},'closed':{'read_only':True},'acceptedanswer':{'read_only':True},'upvotes':{'read_only':True},'downvotes':{'read_only':True},'points':{'read_only':True}}

class AnswerSerializer(serializers.ModelSerializer):
    user=serializers.PrimaryKeyRelatedField(read_only=True)
    question=serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model=Answer
        fields=('id','question','answer','updated','user','accepted','upvotes','downvotes','points')
        extra_kwargs={'id':{'read_only':True},'updated':{'read_only':True},'question':{'read_only':True},'user':{'read_only':True},'accepted':{'read_only':True},'upvotes':{'read_only':True},'downvotes':{'read_only':True},'points':{'read_only':True}}

class QuestionCommentSerializer(serializers.ModelSerializer):
    question=serializers.PrimaryKeyRelatedField(read_only=True)
    user=serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model=CommentQuestion
        fields=('id','text','date','question','user')
        extra_kwargs={'id':{'read_only':True},'date':{'read_only':True}}

class AnswerCommentSerializer(serializers.ModelSerializer):
    answer=serializers.PrimaryKeyRelatedField(read_only=True)
    user=serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model=CommentAnswer
        fields=('id','text','date','answer','user')
        extra_kwargs={'id':{'read_only':True},'date':{'read_only':True}}

class VoteQuestionSerializer(serializers.ModelSerializer):
    qestion=serializers.PrimaryKeyRelatedField(read_only=True)
    user=serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model=QuestionVote
        fields=('id','upvote','question','user')
        extra_kwargs={'id':{'read_only':True}}

class VoteAnswerSerializer(serializers.ModelSerializer):
    answer=serializers.PrimaryKeyRelatedField(read_only=True)
    user=serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model=QuestionVote
        fields=('id','upvote','answer','user')
        extra_kwargs={'id':{'read_only':True}}
