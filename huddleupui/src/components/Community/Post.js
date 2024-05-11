import React, { useState } from 'react';
import { Card, Avatar, Space, Typography, Divider, Button, Input, Tooltip, Flex } from 'antd';
import { Comment } from '@ant-design/compatible';
import { CommentOutlined, LikeOutlined, DislikeOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import useApi from '../../hooks/useApi';
import fetchApi from '../../api/fetchApi';
import { Spin } from 'antd';
import useAuth from '../Auth/useAuth';

const { Text } = Typography;

const Post = ({ postData }) => {
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


	const template_result = useApi('/api/communities/templates/get-template', { templateId: postData.templateId });
	const comments_result = useApi('/api/communities/get-post-comments', { postId: postData.id });

	const { userInfo } = useAuth();

	template_result.then((response) => {
		if (response && !response.loading && loadingTemplate) {
			setTemplateRows(response.data.data.rows)
			setTemplateName(response.data.data.templateName)
			setLoadingTemplate(false)
		}
	});

	comments_result.then((response) => {
		if (response && !response.loading && loadingComments) {
			setComments(response.data.data)
			setLoadingComments(false)
		}
	});

	// Helper function to get the row value for a given title
	const getRowValue = (title) => {
		const row = postData.rowValues.find((rowValue, index) => templateRows[index].title === title);
		return row || '';
	};

	// Helper function to render rows based on their type
	const renderRow = (row) => {
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
			case 'float':
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
				return <img src={getRowValue(row.title)} alt={row.title} style={{ maxWidth: '100%', maxHeight: '100px' }} />;

			case 'Boolean':
				return <Text>{getRowValue(row.title) ? 'Yes' : 'No'}</Text>;

			case 'geolocation':
				const [longitude, latitude] = getRowValue(row.title) || [];
				return (
					<Text>
						{longitude && latitude ? `Longitude: ${longitude}, Latitude: ${latitude}` : 'N/A'}
					</Text>
				);

			default:
				return <Text>N/A</Text>;
		}
	};

	const handleAddComment = async () => {
		if (newComment.trim() !== '') {
			setComments([...comments, { comment: newComment, username: userInfo.username, createdAt: new Date(), likeCount: 0, dislikeCount: 0 }]);
			await fetchApi('/api/communities/posts/add-comment', { postId: postData.id, comment: newComment })
			setNewComment('');
		}
	};

	const handlePostLike = async (direction) => {
		// If already liked, remove the like
		if (direction) {
			if (liked) {
				setPostLikes(postLikes - 1);
				setLiked(false)
			} else {
				setPostLikes(postLikes + 1);
				setLiked(true)
				if (disliked) {
					setPostDislikes(postDislikes - 1);
					setDisliked(false)
				}
			}
		} else {
			if (disliked) {
				setPostDislikes(postDislikes - 1);
				setDisliked(false)
			} else {
				setPostDislikes(postDislikes + 1);
				setDisliked(true)
				if (liked) {
					setPostLikes(postLikes - 1);
					setLiked(false)
				}
			}
		}

		await fetchApi('/api/communities/like-post', { postId: postData.id, direction });
	};

	const handleCommentLike = async (commentId, direction) => {
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

	const visibleComments = (!showAllComments && comments && comments.length > 2) ? comments.slice(-2) : comments;

	const renderCommentActions = (comment) => [
		<Tooltip title="Upvote">
			<LikeOutlined
				onClick={() => handleCommentLike(comment.id, true)}
				style={{ marginRight: 8, fontSize: 20, color: comment.liked ? '#7952CC' : 'black' }}
			/>
		</Tooltip>,
		<span >{comment.likeCount}</span>,
		<Tooltip title="Downvote">
			<DislikeOutlined
				onClick={() => handleCommentLike(comment.id, false)}
				style={{ fontSize: 20, color: comment.disliked ? '#7952CC' : 'black' }}
			/>
		</Tooltip>,
		comment.dislikeCount,
	];

	const handleFollowUser = async (username) => {
		setIsFollowing(!isFollowing);
		await fetchApi('/api/communities/follow-user', { username });
	};

	return (
		<Card style={{ marginBottom: '16px', boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}>
			<Card.Meta
				avatar={<Avatar style={{ backgroundColor: "#b4b1ba" }}  icon={<UserOutlined />} />}
				title={<div style={{ color: "#7952CC" }}>{postData.username} {postData.username !== userInfo.username ?  <Button size='small' onClick={() => {handleFollowUser(postData.username)}}> {isFollowing ? 'Unfollow' : 'Follow'} </Button> : null }</div>}
				description={new Date(postData.createdAt).toLocaleString()}
			/>
			<div style={{ marginTop: 20 }}>
				<span style={{ color: "#240763", fontWeight: 600 }}>Template:</span> {templateName || ''}
			</div>
			<Divider />
			<div >
				{templateRows && templateRows.map((row, index) => (
					<div key={index} style={{ marginBottom: '8px' }}>
						<Space direction="vertical" style={{ marginBottom: 5 }}>
							<Text strong style={{ color: "#240763", marginTop: 5 }}>{row.title}</Text>
							{renderRow(row)}
						</Space>
						{index !== templateRows.length - 1 && <Divider style={{ margin: '8px 0' }} />}
					</div>
				))}
			</div>
			<Divider />
			<div style={{ marginBottom: 10 }}>
				<Tooltip title="Upvote">
					<LikeOutlined onClick={() => handlePostLike(true)} style={{ marginRight: 3, fontSize: 20, color: liked ? '#7952CC' : 'black' }} />
				</Tooltip>
				<span style={{ marginRight: 20 }}>	{postLikes}</span>
				<Tooltip title="Downvote">
					<DislikeOutlined onClick={() => handlePostLike(false)} style={{ marginRight: 5, fontSize: 20 , color: disliked ? '#7952CC' : 'black'}} />
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
					/>
					<Button icon={<CommentOutlined />} onClick={handleAddComment}>Add Comment</Button>
				</Flex>

				{!loadingComments ? (
					visibleComments.map((comment, index) => (
						<div>
							<Comment
								key={index}
								actions={renderCommentActions(comment)} // Pass the comment object to renderCommentActions function
								author={comment.username}
								content={comment.comment}
								datetime={new Date(comment.createdAt).toLocaleString('tr-TR', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric',
									hour: '2-digit',
									minute: '2-digit',
								})}
								style={{borderTop: "1px solid #f0f0f0" }}
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
		</Card>
	);
};

export default Post;
