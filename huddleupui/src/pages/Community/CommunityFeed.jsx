import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from 'hooks/useApi';
import { useParams } from 'react-router-dom';
import Post from 'components/Community/Post';
import { Spin } from 'antd';

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
			{posts.length > 0 && posts.map((post) => (
				<Post postData={post} key={post.id}></Post>
			))}
			{postsLoading ? (
				<div style={{ marginTop: '20px', textAlign: 'center' }}>
					<Spin tip="Loading Posts" size="large">
						<div className="content" />
					</Spin>
				</div>
			) : (
				!posts.length === 0 && <div>No posts found</div>
			)}
		</div>
	)
}