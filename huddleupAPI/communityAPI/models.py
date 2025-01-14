from django.db import models
from taggit.managers import TaggableManager
from taggit.models import Tag

# Create your models here.
class Community(models.Model):
	name = models.CharField(max_length=50)
	description = models.CharField(max_length=500)
	mainImage = models.CharField(max_length=5000000)
	isPrivate = models.BooleanField()
	archived = models.BooleanField('archived', default=False)
	createdAt = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.name


class CommunityUserConnection(models.Model):
	MEMBER = 'member'
	MODERATOR = 'moderator'
	OWNER = 'owner'
	BANNED = 'banned'
	TYPE_CHOICES = [
		(MEMBER, 'Member'),
		(MODERATOR, 'Moderator'),
		(OWNER, 'Owner'),
		(BANNED, 'Banned')
	]
	user = models.ForeignKey('authAPI.User', on_delete=models.CASCADE)
	community = models.ForeignKey('Community', on_delete=models.CASCADE)
	type = models.CharField(
		max_length=50,
		choices=TYPE_CHOICES
	)
	createdAt = models.DateTimeField(auto_now_add=True)

class CommunityInvitation(models.Model):
	user = models.ForeignKey('authAPI.User', on_delete=models.CASCADE)
	community = models.ForeignKey('Community', on_delete=models.CASCADE)
	createdAt = models.DateTimeField(auto_now_add=True)

class Template(models.Model):
	createdBy = models.ForeignKey('authAPI.User', on_delete=models.CASCADE)
	community = models.ForeignKey('Community', on_delete=models.CASCADE)
	templateName = models.CharField(max_length=50)
	rows = models.JSONField(default=list)
	createdAt = models.DateTimeField(auto_now_add=True)
	isDeleted = models.BooleanField(default=False)


class Post(models.Model):
	createdBy = models.ForeignKey('authAPI.User', on_delete=models.CASCADE)
	community = models.ForeignKey('Community', on_delete=models.CASCADE)
	template = models.ForeignKey('Template', on_delete=models.CASCADE)
	rowValues = models.JSONField(default=list)
	createdAt = models.DateTimeField(auto_now_add=True)
	isEdited = models.BooleanField(default=False)
	tags = TaggableManager(blank=True)

	def update_tag_usage_create(self):
		if self.tags.all().count() > 0:
			for each in self.tags.all():
				obj1, created1 = UserTagUsage.objects.get_or_create(
					user=self.createdBy,
					tag=each
				)
				obj1.usage_count += 1
				obj1.save(update_fields=['usage_count'])

				obj2, created2 = CommunityTagUsage.objects.get_or_create(
					community=self.community,
					tag=each
				)
				obj2.usage_count += 1
				obj2.save(update_fields=['usage_count'])


	def update_tag_usage_edit(self, added, deleted):
		if added:
			for each in added:
				obj1, created1 = UserTagUsage.objects.get_or_create(
					user=self.createdBy,
					tag_id=each
				)
				obj1.usage_count += 1
				obj1.save(update_fields=['usage_count'])

				obj2, created2 = CommunityTagUsage.objects.get_or_create(
					community=self.community,
					tag_id=each
				)
				obj2.usage_count += 1
				obj2.save(update_fields=['usage_count'])
		if deleted:
			for each in deleted:
				obj1 = UserTagUsage.objects.get(
					user=self.createdBy,
					tag_id=each
				)
				obj1.usage_count -= 1
				obj1.save(update_fields=['usage_count'])

				obj2 = CommunityTagUsage.objects.get(
					community=self.community,
					tag_id=each
				)
				obj2.usage_count -= 1
				obj2.save(update_fields=['usage_count'])


class Comment(models.Model):
	createdBy = models.ForeignKey('authAPI.User', on_delete=models.CASCADE)
	post = models.ForeignKey('Post', on_delete=models.CASCADE)
	comment = models.CharField(max_length=1000)
	createdAt = models.DateTimeField(auto_now_add=True)
	isEdited = models.BooleanField(default=False)

