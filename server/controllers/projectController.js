const { tickets } = require('../models');
const { projects } = require("../models"); // adjust path if needed
const { users } = require('../models')

exports.createProject = async (req, res) => {
    try {
        const { projectName, description, startDate, endDate } = req.body;

        // ✅ Check user role
        const userRole = req.user?.role;

        if (!userRole || userRole.toLowerCase() !== 'admin') {
            return res.status(403).json({
                status: false,
                message: 'Forbidden: Only admins are allowed to create projects.'
            });
        }

        // ✅ Basic validation
        let errors = [];
        if (!projectName) errors.push("Project Name");
        if (!description) errors.push("Description");
        if (!startDate) errors.push("Start Date");
        if (!endDate) errors.push("End Date");
        if (errors.length > 0) {
            return res.status(400).json({
                status: false,
                message: `The following fields are required: ${errors.join(", ")}.`
            });
        }

        // ✅ Optional: check for duplicate name
        const existingProject = await projects.findOne({
            where: { title: projectName }
        });
        if (existingProject) {
            return res.status(400).json({
                status: false,
                message: "Project with this name already exists."
            });
        }

        console.log(req.user);

        // ✅ Create project
        const newProject = await projects.create({
            title: projectName,
            description,
            startDate,
            endDate,
            user_id: req.user.user_id // from token middleware
        });

        // ✅ Success response
        res.status(201).json({
            status: true,
            message: "Project created successfully.",
            project: {
                project_id: newProject.project_id,
                projectName: newProject.title,
                description: newProject.description,
                startDate: newProject.startDate,
                endDate: newProject.endDate
            }
        });

    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({
            status: false,
            message: "Server error."
        });
    }
};

exports.getAllProject = async (req, res) => {
    try {
        const userId = req.user?.user_id;
        if (!userId) {
            return res.status(401).json({
                status: false,
                message: 'Unauthorized: User info not found.',
            });
        }
        const allProjects = await projects.findAll({
            where: { user_id: userId },
            attributes: [
                'project_id',
                'title',
                'description',
                'status',
                'startDate',
                'endDate',
                'createdAt',
                'updatedAt',
                'user_id'
            ],
            include: [
                {
                    model: users,  // adjust path if needed
                    as: 'user',
                    attributes: ['name']  // only get the user name
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json({
            status: true,
            message: 'Projects fetched successfully.',
            projectsList: allProjects
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            status: false,
            message: 'Server error.'
        });
    }
};
exports.editProject = async (req, res) => {
    try {
        const { projectId } = req.params;  // you’ll pass it in the URL, like `/api/project/edit/:projectId`
        const { projectName, description, startDate, endDate, status } = req.body;

        // ✅ Check user role
        const userRole = req.user?.role;

        if (!userRole || userRole.toLowerCase() !== 'admin') {
            return res.status(403).json({
                status: false,
                message: 'Forbidden: Only admins are allowed to edit projects.'
            });
        }

        // ✅ Find the project
        const project = await projects.findOne({
            where: { project_id: projectId }
        });

        if (!project) {
            return res.status(404).json({
                status: false,
                message: 'Project not found.'
            });
        }

        // ✅ Optional: check if this admin is the creator
        // Uncomment if you want only the creator admin to edit
        if (project.user_id !== req.user.user_id) {
            return res.status(403).json({
                status: false,
                message: 'Forbidden: You are not the creator of this project.'
            });
        }


        // ✅ Update fields only if provided
        if (projectName) project.title = projectName;
        if (description) project.description = description;
        if (startDate) project.startDate = startDate;
        if (endDate) project.endDate = endDate;
        if (status) project.status = status;

        await project.save();

        res.status(200).json({
            status: true,
            message: 'Project updated successfully.',
            project: {
                project_id: project.project_id,
                projectName: project.title,
                description: project.description,
                status: project.status,
                startDate: project.startDate,
                endDate: project.endDate
            }
        });

    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({
            status: false,
            message: 'Server error.'
        });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params; // URL param: /api/project/delete/:projectId

        // ✅ Check user role
        const userRole = req.user?.role;

        if (!userRole || userRole.toLowerCase() !== 'admin') {
            return res.status(403).json({
                status: false,
                message: 'Forbidden: Only admins are allowed to delete projects.'
            });
        }

        // ✅ Find the project
        const project = await projects.findOne({
            where: { project_id: projectId }
        });

        if (!project) {
            return res.status(404).json({
                status: false,
                message: 'Project not found.'
            });
        }

        // ✅ Optional: check if this admin is the creator
        if (project.user_id !== req.user.user_id) {
            return res.status(403).json({
                status: false,
                message: 'Forbidden: You are not the creator of this project.'
            });
        }

        // ✅ Delete it
        await project.destroy();

        res.status(200).json({
            status: true,
            message: 'Project deleted successfully.'
        });

    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({
            status: false,
            message: 'Server error.'
        });
    }
};
exports.getTicketsByProjectId = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.user?.user_id;
        if (!userId) {
            return res.status(401).json({
                status: false,
                message: 'Unauthorized: User info not found.',
            });
        }
        // Optional: verify that this project belongs to the user
        const project = await projects.findOne({
            where: {
                project_id: projectId,
                user_id: userId
            }
        });
        if (!project) {
            return res.status(404).json({
                status: false,
                message: 'Project not found or you do not have access.',
            });
        }
        const pendingTickets = await tickets.findAll({
            where: {
                project_id: projectId,
                isActive: true,
                status:"PENDING"
            },
            attributes: [
                'ticket_id',
                'subject',
                'details',
                'priority',
                'status',
                'assignedTo',
                'project_id',
                'createdAt',
                'updatedAt'
            ],
            include: [
                {
                    model: users,
                    as: 'assignee', // define an alias if you setup association
                    attributes: ['name']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        const openTickets = await tickets.findAll({
            where: {
                project_id: projectId,
                isActive: true,
                status: "OPEN"
            },
            attributes: [
                'ticket_id',
                'subject',
                'details',
                'priority',
                'status',
                'assignedTo',
                'project_id',
                'createdAt',
                'updatedAt'
            ],
            include: [
                {
                    model: users,
                    as: 'assignee', // define an alias if you setup association
                    attributes: ['name']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        const resolvedTickets = await tickets.findAll({
            where: {
                project_id: projectId,
                isActive: true,
                status: "RESOLVED"
            },
            attributes: [
                'ticket_id',
                'subject',
                'details',
                'priority',
                'status',
                'assignedTo',
                'project_id',
                'createdAt',
                'updatedAt'
            ],
            include: [
                {
                    model: users,
                    as: 'assignee', // define an alias if you setup association
                    attributes: ['name']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            status: true,
            message: 'Tickets fetched successfully.',
            pendingTickets: pendingTickets,
            openTickets: openTickets,
            resolvedTickets: resolvedTickets
        });

    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({
            status: false,
            message: 'Server error.'
        });
    }
  };


