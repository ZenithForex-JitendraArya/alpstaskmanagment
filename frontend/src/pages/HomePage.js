import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaUsers, FaProjectDiagram, FaTicketAlt, FaChartLine, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import './HomePage.css';
import NavBar from '../components/layout/Navbar';
import ProjectsList from '../components/projects/ProjectsList';

const HomePage = () => {
    return (
        <>
            <NavBar />
            <ProjectsList />
        </>
    );
};

export default HomePage;