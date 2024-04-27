import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from 'hooks/useApi';
import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import Post from 'components/Community/Post';
import { Button, Card, Spin } from 'antd';

export default function CommunityFeed() {
	const navigate = useNavigate()
	const [posts, setPosts] = useState([]);
	const [postsLoading, setPostsLoading] = useState(true);

	const { communityId } = useParams();

	const posts_result = useApi('/api/communities/get-community-posts', { communityId });

	posts_result.then((response) => {
		if (response && !response.loading && posts.length === 0) {
			setPosts(response.data.data)
			setPostsLoading(false)
		}
	})


	return (
		<div>

			<div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
				<Button
					type="primary"
					size="large"
					style={{ backgroundColor: '#7952CC', fontWeight: 700 }}
					onClick={() => navigate('create-post')}
				>
					+ Add Post
				</Button>
			</div>


			{posts.length > 0 && posts.map((post) => (
				<Post postData={post} key={post.id}></Post>
			))}
			{postsLoading ? (
				<div style={{ marginTop: '20px', textAlign: 'center' }}>
					<Spin size='large' indicator={<LoadingOutlined style={{ fontSize: 50, color: '#7952CC', margin: 50 }} spin />} />
				</div>
			) : (
				!posts.length === 0 && <div>No posts found</div>
			)}
			{posts.length === 0 && !postsLoading && (
				<Card style={{ textAlign: 'center', padding: 20, boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}>
					<p style={{fontSize: 20}}>
						No post shared yet. Why don't you start by adding one? 🚀
					</p>
				</Card>
			)}
		</div>
	)
}