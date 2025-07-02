import React, { useState } from 'react';
import { Form, Alert, Button } from 'react-bootstrap';
import { PlusCircle } from 'react-bootstrap-icons';
import { createProjectApi } from '../../api/projectApi';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
    const [projectData, setProjectData] = useState({
        userId: sessionStorage.getItem('userId'),
        name: '',
        description: '',
        startDate: '',
        endDate: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const obj = {
                projectName: projectData.name,
                description: projectData.description,
                startDate: projectData.startDate,
                endDate: projectData.endDate,
            }
            const response = await createProjectApi(obj);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                // Reset form
                setProjectData({
                    name: '',
                    description: '',
                    startDate: '',
                    endDate: ''
                });
            }, 1500);
            navigate('/home');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create project');
        }
    };

    return (
        <div className="create-project-form p-4 border rounded mt-4"> {/* Added mt-4 for margin top */}
            <h3 className="mb-4">
                <PlusCircle className="me-2" />
                Create New Project
            </h3>

            <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
                {success && <Alert variant="success" className="mb-4">Project created successfully!</Alert>}

                <Form.Group className="mb-3">
                    <Form.Label>Project Name *</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={projectData.name}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={projectData.description}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <div className="row mb-3">
                    <Form.Group className="col-md-6">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="startDate"
                            value={projectData.startDate}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="col-md-6">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="endDate"
                            value={projectData.endDate}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                    <Button
                        variant="primary"
                        type="submit"
                        className="px-4"
                    >
                        Create Project
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CreateProject;