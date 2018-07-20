from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from qna import models
from . import serializers


class AddAnswer(CreateAPIView):
    serializer_class = serializers.AnswerSerializer
    permission_classes = ((IsAuthenticated,))
    authentication_classes = ((JSONWebTokenAuthentication,))
    def create(self, request, *args, **kwargs):
        try:
            serializer=serializers.AnswerSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user=request.user
            question=models.Question.objects.get(id=kwargs['qid'])
            if question.closed:
                raise Exception('Question is closed')
            answer=models.Answer(**serializer.validated_data)
            answer.user=user
            answer.question=question
            answer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'detail':str(e)},status=status.HTTP_401_UNAUTHORIZED)

class ManageAnswer(RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.AnswerSerializer
    queryset = models.Answer.objects.all()
    permission_classes = ((IsAuthenticated,))
    authentication_classes = ((JSONWebTokenAuthentication,))

    def check_object_permissions(self, request, obj):
        super(ManageAnswer,self).check_object_permissions(request,obj)
        if obj.user.id!=request.user.id or obj.question.closed:
            self.permission_denied(request,"not allowed to modify this answer")

class GetAnswersForQuestion(ListAPIView):
    serializer_class = serializers.AnswerSerializer

    def get_queryset(self):
        return models.Answer.objects.filter(question__id=self.kwargs['qid'])

class CommentAnswerView(CreateAPIView,ListAPIView):
    serializer_class = serializers.AnswerCommentSerializer
    permission_classes = ((IsAuthenticated,))
    authentication_classes = ((JSONWebTokenAuthentication,))

    def check_object_permissions(self, request, obj):
        super(CommentAnswerView,self).check_object_permissions(request,obj)
        if obj.user.id!=request.user.id:
            self.permission_denied(request,message="you do not have rights to access this information")

    def get_queryset(self):
        return models.CommentAnswer.objects.filter(answer__id=self.kwargs['qid'])

    def create(self, request, *args, **kwargs):
        try:
            user=request.user
            answer=models.Answer.objects.get(id=kwargs['qid'])
            serializer=serializers.AnswerCommentSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            comment=models.CommentAnswer(**serializer.validated_data)
            comment.answer=answer
            comment.user=user
            comment.text=comment.text.replace('\r\n','<br>')
            comment.save()
            serializer=serializers.AnswerCommentSerializer(comment)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"detail":str(e)},status=status.HTTP_401_UNAUTHORIZED)

class CommentsForAnswer(ListAPIView):
    serializer_class = serializers.AnswerCommentSerializer

    def get_queryset(self):
        return models.CommentAnswer.objects.filter ( answer__id=self.kwargs['qid'] )

class VoteAnswer(CreateAPIView):
    serializer_class = serializers.VoteAnswerSerializer
    permission_classes = ((IsAuthenticated,))
    authentication_classes = ((JSONWebTokenAuthentication,))

    def create(self, request, *args, **kwargs):
        try:
            serializer=serializers.VoteAnswerSerializer(request.data)
            serializer.is_valid(raise_exception=True)
            vote=serializer.save(commit=False)
            vote.user=request.user
            vote.answer=models.Answer.objects.get(id=kwargs['qid'])
            vote.save()
            vote.answer.addvote(vote.upvote)
            res={'upvotes':vote.answer.upvotes,'downvotes':vote.answer.downvotes}
            return Response(res,status=status.HTTP_201_CREATED)
        except:
            res = {'upvotes': vote.answer.upvotes, 'downvotes': vote.answer.downvotes,'detail':'not allowed'}
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
