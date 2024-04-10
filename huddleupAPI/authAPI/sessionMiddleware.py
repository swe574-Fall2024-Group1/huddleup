from datetime import datetime, timedelta
from authAPI.models import User
from .sessionManager import SessionManager
import pytz


class SessionAuthenticationMiddleware:
	def __init__(self, get_response):
		self.get_response = get_response

	def __call__(self, request):
		session_token = request.headers.get('x-dub-session-token')

		if session_token:
			session = SessionManager().find_session(session_token)

			if session:
				utc_now = datetime.utcnow()
				session_expires_at_naive = session.expiresAt.astimezone(pytz.utc).replace(tzinfo=None)

				if session_expires_at_naive > utc_now:
					request.user = User.objects.get(id=session.userId.id)
				else:
					request.user = None
		else:
			request.user = None

		response = self.get_response(request)
		return response