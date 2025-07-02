import React, { useState } from 'react';
import { Navbar, Container, Button, Modal, ListGroup } from 'react-bootstrap';
import { Bell, List } from 'react-bootstrap-icons';
import {  useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [showCreateProj, setShowCreateProj]=useState(false)
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();


    const isAdmin = sessionStorage.getItem('role') === 'ADMIN';
    const userId = sessionStorage.getItem('user')
    const name = sessionStorage.getItem('name')
    const email = sessionStorage.getItem('email')


    const handleLogout = () => {
        sessionStorage.clear();
        // localStorage.clear();
        window.location.href = '/login';
    };

    const createBtnHandler=()=>{
        console.log('navbar')
        setShowCreateProj(true)
        navigate("/create-project");
    }


    return (
        <>
            <Navbar bg="primary" variant="dark" fixed="top" className="alps-navbar">
                <Container fluid>
                    <Navbar.Brand href="#" className="alps-logo">ALPSCRM</Navbar.Brand>

                    <div className="d-flex align-items-center">
                        {isAdmin && (
                            <Button variant="success" className="create-btn me-2"
                            onClick={createBtnHandler}>
                                Create
                            </Button>
                        )}
                        <Button variant="link" className="text-white me-2">
                            <Bell size={20} />
                        </Button>
                        <Button
                            variant="link"
                            className="text-white"
                            onClick={() => setShowModal(true)}
                        >
                            <List size={20} />
                        </Button>
                    </div>
                </Container>
            </Navbar>

            {/* User Profile Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center mb-4">
                        <div className="bg-light rounded-circle d-inline-flex p-3">
                            <span className="fs-3">{name?.charAt(0)}</span>
                        </div>
                        <h5 className="mt-3">{name}</h5>
                        <p className="text-muted">{email}</p>
                    </div>

                    <ListGroup variant="flush">
                        {/* <ListGroup.Item action>Switch accounts</ListGroup.Item>
                        <ListGroup.Item action>Manage account</ListGroup.Item>
                        <ListGroup.Item action>Profile and visibility</ListGroup.Item>
                        <ListGroup.Item action>Settings</ListGroup.Item>
                        <ListGroup.Item action>Theme</ListGroup.Item>
                        <ListGroup.Item action>Help</ListGroup.Item>
                        <ListGroup.Item action>Shortcuts</ListGroup.Item> */}
                        <ListGroup.Item
                            action
                            className="text-danger"
                            onClick={handleLogout}
                        >
                            Log out
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default NavBar;