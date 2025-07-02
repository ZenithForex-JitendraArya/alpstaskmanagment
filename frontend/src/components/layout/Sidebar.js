import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { FaHome, FaUsers, FaProjectDiagram, FaTicketAlt, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
    const { pathname } = useLocation();
    const { user, logout } = useContext(AuthContext);

    const navItems = [
        { path: '/', name: 'Dashboard', icon: <FaHome /> },
        { path: '/clients', name: 'Clients', icon: <FaUsers />, roles: ['admin'] },
        { path: '/projects', name: 'Projects', icon: <FaProjectDiagram /> },
        { path: '/tickets', name: 'Tickets', icon: <FaTicketAlt /> },
    ];

    return (
        <Nav className="flex-column pt-3">
            {navItems.map((item) => {
                if (item.roles && !item.roles.includes(user?.role)) return null;
                return (
                    <Nav.Link
                        key={item.path}
                        as={Link}
                        to={item.path}
                        active={pathname === item.path}
                        className="text-white d-flex align-items-center mb-2"
                    >
                        <span className="me-2">{item.icon}</span>
                        {item.name}
                    </Nav.Link>
                );
            })}
            <Nav.Link onClick={logout} className="text-white d-flex align-items-center mb-2">
                <span className="me-2"><FaSignOutAlt /></span>
                Logout
            </Nav.Link>
        </Nav>
    );
};

export default Sidebar;