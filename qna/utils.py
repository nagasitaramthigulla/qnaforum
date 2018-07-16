from datetime import datetime

from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings


def payloadhandler(token,user,request):
    resp=Response({'token':token,'user':user.username})
    expiration = (datetime.utcnow() +
                              api_settings.JWT_EXPIRATION_DELTA)
    resp.set_cookie('token',
                    token,
                    expires=expiration,
                    httponly=False)
    return resp
