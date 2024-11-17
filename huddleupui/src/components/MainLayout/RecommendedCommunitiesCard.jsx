import React, { useEffect, useState } from 'react';
import {Card, Avatar, Spin, message, Row, Col} from 'antd';
import axios from 'axios';
import {Link} from "react-router-dom";

const RecommendedCommunitiesCard = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedCommunities = async () => {
      try {
        const response = await axios.get('/api/communities/rec-communities/');
        setCommunities(response.data);
        setLoading(false);
      } catch (error) {
        message.error('Failed to fetch recommended communities');
        setLoading(false);
      }
    };

    fetchRecommendedCommunities();
  }, []);

  // Don't render anything if data is empty and not loading
  if (!loading && communities.length === 0) {
    return null;
  }

  return (
      <Card title="Recommended Communities" style={{ marginBottom: 16 }} bordered={false}>
        {loading ? (
          <Spin />
        ) : (
            <Row gutter={[20, 20]}>
            {communities.map((community) => (
                 <Link to={`/communities/${community.comm_id}`} key={community.comm_id}>
                      <Col span={30} justify="center">
                            <Row justify="center">
                                <Avatar src={`${community.comm_image}`} size={35} />
                            </Row>
                          <Row justify="center" style={{ textAlign: 'center', color: 'black', textDecoration: 'none' }}>
                                        <span>{community.comm_name}</span>
                        </Row>
                    </Col>
                </Link>
            ))}
            </Row>
        )}
      </Card>
  );
};

export default RecommendedCommunitiesCard;
