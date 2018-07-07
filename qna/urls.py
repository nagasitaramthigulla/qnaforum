from django.urls import path
from .views import user,questions,answers
from rest_framework_jwt.views import refresh_jwt_token

urlpatterns=[
    path(r'api-signup-view/',user.SignUp.as_view()),
    path(r'api-token-auth/',user.obtain_jwt_token),
    path(r'user-manage/<int:pk>/',user.ManageUser.as_view()),
    path(r'user/<int:pk>/',user.GetUserProfile.as_view()),
    path(r'api-token-refresh/',refresh_jwt_token),

    path(r'add-question/',questions.AddQuestion.as_view()),
    path(r'question-tag/<tag>/',questions.GetQuestionsBasedOnTags.as_view()),
    path(r'question-user/<user>/',questions.GetQuestionsBasedOnUser.as_view()),
    path(r'question-comment/<qid>/',questions.CommentQuestionView.as_view()),
    path(r'question-comments/<qid>/',questions.CommentsForQuestion.as_view()),
    path(r'vote-question/<qid>/',questions.VoteQuestion.as_view()),

    path(r'add-answer/<qid>/',answers.AddAnswer.as_view()),
    path(r'answers-question/<qid>/',answers.GetAnswersForQuestion.as_view()),
    path(r'answer-comment/<qid>/',answers.CommentAnswerView.as_view()),
    path(r'anwer-comments/<qid>/',answers.CommentsForAnswer.as_view()),
    path(r'vote-answer/<qid>/',answers.VoteAnswer.as_view()),
]