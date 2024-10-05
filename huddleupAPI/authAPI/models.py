import os
import uuid
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        now = timezone.now()
        if not email:
            raise ValueError('The given email must be set')
        email = UserManager.normalize_email(email)
        username = str(uuid.uuid4())
        user = self.model(
            email=email, username=username, date_joined=now, last_login=now,
            is_active=True, is_staff=False, is_superuser=False,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        u = self.create_user(email, password, **extra_fields)
        u.is_staff = True
        u.is_active = True
        u.is_superuser = True
        u.save(using=self._db)
        return u

    def get_by_natural_key(self, username):
        return self.get(**{self.model.USERNAME_FIELD + '__iexact': username})

    def get(self, *args, **kwargs):
        if 'email' in kwargs:
            kwargs['email__iexact'] = kwargs['email']
            del kwargs['email']
        return super(UserManager, self).get(**kwargs)

    def update_or_create(self, defaults=None, **kwargs):
        new_info = kwargs.copy()
        new_info.update(defaults) if defaults else {}
        created = True
        try:
            obj = self.get(email__iexact=kwargs['email'])
            for key, value in new_info.items():
                setattr(obj, key, value)
            obj.save()
            created = False
        except:
            obj = User(**new_info)
            obj.username = str(uuid.uuid4())
            obj.save()
        return obj, created


def user_avatar_upload(self, filename):
    extension = filename.split('.')[-1]
    filename = 'user_{}.{}'.format(self.id, extension)
    return os.path.join('avatars/', filename)


class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=255, unique=True, blank=True)
    about_me = models.TextField(blank=True, default="")
    avatar = models.ImageField(upload_to=user_avatar_upload, blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"


class Session(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    expiresAt = models.DateTimeField()
