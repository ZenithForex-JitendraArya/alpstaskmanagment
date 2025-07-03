import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { ArrowLeft, PlusCircle } from 'react-bootstrap-icons';
import NavBar from '../components/layout/Navbar';
import { getProjectByIdApi } from '../api/projectApi';
import CreateTicketModal from '../modal/CreateTicketModal';
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

        fetchTickets();
    }, [projectId]);

    useEffect(() => {
        // fetchTickets();
    }, [projectId]);

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
                                            <TicketCard key={ticket.id} ticket={ticket} />
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
                                        <TicketCard key={ticket.id} ticket={ticket} />
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
                                        <TicketCard key={ticket.id} ticket={ticket} />
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

// Sub-component for individual tickets
// import React from 'react';


const TicketCard = ({
    ticket,
    userRole,
    handleEdit,
    handleChangeStatus,
    handleAddComment,
    handleChangePriority,
    handleDelete
}) => {
    const isAdmin = sessionStorage.getItem('role') === 'ADMIN';

    return (
        <Card className="mb-3 shadow-sm border-0">
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                <h6 className="mb-0">{ticket.subject}</h6>
                <div className="d-flex align-items-center gap-2">
                    <Badge bg="light" text="dark">#{ticket.ticket_id}</Badge>
                    <Button
                        variant="outline-light"
                        size="sm"
                        onClick={() => handleEdit(ticket)}
                    >
                        Edit
                    </Button>
                </div>
            </Card.Header>

            <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                    <small className="text-muted">
                        Created: {new Date(ticket.createdAt).toLocaleDateString()}
                    </small>
                </div>

                <p className="small mb-3">{ticket.details}</p>

                <div className="d-flex gap-2 flex-wrap mb-3">
                    <span
                        className={`badge ${ticket.priority === 'HIGH'
                                ? 'bg-danger'
                                : ticket.priority === 'MEDIUM'
                                    ? 'bg-warning text-dark'
                                    : 'bg-success'
                            }`}
                    >
                        Priority: {ticket.priority}
                    </span>

                    <span
                        className={`badge ${ticket.status === 'OPEN'
                                ? 'bg-info'
                                : ticket.status === 'PENDING'
                                    ? 'bg-warning text-dark'
                                    : 'bg-success'
                            }`}
                    >
                        Status: {ticket.status}
                    </span>

                    <span className="badge bg-secondary">
                        Assigned: {ticket.assignee?.name || 'Unassigned'}
                    </span>
                </div>

                <div className="d-flex gap-2 flex-wrap">
                    {/* For CLIENT & ADMIN */}
                    <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleChangeStatus(ticket)}
                    >
                        Change Status
                    </Button>

                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleAddComment(ticket)}
                    >
                        Add Comment
                    </Button>

                    {/* Extra actions for ADMIN only */}
                    {isAdmin === 'ADMIN' && (
                        <>
                            <Button
                                variant="outline-warning"
                                size="sm"
                                onClick={() => handleChangePriority(ticket)}
                            >
                                Change Priority
                            </Button>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(ticket)}
                            >
                                Delete
                            </Button>
                        </>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

// export default TicketCard;


export default ProjectDetail;