import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, FloatingLabel, Row, Col } from 'react-bootstrap';
import { createTicketApi } from '../api/ticketApi';
import { getAllUserApi } from '../api/userApi';

const CreateTicketModal = ({ show, handleClose, projectId }) => {
    const [formData, setFormData] = useState({
        subject: '',
        details: '',
        priority: 'LOW',
        status:  'OPEN',
        assignedTo: '',
        project_id: projectId
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [userList, setUserList] = useState([])

    useEffect(() => {
        const getAllUser = async () => {
            try {
                const response = await getAllUserApi();
                setUserList(response.users);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to create project');
            }
        };
        getAllUser();
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Basic validation
            const newErrors = {};
            if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
            if (!formData.details.trim()) newErrors.details = 'Details are required';

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                setIsSubmitting(false);
                return;
            }
            console.log(formData)
            const response=await createTicketApi(formData);
            handleClose(true); // Pass true to indicate success
        } catch (error) {
            console.error("Failed to create ticket:", error);
            setErrors({ submit: error.message || 'Failed to create ticket' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal show={show} onHide={() => handleClose(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Create New Ticket</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {errors.submit && (
                        <div className="alert alert-danger">{errors.submit}</div>
                    )}

                    <Row className="mb-3">
                        <Col md={8}>
                            <FloatingLabel controlId="subject" label="Subject" className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Enter subject"
                                    isInvalid={!!errors.subject}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.subject}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Col>
                        <Col md={4}>
                            <FloatingLabel controlId="priority" label="Priority">
                                <Form.Select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                >
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>

                    <FloatingLabel controlId="details" label="Details" className="mb-3">
                        <Form.Control
                            as="textarea"
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            placeholder="Enter ticket details"
                            style={{ height: '150px' }}
                            isInvalid={!!errors.details}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.details}
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <Row className="mb-3">
                        <Col md={6}>
                            <FloatingLabel controlId="status" label="Status">
                                <Form.Select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="OPEN">Open</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="RESOLVED">Resolved</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md={6}>
                            <FloatingLabel controlId="assignedTo" label="Assign To">
                                <Form.Select
                                    name="assignedTo"
                                    value={formData.assignedTo}
                                    onChange={handleChange}
                                >
                                    <option value="">Unassigned</option>
                                    {userList.map(user => (
                                        <option key={user.user_id} value={user.user_id}>
                                            {user.user_id + ' ' + user.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create Ticket'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default CreateTicketModal;