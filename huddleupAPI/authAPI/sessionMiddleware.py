import pytz
from datetime import datetime
from authAPI.models import User
from .sessionManager import SessionManager
from rest_framework import authentication
from rest_framework import exceptions


class TokenAuth(authentication.BaseAuthentication):
	def authenticate(self, request):
		session_token = request.META.get('HTTP_X_DUB_SESSION_TOKEN')
		if session_token:
			session = SessionManager().find_session(session_token)
			if session:
				utc_now = datetime.utcnow()
				session_expires_at_naive = session.expiresAt.astimezone(pytz.utc).replace(tzinfo=None)

				if session_expires_at_naive > utc_now:
					user = User.objects.get(id=session.userId.id)
					return (user, None)
				else:
					session.delete()
					raise exceptions.AuthenticationFailed('Token expired. Please login again.')
			else:
				raise exceptions.AuthenticationFailed('Token unacceptable. Please login again.')
		else:
			return None