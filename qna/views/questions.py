from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from qna import models
from . import serializers


class AddQuestion(CreateAPIView):
    serializer_class = serializers.QuestionSerializer
    permission_classes = ((IsAuthenticated,))
    authentication_classes = ((JSONWebTokenAuthentication,))
    def create(self, request, *args, **kwargs):
        try:
            serializer=serializers.QuestionSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user=request.user
            question=models.Question(**serializer.validated_data)
            question.user=user
            question.save()
            serializer=serializers.QuestionSerializer(question)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        except Exception as ve:
            return Response({"detail":str(ve)},status=status.HTTP_401_UNAUTHORIZED)
            pass

class ManageQuestion(RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.QuestionSerializer
    queryset = models.Question.objects.all()
    permission_classes = ((IsAuthenticated,))
    authentication_classes = ((JSONWebTokenAuthentication,))
    def check_object_permissions(self, request, obj):
        super(ManageQuestion,self).check_object_permissions(request,obj)
        if obj.user.id!=request.user.id:
            self.permission_denied(request,message="you do not have rights to access this information")

    def destroy(self, request, *args, **kwargs):
        try:
            question=self.get_object()
            question.user.userprofile.modify_reputation(-question.points)
            question.delete()
            return Response({"detail":"success"},status=status.HTTP_202_ACCEPTED)
        except Exception as ve:
            return Response({"detail":str(ve)},status=status.HTTP_401_UNAUTHORIZED)

class GetLatestQuestions(ListAPIView):
    serializer_class = serializers.QuestionSerializer
    def get_queryset(self):
        return models.Question.objects.all().order_by('-date')


class GetQuestionsBasedOnTags(ListAPIView):
    serializer_class = serializers.QuestionSerializer

    def get_queryset(self):
        return models.Question.objects.all().filter(tags__icontains=self.kwargs['tag']).order_by('-date')

class GetQuestionsBasedOnUser(ListAPIView):
    serializer_class = serializers.QuestionSerializer

    def get_queryset(self):
        return models.Question.objects.all().filter(user__username=self.kwargs['user'])

class CommentQuestionView(CreateAPIView,ListAPIView):
    serializer_class = serializers.QuestionCommentSerializer
    permission_classes = ((IsAuthenticated,))
    authentication_classes = ((JSONWebTokenAuthentication,))

    def check_object_permissions(self, request, obj):
        super(CommentQuestionView,self).check_object_permissions(request,obj)
        if obj.user.id!=request.user.id:
            self.permission_denied(request,message="you do not have rights to access this information")

    def get_queryset(self):
        return models.CommentQuestion.objects.filter(question__id=self.kwargs['qid'])

    def create(self, request, *args, **kwargs):
        try:
            user=request.user
            question=models.Question.objects.get(id=kwargs['qid'])
            serializer=serializers.QuestionCommentSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            comment=models.CommentQuestion(**serializer.validated_data)
            comment.question=question
            comment.user=user
            comment.text=comment.text.replace('\r\n','<br>')
            comment.save()
            serializer=serializers.QuestionCommentSerializer(comment)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"detail":str(e)},status=status.HTTP_401_UNAUTHORIZED)

class CommentsForQuestion(ListAPIView):
    serializer_class = serializers.QuestionCommentSerializer

    def get_queryset(self):
        return models.CommentQuestion.objects.filter ( question__id=self.kwargs['qid'] )

class VoteQuestion(CreateAPIView):
    serializer_class = serializers.VoteQuestionSerializer
    permission_classes = ((IsAuthenticated,))
    authentication_classes = ((JSONWebTokenAuthentication,))

    def create(self, request, *args, **kwargs):
        try:
            serializer=serializers.VoteQuestionSerializer(request.data)
            serializer.is_valid(raise_exception=True)
            vote=serializer.save(commit=False)
            vote.user=request.user
            vote.question=models.Question.objects.get(id=kwargs['qid'])
            vote.save()
            vote.question.addvote(vote.upvote)
            res={'upvotes':vote.question.upvotes,'downvotes':vote.question.downvotes}
            return Response(res,status=status.HTTP_201_CREATED)
        except:
            res = {'upvotes': vote.question.upvotes, 'downvotes': vote.question.downvotes,'detail':'not allowed'}
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
