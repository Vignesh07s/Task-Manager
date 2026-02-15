import Task from "../models/Task.model.js";

const createTask = async (req, res) => {

    try {
        const { title, description, } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            })
        }

        const task = {
            title: title,
            description: description || "",
            user: req.user._id
        }

        const newTask = await Task.create(task);

        res.status(201).json({
            message: "Task created successfully",
            task: {
                id: newTask._id,
                title: newTask.title,
                description: newTask.description,
                isCompleted: newTask.isCompleted
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Error creating the task",
            error: error.message
        });
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: 1 });

        const total = tasks.length;
        const completed = tasks.filter(task => task.isCompleted).length;
        const pending = total - completed;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

        res.status(200).json({
            message: "Tasks fetched successfully",
            tasks: tasks,
            stats: {
                total,
                pending,
                completed,
                percent
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching the tasks",
            error: error.message
        });
    }
};

const editTask = async (req, res) => {

    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized to perform this action"
            })
        }

        if (!title) {
            res.status(400).json({
                message: "Title is required"
            })
        }

        const updatedTask = await Task.findByIdAndUpdate(id,
            {
                title,
                description: description ?? task.description
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask
        })
    } catch (error) {
        res.status(500).json({
            message: "Error updating the task",
            error: error.message
        });
    }
}

const markAsCompleted = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized to perform this action"
            })
        }

        const updatedTask = await Task.findByIdAndUpdate(id,
            { isCompleted: true },
            { new: true }
        )

        res.status(200).json({
            message: "Task marked as completed",
            task: updatedTask
        })

    } catch (error) {
        res.status(500).json({
            message: "Error updating the task",
            error: error.message
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized to perform this action"
            })
        }

        await Task.findByIdAndDelete(id);

        res.status(200).json({
            message: "Task deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error deleting the task",
            error: error.message
        })
    }
}


export { createTask, editTask, getTasks, markAsCompleted, deleteTask }