import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { Card, Avatar, Space, Typography, Divider, Button, Input, Tooltip, Flex, message, Modal, Form, Select, Tag } from 'antd';
import { Comment } from '@ant-design/compatible';
import { CommentOutlined, LikeOutlined, DislikeOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import useApi from '../../hooks/useApi';
import fetchApi from '../../api/fetchApi';
import { Spin } from 'antd';
import useAuth from '../Auth/useAuth';
import useCommunity from '../../components/Community/useCommunity';

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Post = ({ postData }) => {
	const { communityInfo } = useCommunity();

	const [templateRows, setTemplateRows] = useState([]);
	const [templateName, setTemplateName] = useState([]);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState('');
	const [showAllComments, setShowAllComments] = useState(false);
	const [postLikes, setPostLikes] = useState(postData.likeCount);
	const [postDislikes, setPostDislikes] = useState(postData.dislikeCount);
	const [isFollowing, setIsFollowing] = useState(postData.isFollowing);

	const [loadingComments, setLoadingComments] = useState(true);
	const [loadingTemplate, setLoadingTemplate] = useState(true);

	const [liked, setLiked] = useState(postData.liked); // Track whether the user has liked the post or not
	const [disliked, setDisliked] = useState(postData.disliked); // Track whether the user has disliked the post or not

	const [showBadgeModal, setShowBadgeModal] = useState(false); // State to control delete confirmation modal
	const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control delete confirmation modal
	const [editingComment, setEditingComment] = useState(null); // State to manage the comment being edited
	const [editedCommentText, setEditedCommentText] = useState(''); // State to store the edited comment text

	const template_result = useApi('/api/communities/templates/get-template', { templateId: postData.templateId });
	const comments_result = useApi('/api/communities/get-post-comments', { postId: postData.id });
	const badge_result = fetchApi('/api/communities/badges/get-badges', { communityId: communityInfo.id }, 'GET').then((response) => {
		if (response && !response.loading && loadingBadges) {
			setLoadingBadges(false);
			setBadges(response.data);
		}
	});
	const { userInfo } = useAuth();

	const [imgModalVisible, setImgModalVisible] = useState(false);
	const toggleImgModal = () => {
		setImgModalVisible(!imgModalVisible);
	};

	template_result.then((response) => {
		if (response && !response.loading && loadingTemplate) {
			setTemplateRows(response.data.data.rows);
			setTemplateName(response.data.data.templateName);
			setLoadingTemplate(false);
		}
	});

	comments_result.then((response) => {
		if (response && !response.loading && loadingComments) {
			setComments(response.data.data);
			setLoadingComments(false);
		}
	});

	const getRowValue = (title) => {
		const row = postData.rowValues.find((rowValue, index) => templateRows[index].title === title);
		return row || '';
	};

	const renderRow = (row) => {
		if (!getRowValue(row.title)) {
			return null;
		}
		switch (row.type) {
			case 'string':
			case 'normalizedString':
			case 'token':
			case 'byte':
			case 'unsignedByte':
			case 'short':
			case 'unsignedShort':
			case 'int':
			case 'unsignedInt':
			case 'long':
			case 'unsignedLong':
			case 'decimal':
			case 'integer':
			case 'positiveInteger':
			case 'negativeInteger':
			case 'nonNegativeInteger':
			case 'nonPositiveInteger':
			case 'float':
			case 'NCName':
			case 'double':
				return <Text>{getRowValue(row.title)}</Text>;

			case 'hex64Binary':
			case 'hexBinary':
			case 'time':
			case 'date':
			case 'dateTime':
			case 'duration':
			case 'gMonth':
			case 'gYear':
			case 'gYearMonth':
			case 'gDay':
			case 'gMonthDay':
			case 'Name':
			case 'QName':
			case 'anyURI':
			case 'language':
				return <Text>{getRowValue(row.title)}</Text>;
			case 'image':
				const img = getRowValue(row.title)
				return <>
					<Button type="link" onClick={toggleImgModal}>
						<img src={img} alt={row.type} style={{ maxWidth: '100%', maxHeight: '100px' }} />
						</Button>
						<Modal
							title={postData.username}
							visible={imgModalVisible}
							onCancel={toggleImgModal}
							footer={null}>
								<img src={img} alt={img} style={{ maxWidth: '100%', maxHeight: '100%' }} />
						</Modal>
				</>;

			case 'Boolean':
				return <Text>{getRowValue(row.title) ? 'Yes' : 'No'}</Text>;

			case 'geolocation':
				const [longitude, latitude] = getRowValue(row.title) || [];
				return (
					<>
					<Text>
						{longitude && latitude ? `Longitude: ${longitude}, Latitude: ${latitude}` : 'N/A'}
					</Text>
					<MapContainer center={[longitude, latitude]} zoom={14} scrollWheelZoom={false} style={{height: 250 ,width: "100%", marginBottom: "1rem"}}>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
						<Marker position={[longitude, latitude]}>
							<Popup>Selected Location</Popup>
						</Marker>
					</MapContainer>
				</>
				);

			default:
				return <Text>N/A</Text>;
		}
	};

	const handleAddComment = async () => {
		if (newComment.trim() !== '') {
			setComments([...comments, { comment: newComment, username: userInfo.username, createdAt: new Date(), likeCount: 0, dislikeCount: 0 }]);
			await fetchApi('/api/communities/add-comment', { postId: postData.id, comment: newComment });
			setNewComment('');
		}
	};

	const handlePostLike = async (direction) => {
		if (communityInfo.memberType === 'notMember' || communityInfo.memberType === 'banned') {
			message.error('You must be a member of the community to like or dislike comments.');
			return;
		}
		if (direction) {
			if (liked) {
				setPostLikes(postLikes - 1);
				setLiked(false);
			} else {
				setPostLikes(postLikes + 1);
				setLiked(true);
				if (disliked) {
					setPostDislikes(postDislikes - 1);
					setDisliked(false);
				}
			}
		} else {
			if (disliked) {
				setPostDislikes(postDislikes - 1);
				setDisliked(false);
			} else {
				setPostDislikes(postDislikes + 1);
				setDisliked(true);
				if (liked) {
					setPostLikes(postLikes - 1);
					setLiked(false);
				}
			}
		}

		await fetchApi('/api/communities/like-post', { postId: postData.id, direction });
	};

	const handleCommentLike = async (commentId, direction) => {
		if (communityInfo.memberType === 'notMember' || communityInfo.memberType === 'banned') {
			message.error('You must be a member of the community to like or dislike comments.');
			return;
		}
		const comment = comments.find((comment) => comment.id === commentId);
		if (direction) {
			if (comment.liked) {
				comment.likeCount -= 1;
				comment.liked = false;
			} else {
				comment.likeCount += 1;
				comment.liked = true;
				if (comment.disliked) {
					comment.dislikeCount -= 1;
					comment.disliked = false;
				}
			}
		} else {
			if (comment.disliked) {
				comment.dislikeCount -= 1;
				comment.disliked = false;
			} else {
				comment.dislikeCount += 1;
				comment.disliked = true;
				if (comment.liked) {
					comment.likeCount -= 1;
					comment.liked = false;
				}
			}
		}
		setComments([...comments]);

		await fetchApi('/api/communities/like-comment', { commentId, direction });
	};

	const handleEditComment = (comment) => {
		setEditingComment(comment);
		setEditedCommentText(comment.comment);
	};

	const handleSaveEditedComment = async () => {
		if (editedCommentText.trim() !== '') {
			const updatedComments = comments.map((comment) =>
				comment.id === editingComment.id ? { ...comment, comment: (editedCommentText + `(edited)` ) } : comment
			);
			setComments(updatedComments);
			setEditingComment(null);
			setEditedCommentText('');

			await fetchApi('/api/communities/edit-comment', { commentId: editingComment.id, comment: editedCommentText });
			message.success('Comment edited successfully');
		}
	};

	const visibleComments = (!showAllComments && comments && comments.length > 2) ? comments.slice(-2) : comments;

	const renderCommentActions = (comment) => [
		<Tooltip title="Upvote">
			<LikeOutlined
				onClick={() => handleCommentLike(comment.id, true)}
				style={{ marginRight: 8, fontSize: 20, color: comment.liked ? '#7952CC' : 'black' }}
			/>
		</Tooltip>,
		<span>{comment.likeCount}</span>,
		<Tooltip title="Downvote">
			<DislikeOutlined
				onClick={() => handleCommentLike(comment.id, false)}
				style={{ fontSize: 20, color: comment.disliked ? '#7952CC' : 'black' }}
			/>
		</Tooltip>,
		comment.dislikeCount,
		(userInfo.username === comment.username) ? (
			<Button style={{ marginLeft: 10 }} size='small' onClick={() => handleEditComment(comment)}>Edit Comment</Button>
		) : '',
		(userInfo.username === postData.username) || communityInfo.memberType === 'moderator' || communityInfo.memberType === 'owner' ? <Button style={{ marginLeft: 10 }} size='small' onClick={() => { handleDeleteComment(comment.id) }}>Delete Comment</Button> : ''
	];

	const handleFollowUser = async (username) => {
		setIsFollowing(!isFollowing);
		await fetchApi('/api/communities/follow-user', { username });
	};

	const handleDeletePost = async () => {
		setShowDeleteModal(false);
		await fetchApi('/api/communities/delete-post', { postId: postData.id });
		message.success('Post deleted successfully');
		window.location.reload();
	};

	const handleDeleteComment = async (commentId) => {
		setComments(comments.filter((comment) => comment.id !== commentId));
		message.success('Comment deleted successfully');
		await fetchApi('/api/communities/delete-comment', { commentId });
	};

	const TagList = ({ tags }) => {
	  return (
		<div>
		  {tags.map((tag, index) => (
			<Tag key={tag.id}>{tag.name}</Tag>
		  ))}
		</div>
	  );
	};

	const [badges, setBadges] = useState([])
	const [loadingBadges, setLoadingBadges] = useState(true)
	const [selectedBadge, setSelectedBadge] = useState('')
	const [badgeMessage, setBadgeMessage] = useState('')
	const handleBadgeSubmit = async () => {
		if (!selectedBadge) {
			message.error('Please select a badge')
			return
		}
		const response = await fetchApi('/api/communities/badges/assign-badge', { badgeId: selectedBadge, username: postData.user_id, message: badgeMessage })
			console.log(response)
		console.log({ selectedBadge, badgeMessage })
		// set user badges from post data
		postData.user_badges = [...postData.user_badges, { badge: { id: selectedBadge, name: badges.find(badge => badge.id === selectedBadge).name },image: badges.find(badge => badge.id === selectedBadge).image }]
		setShowBadgeModal(false) // Close modal on submit
	  }

	return (
		<Card style={{ marginBottom: '16px', boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}>
			<div className={'post-actions'}>
				{(userInfo.username === postData.username) || communityInfo.memberType === 'moderator' || communityInfo.memberType === 'owner' ? (
				<Button
					type="danger"
					style={{ color: '#ffffff', backgroundColor: '#d32525' }}
					onClick={() => setShowDeleteModal(true)}
				>
					Delete Post
				</Button>
			) : null}

			{userInfo.username === postData.username ? (
				<Button
					style={{ color: '#7952CC'}}
					onClick={() => window.location.href = `/communities/${communityInfo.id}/edit-post/${postData.id}`}
				>
					Edit Post
				</Button>
			) : null}

			{communityInfo.memberType === 'moderator' || communityInfo.memberType === 'owner' ? (
				<Button
					style={{ color: '#7952CC' }}
					onClick={() => setShowBadgeModal(true)}
				>
					Assign Badge
				</Button>
			) : null}
			</div>

			<Modal
				title="Assign Badge"
				visible={showBadgeModal}
				onOk={handleBadgeSubmit}
				onCancel={() => setShowBadgeModal(false)}
				okText="Assign"
				cancelText="Cancel"
			>
				<Form layout="vertical" onFinish={handleBadgeSubmit}>
					<Form.Item
					label="Select Badge"
					name="badge"
					rules={[{ required: true, message: 'Please select a badge' }]}
					>
						{console.log(postData)}
					<Select
						placeholder="Choose a badge"
						value={selectedBadge}
						onChange={(value) => setSelectedBadge(value)}
					>
						{badges && badges
							.filter(badge => badge.type === 'manual')
							.map((badge) => (
						<Option key={badge.id} value={badge.id}>
							{badge.image && <img src={badge.image} alt={badge.name} style={{ maxWidth:24, maxHeight:24, marginRight: 8 }} />}
							{badge.name}
						</Option>
						))}
					</Select>
					</Form.Item>

					<Form.Item label="Message (Optional)" name="message">
					<TextArea
						placeholder="Add a personal message for the badge recipient"
						value={badgeMessage}
						rows={4}
						onChange={(e) => setBadgeMessage(e.target.value)}
					/>
					</Form.Item>
				</Form>
			</Modal>
			<Modal
				title="Confirm Delete"
				visible={showDeleteModal}
				onOk={handleDeletePost}
				onCancel={() => setShowDeleteModal(false)}
				okText="Delete"
				cancelText="Cancel"
			>
				<p>Are you sure you want to delete this post?</p>
			</Modal>
			<Modal
				title="Edit Comment"
				visible={!!editingComment}
				onOk={handleSaveEditedComment}
				onCancel={() => setEditingComment(null)}
				okText="Save"
				cancelText="Cancel"
			>
				<Input.TextArea
					value={editedCommentText}
					onChange={(e) => setEditedCommentText(e.target.value)}
					rows={4}
				/>
			</Modal>
			<Card.Meta
				avatar={<Avatar style={{ backgroundColor: "#b4b1ba" }} icon={<UserOutlined />} />}
				title={<div style={{ color: "#7952CC" }}>{postData.username} {postData.username !== userInfo.username ? <Button size='small' onClick={() => { handleFollowUser(postData.username) }}> {isFollowing ? 'Unfollow' : 'Follow'} </Button> : null} <div className={'badges'}>{postData.user_badges && postData.user_badges.map(badge => <span className={'badge'}>{badge.badge.image && <img src={badge.badge.image} alt={badge.badge.name} style={{ maxWidth:24, maxHeight:24, marginRight: 8 }} />}{badge.badge.name}</span>)}</div></div>}
				description={<div><div>{new Date(postData.createdAt).toLocaleString()}</div> {postData.isEdited ? <div>Edited</div> : null } </div>}
			/>
			<div style={{ marginTop: 20 }}>
				<span style={{ color: "#240763", fontWeight: 600 }}>Template:</span> {templateName || ''}
			</div>
			<Divider />
			<div >
				{templateRows && templateRows.map((row, index) => (
					getRowValue(row.title) ? (
						<div key={index} style={{ marginBottom: '8px' }}>
							<Space direction="vertical" style={{ marginBottom: 5 }}>
								<Text strong style={{ color: "#240763", marginTop: 5 }}>{row.title}</Text>
								{renderRow(row)}
							</Space>
							{index !== templateRows.length - 1 && <Divider style={{ margin: '8px 0' }} />}
						</div>) : null
				))}
			</div>
			<Divider />
			<div style={{ marginBottom: 10 }}>
				<Tooltip title="Upvote">
					<LikeOutlined onClick={() => handlePostLike(true)} style={{ marginRight: 3, fontSize: 20, color: liked ? '#7952CC' : 'black' }} />
				</Tooltip>
				<span style={{ marginRight: 20 }}>{postLikes}</span>
				<Tooltip title="Downvote">
					<DislikeOutlined onClick={() => handlePostLike(false)} style={{ marginRight: 5, fontSize: 20, color: disliked ? '#7952CC' : 'black' }} />
				</Tooltip>
				{postDislikes}
			</div>
			<div>
				<Flex>
					<Input
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						placeholder="Write a comment..."
						allowClear
						disabled={communityInfo.memberType === 'notMember' || communityInfo.memberType === 'banned'}
					/>
					<Button icon={<CommentOutlined />} onClick={handleAddComment} disabled={communityInfo.memberType === 'notMember' || communityInfo.memberType === 'banned'}>Add Comment</Button>
				</Flex>

				{!loadingComments ? (
					visibleComments.map((comment, index) => (
						<div key={index}>
							<Comment
								actions={renderCommentActions(comment)} // Pass the comment object to renderCommentActions function
								author={comment.username}
								content={comment.comment + (comment.isEdited  ? ' (edited)' : '')}
								datetime={new Date(comment.createdAt).toLocaleString('tr-TR', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric',
									hour: '2-digit',
									minute: '2-digit',
								})}
								style={{ borderTop: "1px solid #f0f0f0" }}
							/>
						</div>
					))
				) : (
					<div style={{ marginTop: 40, textAlign: 'center' }}>
						<Spin size='large' indicator={<LoadingOutlined style={{ fontSize: 50, color: '#7952CC' }} spin />} />
					</div>
				)}
				{comments && comments.length > 2 &&
					<Button onClick={() => setShowAllComments(!showAllComments)}>
						{showAllComments ? 'Hide Comments' : 'Show All Comments'}
					</Button>
				}
			</div>
			<Divider />
				<div>
				  <h3>Tags:</h3>
				  <TagList tags={postData.tags} />
				</div>
		</Card>
	);
};

export default Post;
