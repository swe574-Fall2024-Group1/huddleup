from authAPI.models import Session
from authAPI.serializers import SessionSerializer
from datetime import datetime, timedelta
from cryptography.fernet import Fernet, InvalidToken
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes

import base64


class SessionManager:
	def __init__(self):
		pass

	def create_session(self, userId):
		expires_at = datetime.utcnow() + timedelta(days=30)
		session_data = {'userId': userId, 'expiresAt': expires_at}
		session_serializer = SessionSerializer(data=session_data)
		passphrase = "YourPassphrase"
		salt = b"YourSalt"

		# Derive key using a key derivation function (KDF)
		kdf = hashes.Hash(hashes.SHA256(), backend=default_backend())
		kdf.update(passphrase.encode())
		kdf.update(salt)
		key = base64.urlsafe_b64encode(kdf.finalize())
		cipher = Fernet(key)


		if session_serializer.is_valid():
			session_serializer.save()
			sessionId_bytes = str(session_serializer.data['id']).encode()
			sessionToken_bytes = cipher.encrypt(sessionId_bytes)
			sessionToken_string = base64.urlsafe_b64encode(sessionToken_bytes).decode()

			return sessionToken_string
		return None

	def find_session(self, token):
		passphrase = "YourPassphrase"
		salt = b"YourSalt"

		try:
			# Derive key using a key derivation function (KDF)
			kdf = hashes.Hash(hashes.SHA256(), backend=default_backend())
			kdf.update(passphrase.encode())
			kdf.update(salt)
			key = base64.urlsafe_b64encode(kdf.finalize())
			cipher = Fernet(key)

			sessionId = int(cipher.decrypt(base64.urlsafe_b64decode(token)).decode())
			session = Session.objects.get(id=sessionId)
		except:
		# Handle invalid token error here
			return None
		return session

	def delete_session(self, session_token):
		session = Session.objects.get(token=session_token)
		session.delete()
		return True