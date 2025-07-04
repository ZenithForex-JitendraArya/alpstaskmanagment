import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { ArrowLeft, PlusCircle } from 'react-bootstrap-icons';
import NavBar from '../components/layout/Navbar';
import { getProjectByIdApi } from '../api/projectApi';
import CreateTicketModal from '../modal/CreateTicketModal';
import TicketCard from '../components/TicketCard';
// import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management

const ProjectDetail = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [tickets, setTickets] = useState({
        pending: [],
        open: [],
        resolved: []
    });
    // Add to your ProjectDetail component
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('OPEN');
    const [users, setUsers] = useState([]); // You'll need to fetch users from your API
    const [loading, setLoading] = useState(true);

    // Get user role from Redux store (adjust according to your state structure)
    // const { user } = useSelector(state => state.auth);
    const isAdmin = sessionStorage.getItem('role') === 'ADMIN';

    useEffect(() => {
        fetchTickets();
    }, []);
    const fetchTickets = async () => {
        try {
            const response = await getProjectByIdApi(projectId);
            // pendingTickets: pendingTickets,
            //     openTickets: openTickets,
            //         resolvedTickets: resolvedTickets
            setTickets({
                pending: response.pendingTickets,
                open: response.openTickets,
                resolved: response.resolvedTickets
            });
        } catch (error) {
            console.error("Failed to fetch tickets:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleAddTicket = (status) => {
        setSelectedStatus(status);
        setShowCreateModal(true);
    };

    return (
        <>
            <NavBar />
            <Container className="py-4" style={{ marginTop: '70px' }}>
                <Button variant="light" onClick={() => navigate(-1)} className="mb-3">
                    <ArrowLeft className="me-2" /> Back to Projects
                </Button>

                <h2 className="mb-4">Project Dashboard</h2>

                {loading ? (
                    <div>Loading tickets...</div>
                ) : (
                    <Row>
                        {/* Hold Column */}
                        <Col md={4}>
                            <Card className="mb-4">
                                <Card.Header className="bg-secondary bg-opacity-10">
                                    <h5>Open ({tickets.open.length})</h5>
                                </Card.Header>
                                <Card.Body>
                                    {tickets.open.map(ticket => (
                                        <TicketCard key={ticket.id} ticket={ticket} fetchTickets={fetchTickets} />
                                    ))}
                                    {isAdmin && (
                                        <Button
                                            variant="outline-success"
                                            size="sm"
                                            onClick={() => handleAddTicket('hold')}
                                            className="mt-2"
                                        >
                                            <PlusCircle size={14} className="me-1" /> Add Ticket
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                        {/* Pending Column */}
                        <Col md={4}>
                            <Card className="mb-4">
                                <Card.Header className="bg-warning bg-opacity-10">
                                    <h5>Pending ({tickets.pending.length})</h5>
                                </Card.Header>
                                <Card.Body>
                                    {tickets.pending.map(ticket => (
                                        <TicketCard key={ticket.id} ticket={ticket} fetchTickets={fetchTickets} />
                                    ))}
                                    {isAdmin && (
                                        <Button
                                            variant="outline-success"
                                            size="sm"
                                            onClick={() => handleAddTicket('pending')}
                                            className="mt-2"
                                        >
                                            <PlusCircle size={14} className="me-1" /> Add Ticket
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Done Column */}
                        <Col md={4}>
                            <Card className="mb-4">
                                <Card.Header className="bg-success bg-opacity-10">
                                    <h5>Resolved ({tickets.resolved.length})</h5>
                                </Card.Header>
                                <Card.Body>
                                    {tickets.resolved.map(ticket => (
                                        <TicketCard key={ticket.id} ticket={ticket} fetchTickets={fetchTickets} />
                                    ))}
                                    {isAdmin && (
                                        <Button
                                            variant="outline-success"
                                            size="sm"
                                            onClick={() => handleAddTicket('done')}
                                            className="mt-2"
                                        >
                                            <PlusCircle size={14} className="me-1" /> Add Ticket
                                        </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>
            <CreateTicketModal
                show={showCreateModal}
                handleClose={() => { setShowCreateModal(false); }}
                projectId={projectId}
                status={selectedStatus}
                users={users}
            />
        </>
    );
};



export default ProjectDetail;