import { useState } from 'react';
import { Card, Button, Form, Row, Col, Badge } from 'react-bootstrap';
import { deleteTicketApi, updateTicketApi } from '../api/ticketApi';

const TicketCard = ({ ticket, fetchTickets }) => {
    console.log(ticket)
    const isAdmin = sessionStorage.getItem('role') === 'ADMIN';
    const [isEditing, setIsEditing] = useState(false);

    const [status, setStatus] = useState(ticket.status);
    const [priority, setPriority] = useState(ticket.priority);
    const [assignee, setAssignee] = useState(ticket.assignee?.name || '');

    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleAddComment = () => {
    };

    const handleSaveClick = async () => {
        const updatedTicket = {
            status,
            priority,
            assignee
        };

        try {
            const result = await updateTicketApi(ticket.ticket_id, updatedTicket);
            if (result.status) {
                fetchTickets()
                setStatus(result.status);
                setPriority(result.priority);
                setAssignee(result.assignee?.name || '');
            }
            // ✅ If your API returns the updated ticket, update local state too:

            setIsEditing(false);
        } catch (error) {
            console.error('Error updating ticket:', error);
            alert('Failed to update ticket. Please try again.');
        }
    };

    const handleDelete = async (ticket) => {
        try {
            const result = await deleteTicketApi(ticket.ticket_id);
            if (result.status) {
                fetchTickets()
            }
        } catch (error) {
            console.error('Error updating ticket:', error);
            alert('Failed to update ticket. Please try again.');
        }
    }

    return (
        <Card className="mb-3 shadow-sm border-0">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">{ticket.subject}</h6>
            </Card.Header>

            <Card.Body>
                <Row>
                    <Col>
                        <small className="text-muted">
                            Created: {new Date(ticket.createdAt).toLocaleDateString()}
                        </small>
                    </Col>
                </Row>

                <Row className="mb-1 border-2">
                    <strong>Description</strong>
                    <Col>
                        <p className="small">{ticket.details}</p>
                    </Col>
                </Row>

                <Row className="mb-1">
                    <Col md="auto">
                        <Form.Group>
                            <Form.Label className="small mb-1">Status</Form.Label>
                            <Form.Select
                                size="sm"
                                value={status}
                                disabled={!isEditing}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="OPEN">OPEN</option>
                                <option value="PENDING">PENDING</option>
                                <option value="RESOLVED">RESOLVED</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md="auto">
                        <Form.Group>
                            <Form.Label className="small mb-1">Priority</Form.Label>
                            <Form.Select
                                size="sm"
                                value={priority}
                                disabled={!isEditing}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="HIGH">HIGH</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="LOW">LOW</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md="auto">
                        <Form.Group>
                            <Form.Label className="small mb-1">Assignee</Form.Label>
                            <Form.Control
                                type="text"
                                size="sm"
                                value={assignee}
                                disabled={!isEditing}
                                onChange={(e) => setAssignee(e.target.value)}
                                placeholder="Name"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                {/* <Row className="mb-3">
                    <Col>
                        <Badge
                            bg={
                                priority === 'HIGH'
                                    ? 'danger'
                                    : priority === 'MEDIUM'
                                        ? 'warning'
                                        : 'success'
                            }
                            className="me-2"
                        >
                            Priority: {priority}
                        </Badge>

                        <Badge
                            bg={
                                status === 'OPEN'
                                    ? 'info'
                                    : status === 'PENDING'
                                        ? 'warning'
                                        : 'success'
                            }
                            className="me-2"
                        >
                            Status: {status}
                        </Badge>

                        <Badge bg="secondary">
                            Assigned: {assignee || 'Unassigned'}
                        </Badge>
                    </Col>
                </Row> */}

                <Row className="mb-3">
                    <Col className="d-flex gap-2 flex-wrap">
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleAddComment(ticket)}
                        >
                            Add Comment
                        </Button>


                    </Col>
                </Row>

                {isAdmin && (
                    <Row>
                        <Col className="d-flex gap-2">
                            {isEditing ? (
                                <Button
                                    variant="success"
                                    size="sm"
                                    onClick={handleSaveClick}
                                >
                                    Save
                                </Button>
                            ) : (
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={handleEditClick}
                                >
                                    Edit
                                </Button>
                            )}
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(ticket)}
                            >
                                Delete
                            </Button>
                        </Col>
                    </Row>
                )}
            </Card.Body>
        </Card>
    );
};

export default TicketCard;
