import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import fetchApi from '../api/fetchApi';
import { useParams } from 'react-router-dom';
import { Spin, message, Table, Button, Form, Input } from 'antd';

const { Item } = Form;

export default function CommunityInvitations() {
	const [invitations, setInvitations] = useState([]);
	const [invitationsLoading, setInvitationsLoading] = useState(true);


	const { communityId } = useParams();


	const handleResponseInvitation = async (invitationId, invitationResponse) => {
		try {
			const response = await fetchApi('/api/communities/response-invitation', { invitationId, response: invitationResponse });
			if (response && response.success) {
				if (invitationResponse === 'accept') {
					message.success('Invitation accepted successfully!');
				} else {
					message.success('Invitation declined successfully!');
				}

				// Remove responsed invitation from the list
				setInvitations(invitations.filter(invitation => invitation.id !== invitationId));
			} else {
				message.error('Failed to cancel invitation.');
			}
		} catch (error) {
			console.error('Error canceling invitation:', error);
			message.error('Failed to cancel invitation. Please try again later.');
		}
	};

	const columns = [
		{
			title: 'Community Name',
			dataIndex: 'community',
			key: 'community',
		},
		{
			title: 'Invitation Date',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (text, record) => new Date(record.createdAt).toLocaleString('tr-TR', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
			}),
		},
		{
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				<div>
					<Button onClick={() => handleResponseInvitation(record.id, 'accept')}>Accept</Button>
					<Button onClick={() => handleResponseInvitation(record.id, 'decline')}>Decline</Button>
				</div>

			),
		},
	];

	const invitations_result = useApi('/api/communities/get-invitations-user', { communityId });

	invitations_result.then((response) => {
		if (response && !response.loading && invitationsLoading) {
			setInvitations(response.data.data);
			setInvitationsLoading(false);
		}
	});

	return (
		<div>
			<h2 style={{ color: '#5c5b5b' }}>
				Invitations
			</h2>
			<Table
				dataSource={invitations}
				columns={columns}
				loading={invitationsLoading}
				rowKey="id"
			/>
		</div>
	);
}