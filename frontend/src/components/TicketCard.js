import { useEffect, useState } from 'react';
import { Card, Button, Form, Row, Col, Badge, InputGroup } from 'react-bootstrap';
import { deleteTicketApi, updateTicketApi } from '../api/ticketApi';
import { addCommentApi, getLastCommentApi } from '../api/commentApi';

const TicketCard = ({ ticket, fetchTickets }) => {
    const isAdmin = sessionStorage.getItem('role') === 'ADMIN';

    const [isEditing, setIsEditing] = useState(false);
    const [status, setStatus] = useState(ticket.status);
    const [priority, setPriority] = useState(ticket.priority);
    const [assignee, setAssignee] = useState(ticket.assignee?.name || '');

    // COMMENT STATE
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [lastComment, setLastComment] = useState('');

    useEffect(() => {
        const fetchLastComment = async () => {
            try {
                const response = await getLastCommentApi(ticket.ticket_id);
                if (response.status && response.comment) {
                    setLastComment(response.comment);
                }
            } catch (error) {
                console.error('Failed to fetch last comment:', error);
            }
        };
        fetchLastComment();
    }, [ticket.ticket_id]);

    const handleEditClick = () => setIsEditing(true);

    const handleSaveClick = async () => {
        // handleSaveComment
        const updatedTicket = { status, priority, assignee };
        try {
            const result = await updateTicketApi(ticket.ticket_id, updatedTicket);
            if (result.status) {
                fetchTickets();
            }
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating ticket:', error);
            alert('Failed to update ticket. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            const result = await deleteTicketApi(ticket.ticket_id);
            if (result.status) {
                fetchTickets();
            }
        } catch (error) {
            console.error('Error deleting ticket:', error);
            alert('Failed to delete ticket. Please try again.');
        }
    };

    const handleAddCommentClick = () => {
        setShowCommentInput(true);
    };

    const handleSaveComment = async () => {
        if (!commentText.trim()) return;
        try {
            const response = await addCommentApi(ticket.ticket_id, commentText);
            if (response.status) {
                setLastComment(commentText);
                setCommentText('');
                setShowCommentInput(false);
            }
        } catch (error) {
            console.error('Failed to add comment:', error);
            alert('Could not save comment.');
        }
    };

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

                <Row className="mb-2">
                    <Col>
                        <strong>Description</strong>
                        <p className="small">{ticket.details}</p>
                    </Col>
                </Row>

                {lastComment && (
                    <Row className="mb-3">
                        <h6 className="mb-2">Last Comment</h6>
                        <Col>
                            <p className="small mb-0">{lastComment}</p>
                        </Col>
                    </Row>
                )}
                <Row className="mb-2">
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
                {showCommentInput && (
                    <>
                    <Row className="mb-3">
                        <Col>
                            <h6 className="mb-2">Add Comment</h6>
                            <InputGroup className="mb-2">
                                <Form.Control
                                    placeholder="Write your comment..."
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    size="sm"
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>

                        <Col>
                                <Button variant="success" size="sm" onClick={handleSaveComment}>
                                    Save Comment
                                </Button>
                        </Col>
                    </Row>
                    </>
                )}
                <Row className="mb-3">
                    <Col className="d-flex gap-2 flex-wrap">
                        {!showCommentInput && (
                            <Button variant="outline-secondary" size="sm" onClick={handleAddCommentClick}>
                                Add Comment
                            </Button>
                        )}
                    </Col>
                </Row>

                {isAdmin && (
                    <Row>
                        <Col className="d-flex gap-2">
                            {isEditing ? (
                                <Button variant="success" size="sm" onClick={handleSaveClick}>
                                    Save
                                </Button>
                            ) : (
                                <Button variant="primary" size="sm" onClick={handleEditClick}>
                                    Edit
                                </Button>
                            )}
                            <Button variant="outline-danger" size="sm" onClick={handleDelete}>
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
