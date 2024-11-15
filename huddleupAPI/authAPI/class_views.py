from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UpdateUserSerializer
from .models import User


class UpdateProfileView(UpdateAPIView):
    serializer_class = UpdateUserSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    def get_object(self):
        return self.request.user
