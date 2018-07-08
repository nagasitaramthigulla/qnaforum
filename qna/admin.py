from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(UserProfile)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(QuestionVote)
admin.site.register(AnswerVote)
admin.site.register(CommentQuestion)
admin.site.register(CommentAnswer)