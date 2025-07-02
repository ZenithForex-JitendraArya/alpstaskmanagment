exports.addTicketComment = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { commentText } = req.body;

        if (!commentText) {
            return res.status(400).json({ status: false, message: 'Comment text is required.' });
        }

        // Check ticket exists and is active
        const ticket = await tickets.findOne({ where: { ticket_id: ticketId, isActive: true } });
        if (!ticket) {
            return res.status(404).json({ status: false, message: 'Ticket not found.' });
        }

        // Example: assume you have a `ticket_comments` model
        const newComment = await ticket_comments.create({
            ticket_id: ticketId,
            user_id: req.user.user_id, // client ID
            comment_text: commentText
        });

        res.status(201).json({
            status: true,
            message: 'Comment added.',
            comment: newComment
        });
    } catch (error) {
        console.error('Add Comment Error:', error);
        res.status(500).json({ status: false, message: 'Server error.' });
    }
};
exports.updateTicketStatus = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { status } = req.body;

        const allowedStatuses = ['OPEN', 'PENDING', 'RESOLVED'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ status: false, message: 'Invalid status.' });
        }

        const ticket = await tickets.findOne({ where: { ticket_id: ticketId, isActive: true } });
        if (!ticket) {
            return res.status(404).json({ status: false, message: 'Ticket not found.' });
        }

        // Optional: check ticket belongs to this client via project.client_id
        const project = await projects.findByPk(ticket.project_id);
        if (project.client_id !== req.user.user_id) {
            return res.status(403).json({ status: false, message: 'Forbidden: This is not your ticket.' });
        }

        await ticket.update({ status });

        res.status(200).json({
            status: true,
            message: 'Ticket status updated.',
            ticket
        });
    } catch (error) {
        console.error('Update Status Error:', error);
        res.status(500).json({ status: false, message: 'Server error.' });
    }
};
    