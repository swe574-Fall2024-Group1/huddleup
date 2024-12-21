import { useState } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { LoadingOutlined, } from '@ant-design/icons';
import { LockOutlined, UserOutlined, CrownOutlined } from '@ant-design/icons';
import FeedPost from '../components/Feed/FeedPost';
import { Button, Card, Spin, Grid } from 'antd';

const { useBreakpoint } = Grid;

export default function UserFeed() {
	const screens = useBreakpoint();

	const [posts, setPosts] = useState([]);
	const [postsLoading, setPostsLoading] = useState(true);

	const [activeCommunities, setActiveCommunities] = useState([]);
	const [promotedCommunities, setPromotedCommunities] = useState([]);
	const [topCommunitiesLoading, setTopCommunitiesLoading] = useState(true);

	const top_communities_result = useApi('/api/communities/get-top-communities', {});

	top_communities_result.then((response) => {
		if (response && !response.loading && topCommunitiesLoading) {

			const { activeCommunities, promotedCommunities } = response.data.data
			setActiveCommunities(activeCommunities)
			setPromotedCommunities(promotedCommunities)
			setTopCommunitiesLoading(false)
		}
	})


	const posts_result = useApi('/api/communities/get-user-feed', {});

	posts_result.then((response) => {
		if (response && !response.loading && postsLoading) {
			setPosts(response.data.data)
			setPostsLoading(false)
		}
	})

	const truncateDescription = (description, maxLength) => {
		if (description.length > maxLength) {
			return `${description.slice(0, maxLength)}...`;
		}
		return description;
	};

	const cardContainerStyle = {
		display: 'flex',
		flexWrap: screens.md ? 'wrap' : 'nowrap',  // Wrap cards to next line if there's not enough space
		justifyContent: 'space-between',  // Align cards with space between them
		overflow: screens.md ? "" : "scroll",
	}

	const activeIndicatorStyle = {
		position: 'absolute',
		top: 10,
		right: 10,
		backgroundColor: 'green',
		color: 'white',
		padding: '4px 8px',
		borderRadius: 5,
		fontWeight: 'bold',
	};

	const promotedIndicatorStyle = {
		position: 'absolute',
		top: 10,
		right: 10,
		backgroundColor: '#b3870e',
		color: 'white',
		padding: '4px 8px',
		borderRadius: 5,
		fontWeight: 'bold',
	};

	return (
		<div style={{ marginTop: 10 }}>
			{posts && posts.length > 0 && posts.map((post) => (
				<FeedPost postData={post} key={post.id}></FeedPost>
			))}
			{postsLoading ? (
				<div style={{ marginTop: '20px', textAlign: 'center' }}>
					<Spin size='large' indicator={<LoadingOutlined style={{ fontSize: 50, color: '#7952CC', margin: 50 }} spin />} />
				</div>
			) : (
				!posts.length === 0 && <div>No posts found</div>
			)}
			{posts.length === 0 && !postsLoading && (
				<div>
					<Card style={{ textAlign: 'center', padding: 20, boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}>
						<p style={{ fontSize: 20 }}>
							No post shared yet. Why don't you start by adding one? 🚀
						</p>
					</Card>

					<Card style={{ marginTop: 20, padding: 20, boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}>
						<h2 style={{ fontSize: 20, marginBottom: 20 }}>Discover New Communities</h2>
						{topCommunitiesLoading ? (
							<div style={{ marginTop: '20px', textAlign: 'center' }}>
								<Spin size='large' indicator={<LoadingOutlined style={{ fontSize: 50, color: '#7952CC', margin: 50 }} spin />} />
							</div>
						) : (
							null
						)}
						{!topCommunitiesLoading && activeCommunities.length > 0 && (
							<div style={cardContainerStyle}>
								{activeCommunities.map((community) => (
									<Card
										key={community.id}
										style={{
											width: screens.md ? 200 : "max-content",
											marginBottom: 20,
											marginRight: 20,
											boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
											padding: screens.md ? "20px" : "10px",
										}}
										actions={[
											<Link to={`/communities/${community.id}`} key="visit">
												<Button
													style={{ borderColor: '#7952CC', color: '#7952CC', fontWeight: 800, padding: screens.md ? "0px 5px" : "0px 10px"}}
													size="middle"
												>
													Visit the community
												</Button>
											</Link>,
										]}
									>
										<div style={activeIndicatorStyle}>Active</div>
										<div style={{ alignItems: 'center', marginBottom: 10 }}>
											<div
												style={{
													width: 80,
													height: 80,
													border: '4px solid #e8e8e8',
													borderRadius: 15,
													overflow: 'hidden',
													marginRight: 20,
													margin: 'auto'
												}}
											>
												<img
													alt={community.name}
													src={community.mainImage}
													style={{ width: '100%', height: '100%', objectFit: 'cover' }}
												/>
											</div>
											<div style={{minHeight:120}}>
												<h3 style={{ marginTop: 0 }}>{community.name}</h3>
												<p style={{ marginBottom: 15, color: '#626263' }}>
													{truncateDescription(community.description, 50)}...
												</p>
												<div>
													{community.isPrivate ? (
														<span>
															<LockOutlined style={{ marginRight: 5 }} />
															Private Community
														</span>
													) : (
														<span>
															<UserOutlined style={{ marginRight: 5 }} />
															Public Community
														</span>
													)}
													{community.type === 'owner' && <CrownOutlined style={{ marginRight: 5 }} />}
													{community.type === 'moderator' && <UserOutlined style={{ marginRight: 5 }} />}
													{community.type === 'member' && <UserOutlined style={{ marginRight: 5 }} />}
													<span>{community.type}</span>
												</div>
											</div>
										</div>
									</Card>
								))}
							</div>
						)}
						{!topCommunitiesLoading && promotedCommunities.length > 0 && (
							<div style={cardContainerStyle}>
								{promotedCommunities.map((community) => (
									<Card
										key={community.id}
										style={{
											width: screens.md ? 200 : "max-content",
											marginBottom: 20,
											marginRight: 20,
											boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
											padding: screens.md ? "20px" : "10px",
										}}
										actions={[
											<Link to={`/communities/${community.id}`} key="visit">
												<Button
													style={{ borderColor: '#7952CC', color: '#7952CC', fontWeight: 800, padding: screens.md ? "0px 5px" : "0px 10px" }}
													size="middle"
												>
													Visit the community
												</Button>
											</Link>,
										]}
									>
										<div style={promotedIndicatorStyle}>Promoted</div>
										<div style={{ alignItems: 'center', marginBottom: 10 }}>
											<div
												style={{
													width: 80,
													height: 80,
													border: '4px solid #e8e8e8',
													borderRadius: 15,
													overflow: 'hidden',
													marginRight: 20,
													margin: 'auto'
												}}
											>
												<img
													alt={community.name}
													src={community.mainImage}
													style={{ width: '100%', height: '100%', objectFit: 'cover' }}
												/>
											</div>
											<div>
												<h3 style={{ marginTop: 0 }}>{community.name}</h3>
												<p style={{ marginBottom: 15, color: '#626263' }}>
													{truncateDescription(community.description, 50)}...
												</p>
												<div>
													{community.isPrivate ? (
														<span>
															<LockOutlined style={{ marginRight: 5 }} />
															Private Community
														</span>
													) : (
														<span>
															<UserOutlined style={{ marginRight: 5 }} />
															Public Community
														</span>
													)}
													{community.type === 'owner' && <CrownOutlined style={{ marginRight: 5 }} />}
													{community.type === 'moderator' && <UserOutlined style={{ marginRight: 5 }} />}
													{community.type === 'member' && <UserOutlined style={{ marginRight: 5 }} />}
													<span>{community.type}</span>
												</div>
											</div>
										</div>
									</Card>
								))}
							</div>
						)}
					</Card>

				</div>
			)}
		</div>
	)
}

