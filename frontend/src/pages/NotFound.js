import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';
import './NotFound.css'; // We'll create this next

export default function NotFound() {
    return (
        <Container className="not-found-container">
            <Row className="justify-content-center align-items-center min-vh-100">
                <Col md={8} className="text-center py-5">
                    <div className="error-icon mb-4">
                        <FaExclamationTriangle size={80} className="text-danger" />
                    </div>
                    <h1 className="display-4 fw-bold text-primary mb-3">404</h1>
                    <h2 className="h3 mb-4">Oops! Page Not Found</h2>
                    <p className="lead text-muted mb-5">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <Button
                        as={Link}
                        to="/"
                        variant="primary"
                        size="lg"
                        className="rounded-pill px-4"
                    >
                        <FaHome className="me-2" />
                        Return to Dashboard
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}