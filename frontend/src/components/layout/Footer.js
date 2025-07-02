import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white py-4">
            <Container>
                <Row className="align-items-center">
                    <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
                        <span>© {new Date().getFullYear()} Alps CRM. All rights reserved.</span>
                    </Col>

                    <Col md={4} className="text-center mb-3 mb-md-0">
                        <div className="footer-links">
                            <a href="/terms">Terms</a>
                            <span className="mx-2">•</span>
                            <a href="/privacy">Privacy</a>
                            <span className="mx-2">•</span>
                            <a href="/contact">Contact</a>
                        </div>
                    </Col>

                    <Col md={4} className="text-center text-md-end">
                        <div className="social-icons">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                <FaGithub className="mx-2" size={20} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className="mx-2" size={20} />
                            </a>
                            <a href="mailto:support@alpscrm.com">
                                <FaEnvelope className="mx-2" size={20} />
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;