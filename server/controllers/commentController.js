const comments = require('../models/comment');
const tickets = require('../models/Ticket');
const users = require('../models/User');

exports.createComment = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { comment } = req.body;
        const userId = req.user.user_id;
        if (!comment || !comment.trim()) {
            return res.status(400).json({ status: false, message: 'Comment text is required.' });
        }
        // Check ticket exists:
        const ticket = await tickets.findByPk(ticketId);
        if (!ticket) {
            return res.status(404).json({ status: false, message: 'Ticket not found.' });
        }

        // Create the comment:
        const newComment = await comments.create({
            ticket_id: ticketId,
            user_id: userId,
            comment: comment.trim(),
        });

        res.status(201).json({
            status: true,
            message: 'Comment added successfully.',
            comment: newComment,
        });
    } catch (error) {
        console.error('Create Comment Error:', error);
        res.status(500).json({ status: false, message: 'Server error.' });
    }
};

    