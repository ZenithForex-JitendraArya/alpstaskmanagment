import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Badge } from 'react-bootstrap';
import { PlusCircle, Link45deg, Clock, Person } from 'react-bootstrap-icons';
import { getAllProjectApi } from '../../api/projectApi';
import DialogModal from '../DialogModal';
import { useNavigate } from 'react-router-dom';

const ProjectsList = () => {
    const isAdmin = sessionStorage.getItem('role') === 'ADMIN';
    const [onceRun, setOnceRun] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [projectList, setProjectList] = useState([])
    const [showCreateProj, setShowCreateProj] = useState(false)


    const navigate=useNavigate();
    useEffect(() => {
        if (!onceRun) {
            console.log('Effect running');
            const fetchAllProject = async () => {
                try {
                    const response = await getAllProjectApi();
                    
                    setProjectList(response.projectsList)
                } catch (error) {
                    setModalTitle("Error");
                    setModalMessage(error.message || "Login failed. Please try again.");
                    setModalShow(true);
                }
            }
            fetchAllProject();
            setOnceRun(true);
        }
    }, [])
    const handleCloseModal=()=>{
        setModalShow(false)
    }
    const createBtnHandler = () => {
        console.log('navbar')
        setShowCreateProj(true)
        navigate("/create-project");
    }
    return (
        <>
            <Container className="py-4" style={{ marginTop: '70px' }}>
                <Row className="mb-4 align-items-center">
                    <Col>
                        <h2 className="mb-0">
                            {/* <Clock className="me-2" /> */}
                            All Project Link
                        </h2>
                    </Col>
                    {isAdmin && (
                        <Col xs="auto">
                            <Button variant="success" className="shadow-sm" onClick={createBtnHandler}>
                                <PlusCircle className="me-2" />
                                New Project
                            </Button>
                        </Col>
                    )}
                </Row>

                <Card className="shadow-sm">
                    <ListGroup variant="flush">
                        {projectList.map((project) => (
                            <ListGroup.Item key={project.id}
                                as="div"
                                action className="py-3 px-4">
                                <Row className="align-items-center">
                                    <Col md={6} className="mb-2 mb-md-0">
                                        <h4 className="mb-2 text-primary">{project.title}</h4>
                                        {/* <div className="d-flex flex-wrap gap-2">
                                            <Badge bg="light" text="dark" className="d-flex align-items-center px-3 py-2">
                                                <Person className="me-2" />
                                                <span className="fw-bold">{project.client}</span>
                                            </Badge>
                                            <Badge bg="light" text="dark" className="d-flex align-items-center px-3 py-2">
                                                <Clock className="me-2" />
                                                <span>{project.lastViewed}</span>
                                            </Badge>
                                        </div> */}
                                    </Col>
                                    <Col md={6} className="d-flex justify-content-md-end mt-2 mt-md-0">
                                        <Button
                                            variant="outline-primary"
                                            className="d-flex align-items-center px-4 py-2"
                                            onClick={() =>  navigate(`/project/${project.project_id}`)}
                                        >
                                            <Link45deg className="me-2" size={18} />
                                            <span>View Links ({project.links})</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
            </Container>
            <DialogModal
                show={modalShow}
                title={modalTitle}
                message={modalMessage}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default ProjectsList;