class PostLike(models.Model):
	createdBy = models.ForeignKey('authAPI.User', on_delete=models.CASCADE)
	post = models.ForeignKey('Post', on_delete=models.CASCADE)
	createdAt = models.DateTimeField(auto_now_add=True)
	direction = models.BooleanField()

class CommentLike(models.Model):
	createdBy = models.ForeignKey('authAPI.User', on_delete=models.CASCADE)
	comment = models.ForeignKey('Comment', on_delete=models.CASCADE)
	createdAt = models.DateTimeField(auto_now_add=True)
	direction = models.BooleanField()

class UserFollowConnection(models.Model):
	follower = models.ForeignKey('authAPI.User', on_delete=models.CASCADE, related_name='follower')
	followee = models.ForeignKey('authAPI.User', on_delete=models.CASCADE, related_name='followee')
	createdAt = models.DateTimeField(auto_now_add=True)

class Badge(models.Model):
	name = models.CharField(max_length=50)
	type = models.CharField(
		max_length=50,
		choices=[('manual', 'Manual'), ('automatic', 'Automatic')],
		default='manual'
	)
	community = models.ForeignKey('Community', on_delete=models.CASCADE, null=True)
	description = models.CharField(max_length=500)
	image = models.CharField(max_length=5000000, null=True)
	criteria = models.JSONField(default=dict, null=True)
	createdAt = models.DateTimeField(auto_now_add=True)

class UserBadge(models.Model):
	user = models.ForeignKey('authAPI.User', on_delete=models.CASCADE)
	badge = models.ForeignKey('Badge', on_delete=models.CASCADE)
	createdAt = models.DateTimeField(auto_now_add=True)
	class Meta:
		unique_together = ['user', 'badge']


class UserTagUsage(models.Model):
	user = models.ForeignKey('authAPI.User', on_delete=models.CASCADE)
	tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
	usage_count = models.IntegerField(default=0)

	class Meta:
		unique_together = ['user', 'tag']


class CommunityTagUsage(models.Model):
	community = models.ForeignKey(Community, on_delete=models.CASCADE)
	tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
	usage_count = models.IntegerField(default=0)

	class Meta:
		unique_together = ['community', 'tag']


class UserCommunityRecommendation(models.Model):
	user = models.ForeignKey('authAPI.User', on_delete=models.CASCADE)
	community = models.ForeignKey(Community, on_delete=models.CASCADE)
	score = models.FloatField(default=0.0)
	created_at = models.DateTimeField(auto_now_add=True)

class UserUserRecommendation(models.Model):
	user = models.ForeignKey('authAPI.User', on_delete=models.CASCADE, related_name='user')
	recommended_user = models.ForeignKey('authAPI.User', on_delete=models.CASCADE, related_name='recommended_user')
	score = models.FloatField(default=0.0)
	created_at = models.DateTimeField(auto_now_add=True)

class TagSemanticMetadata(models.Model):
    tag = models.OneToOneField(Tag, on_delete=models.CASCADE, related_name="semantic_metadata")
    description = models.TextField(blank=True)
    wikidata_id = models.CharField(max_length=50, null=True, blank=True)
    semantic_data = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"Semantic Metadata for Tag: {self.tag.name}"


class CommunityActivity(models.Model):
    ACTION_CHOICES = [
        ('create_post', 'Created a post'),
        ('add_comment', 'Added a comment'),
        ('create_template', 'Created a template'),
        ('earn_badge', 'Earned a badge'),
        ('like_post', 'Liked a post'),
        ('like_comment', 'Liked a comment'),
        ('follow_user', 'Followed a user'),
        ('join_community', 'Joined a community'),
		('create_community', 'Created a community'),
		('create_badge', 'Created a badge'), 
		('make_moderator', 'Assign a moderator'), 
		('ban_user', 'Banned a user'), 
		('make_owner', 'Assign an owner'), 
    ]

    user = models.ForeignKey('authAPI.User', on_delete=models.CASCADE)
    community = models.ForeignKey('Community', on_delete=models.CASCADE, null=True, blank=True)
    action = models.CharField(max_length=50, choices=ACTION_CHOICES)
    target = models.TextField(null=True, blank=True)  # Additional info (e.g., post id, comment id)
    createdAt = models.DateTimeField(auto_now_add=True)

