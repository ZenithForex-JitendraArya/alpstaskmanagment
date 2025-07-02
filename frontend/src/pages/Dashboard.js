import { Card, Row, Col, Spinner } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import { FaUsers, FaProjectDiagram, FaTicketAlt } from 'react-icons/fa';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/dashboard/stats');
                setStats(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <Spinner animation="border" className="d-block mx-auto" />;

    return (
        <div>
            <h2 className="mb-4">Welcome back, {user?.username}!</h2>

            <Row className="g-4 mb-4">
                <Col md={4}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body className="text-center">
                            <FaUsers size={40} className="text-primary mb-3" />
                            <h3>{stats?.clients || 0}</h3>
                            <Card.Text>Total Clients</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body className="text-center">
                            <FaProjectDiagram size={40} className="text-success mb-3" />
                            <h3>{stats?.projects || 0}</h3>
                            <Card.Text>Active Projects</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body className="text-center">
                            <FaTicketAlt size={40} className="text-warning mb-3" />
                            <h3>{stats?.tickets || 0}</h3>
                            <Card.Text>Open Tickets</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Recent Activity Section */}
            <Card className="shadow-sm">
                <Card.Header>
                    <h5 className="mb-0">Recent Activity</h5>
                </Card.Header>
                <Card.Body>
                    {stats?.recentActivity?.length > 0 ? (
                        <ul className="list-unstyled">
                            {stats.recentActivity.map((activity, index) => (
                                <li key={index} className="mb-3 pb-2 border-bottom">
                                    <div className="d-flex justify-content-between">
                                        <span>{activity.message}</span>
                                        <small className="text-muted">{new Date(activity.timestamp).toLocaleString()}</small>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted">No recent activity</p>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default Dashboard;