import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Flex } from 'antd';
import { LockOutlined, UserOutlined, CrownOutlined } from '@ant-design/icons';
import useApi from '../hooks/useApi';

const { Meta } = Card;

const Communities = () => {
	const [communities, setCommunities] = useState([]);
	const [communitiesLoading, setCommunitiesLoading] = useState(true);

	const communities_result = useApi('/api/communities/get-user-communities', {});

	communities_result.then((response) => {
		if (response && !response.loading && communitiesLoading) {
			setCommunities(response.data.data);
			setCommunitiesLoading(false);
		}
	});

	const truncateDescription = (description, maxLength) => {
		if (description.length > maxLength) {
			return `${description.slice(0, maxLength)}...`;
		}
		return description;
	};

	return (
		<div>
			<h2 style={{ color: '#5c5b5b' }}>
				All communities you've joined {communities && communities.length > 0 ? `(${communities.length})` : '(0)'}
			</h2>

			<div style={{ display: 'flex', flexWrap: 'wrap' }}>

				{communities && communities.map((community) => (
					<Card
						key={community.id}
						style={{ width: 350, marginBottom: 20, marginRight: 20, boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
						actions={[
							<Link to={`/communities/${community.id}`}>
								<Button style={{ borderColor: '#7952CC', color: '#7952CC', fontWeight: 800 }} size="middle">
									Visit the community
								</Button>
							</Link>,
						]}
					>
						<Flex>
							<div style={{ width: 80, height: 80, border: '4px solid #e8e8e', borderRadius: 15, marginBottom: 10, overflow: 'hidden' }}>
								<img alt={community.name} src={`${community.mainImage}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
							</div>
							<Meta
								title={community.name}
								style={{ marginTop: 30, marginLeft: 20 }}
							/>
						</Flex>


						<div style={{ marginTop: 10, fontWeight: 500, color: '#626263' }}>
							<div style={{ marginBottom: 15 }}>{truncateDescription(community.description, 50)}</div>
							{community.isPrivate ? <div> <LockOutlined style={{ marginRight: 5 }} />Private Community  </div> : <div> <UserOutlined style={{ marginRight: 5 }} />Public Community </div>}
							{community.type === 'owner' && <CrownOutlined style={{ marginRight: 5 }} />}
							{community.type === 'moderator' && <UserOutlined style={{ marginRight: 5 }} />}
							{community.type === 'member' && <UserOutlined style={{ marginRight: 5 }} />}
							<span>{community.type}</span>
						</div>
					</Card>
				))}

			</div>

			{communities && communities.length === 0 && (
				<Card style={{ marginBottom: 20, marginRight: 20, boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}>
					<div style={{ color: '#5c5b5b', marginTop: 20, fontSize: 15, fontWeight: 600 }}>You haven't joined any communities yet. <Link style={{ color: '#7952CC' }} to="/communities/new">Create one now!</Link></div>
				</Card>
			)}
		</div>
	);
};

export default Communities;
