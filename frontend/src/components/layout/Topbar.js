import { Container, Nav, Navbar, Dropdown, Badge } from 'react-bootstrap';
import { FaBell, FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import './Topbar.css'; // We'll create this next

export default function Topbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <Navbar bg="white" expand="lg" className="topbar shadow-sm">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
                    ALPS CRM
                </Navbar.Brand>

                <Nav className="ms-auto align-items-center">
                    {/* Notification Bell with Badge */}
                    <Nav.Link className="position-relative mx-2">
                        <FaBell size={20} className="text-secondary" />
                        <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                            3
                        </Badge>
                    </Nav.Link>

                    {/* User Dropdown */}
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="light" id="dropdown-user" className="d-flex align-items-center">
                            <div className="d-flex align-items-center">
                                <FaUserCircle size={28} className="text-primary me-2" />
                                <div className="text-start d-none d-sm-block">
                                    <div className="fw-bold">{user?.username}</div>
                                    <div className="small text-muted">{user?.role}</div>
                                </div>
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="shadow-sm">
                            <Dropdown.Item as={Link} to="/profile">
                                <FaUserCircle className="me-2" />
                                Profile
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/settings">
                                <FaCog className="me-2" />
                                Settings
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={logout}>
                                <FaSignOutAlt className="me-2" />
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    );
}