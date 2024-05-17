import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import fetchApi from '../../api/fetchApi';
import { useParams } from 'react-router-dom';
import { Spin, message, Table, Button, Form, Input } from 'antd';

const { Item } = Form;

export default function CommunityInvitations() {
    const navigate = useNavigate();
    const [invitations, setInvitations] = useState([]);
    const [invitationsLoading, setInvitationsLoading] = useState(true);
    const [form] = Form.useForm();

    const { communityId } = useParams();

    const onFinish = async (values) => {
        try {
            message.loading('Creating invitation...');
            const payload = { ...values, communityId };
            const response = await fetchApi('/api/communities/create-invitation', payload);
            if (response && response.success) {
                console.log(response)
                message.success('Invitation created successfully!');
                // Add new invitation to the list
                setInvitations([...invitations, response.data]);
                form.resetFields();
            } else {
                message.error('Failed to create invitation.');
            }
        } catch (error) {
            console.error('Error creating invitation:', error);
            message.error('Failed to create invitation. Please try again later.');
        }
    };


    const handleCancelInvitation = async (invitationId) => {
        try {
            message.loading('Canceling invitation...');
            const response = await fetchApi('/api/communities/cancel-invitation', { invitationId });
            if (response && response.success) {
                message.success('Invitation canceled successfully!');
                // Remove canceled invitation from the list
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
			title: 'Username',
			dataIndex: 'username',
			key: 'username',
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
				<Button onClick={() => handleCancelInvitation(record.id)}>Cancel</Button>
			),
		},
	];

    const invitations_result = useApi('/api/communities/get-invitations-community', { communityId });

    invitations_result.then((response) => {
        if (response && !response.loading && invitationsLoading) {
            setInvitations(response.data.data);
            setInvitationsLoading(false);
        }
    });

    return (
        <div>
            <h1>Invitations</h1>
            <Form form={form} onFinish={onFinish} layout="inline">
                <Item name="username" rules={[{ required: true, message: 'Please enter username' }]}>
                    <Input placeholder="Username" />
                </Item>
                <Item>
                    <Button type="primary" htmlType="submit">
                        Invite
                    </Button>
                </Item>
            </Form>
            <Table
                dataSource={invitations}
                columns={columns}
                loading={invitationsLoading}
                rowKey="id"
            />
        </div>
    );
}