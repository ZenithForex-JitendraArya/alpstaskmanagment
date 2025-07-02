import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';
import './MainLayout.css'; // We'll create this CSS file

const MainLayout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Topbar />
            <Container fluid className="flex-grow-1 px-0">
                <Row className="g-0 h-100">
                    <Col md={2} lg={2} xl={2} className="sidebar-col">
                        <div className="sidebar-wrapper h-100">
                            <Sidebar />
                        </div>
                    </Col>
                    <Col md={10} lg={10} xl={10} className="main-content-col">
                        <div className="content-wrapper py-4 px-3">
                            {children}
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default MainLayout;