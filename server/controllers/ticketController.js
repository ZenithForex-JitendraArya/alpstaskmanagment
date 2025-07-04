const { projects, tickets } = require("../models");

exports.createTicket = async (req, res) => {
    try {
        const { subject, details, priority, status, assignedTo, project_id } = req.body;
        if (req.user.role.toLowerCase() !== 'admin') {
            return res.status(403).json({ status: false, message: 'Only admin can create tickets.' });
        }
        if (!subject || !priority || !status) {
            return res.status(400).json({ status: false, message: 'Required fields: subject, priority, status.' });
        }
        const project = await projects.findByPk(project_id);
        if (!project) {
            return res.status(404).json({ status: false, message: 'Project not found.' });
        }
        const newTicket = await tickets.create({
            subject,
            details,
            priority,
            status,
            assignedTo: assignedTo || null,  
            project_id: project_id,
            isActive: true                  
          });
        res.status(201).json({ status: true, message: 'Ticket created.', ticket: newTicket });
    } catch (error) {
        console.error('Create Ticket Error:', error);
        res.status(500).json({ status: false, message: 'Server error.' });
    }
};
exports.getClientTickets = async (req, res) => {
    try {
        const clientId = req.user.user_id; // assuming your `req.user` is a client

        const clientTickets = await tickets.findAll({
            where: {
                isActive: true
            },
            include: [
                {
                    model: projects,
                    as: 'project',
                    where: { client_id: clientId }
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            status: true,
            message: 'Tickets fetched.',
            tickets: clientTickets
        });
    } catch (error) {
        console.error('Get Client Tickets Error:', error);
        res.status(500).json({ status: false, message: 'Server error.' });
    }
};
exports.updateTicket = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;
        console.log(ticketId)
        const { subject, details, priority, status, assignedTo, isActive } = req.body;
        if (req.user.role.toLowerCase() !== 'admin') {
            return res.status(403).json({ status: false, message: 'Only admin can update tickets.' });
        }
        const ticket = await tickets.findByPk(ticketId);
        if (!ticket) {
            return res.status(404).json({ status: false, message: 'Ticket not found.' });
        }
        // Update fields if provided
        if (subject !== undefined) ticket.subject = subject;
        if (details !== undefined) ticket.details = details;
        if (priority !== undefined) ticket.priority = priority;
        if (status !== undefined) ticket.status = status;
        if (assignedTo !== undefined) ticket.assignedTo = assignedTo;
        if (isActive !== undefined) ticket.isActive = isActive;
        await ticket.save();
        res.status(200).json({ status: true, message: 'Ticket updated.', ticket });
    } catch (error) {
        console.error('Update Ticket Error:', error);
        res.status(500).json({ status: false, message: 'Server error.' });
    }
};
exports.deleteTicket = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;

        if (req.user.role.toLowerCase() !== 'admin') {
            return res.status(403).json({ status: false, message: 'Only admin can delete tickets.' });
        }

        const ticket = await tickets.findByPk(ticketId);

        if (!ticket) {
            return res.status(404).json({ status: false, message: 'Ticket not found.' });
        }

        ticket.isActive = false; // 👈 Soft delete
        await ticket.save();

        res.status(200).json({ status: true, message: 'Ticket deleted (soft delete).' });
    } catch (error) {
        console.error('Delete Ticket Error:', error);
        res.status(500).json({ status: false, message: 'Server error.' });
    }
};
  
  