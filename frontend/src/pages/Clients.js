import { Table, Button, Spinner, Alert, Badge, Form, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import api from '../services/api';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import ClientForm from '../components/clients/ClientForm';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchClients();
    }, []);
    console.log("a")
    const fetchClients = async () => {
        try {
            const { data } = await api.get('/clients');
            setClients(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch clients');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            try {
                await api.delete(`/clients/${id}`);
                fetchClients();
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete client');
            }
        }
    };

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Spinner animation="border" className="d-block mx-auto" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Clients</h2>
                <Button variant="primary" onClick={() => {
                    setSelectedClient(null);
                    setShowModal(true);
                }}>
                    <FaPlus className="me-2" />
                    Add Client
                </Button>
            </div>

            <Form.Group className="mb-3">
                <div className="position-relative">
                    <Form.Control
                        type="text"
                        placeholder="Search clients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
                </div>
            </Form.Group>

            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClients.map(client => (
                        <tr key={client.id}>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone || '-'}</td>
                            <td>
                                <Badge bg={client.status === 'active' ? 'success' : 'secondary'}>
                                    {client.status}
                                </Badge>
                            </td>
                            <td>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => {
                                        setSelectedClient(client);
                                        setShowModal(true);
                                    }}
                                >
                                    <FaEdit />
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDelete(client.id)}
                                >
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedClient ? 'Edit Client' : 'Add New Client'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ClientForm
                        client={selectedClient}
                        onSuccess={() => {
                            setShowModal(false);
                            fetchClients();
                        }}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Clients;