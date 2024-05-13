import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Card, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';

export default function CommunitySettings() {
	const [templates, setTemplates] = useState([]);

	const navigate = useNavigate()

	const { communityId } = useParams();

	const templates_result = useApi('/api/communities/templates/get-templates', { communityId });

	templates_result.then((response) => {
		if (response && !response.loading && templates.length === 0) {
			setTemplates(response.data.data)
		}
	})

	// Community Settings page, now there will be a button to add a template to navigate to add template page
	// If no templates are added, a message will be displayed to add a template
	// If templates are added, they will be displayed in a list
	return (
		<div>
			<div style={{ display: 'flex' }}>
				<h2 style={{ color: '#5c5b5b', marginLeft: 5 }}>
					Community Settings
				</h2>
				<Link to={`/communities/${communityId}`} style={{ marginLeft: 'auto', marginTop: 10 }}>
					<Button  >
						Back to Community
					</Button>
				</Link>
			</div>

			<Card style={{ textAlign: 'center', padding: 20, boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}>
				{templates && templates.length === 0 ? (
					<h3>No templates added yet</h3>
				) : (
					<div>
						<h3>Templates</h3>
						{templates.map((template) => (
							<div key={template.id}>
								<h4>{template.templateName}</h4>
							</div>
						))}
					</div>
				)}
				<Button
					type="primary"
					size="large"
					style={{ backgroundColor: '#7952CC', fontWeight: 700 }}
					onClick={() => navigate(`/communities/${communityId}/create-template`)}
				>
					+ Add Template
				</Button>
			</Card>
		</div>
	);
}
