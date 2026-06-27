const Task = require("../models/Task");


exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      category,
      aiCategory,
      tags,
      aiSummary,
      voiceInput,
    } = req.body;

    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      priority,
      dueDate,
      category,
      aiCategory,
      tags,
      aiSummary,
      voiceInput,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.getTasks = async (req, res) => {
  try {
    const {
      search,
      priority,
      status,
      category,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {
      user: req.user.id,
      isArchived: false,
    };

    if (priority) query.priority = priority;

    if (status) query.status = status;

    if (category) query.category = category;

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          tags: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const total = await Task.countDocuments(query);

    const tasks = await Task.find(query)
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.status = "Completed";
    task.completedAt = new Date();

    await task.save();

    res.json({
      success: true,
      message: "Task completed",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.archiveTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.isArchived = true;

    await task.save();

    res.json({
      success: true,
      message: "Task archived",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.taskStats = async (req, res) => {
  try {
    const total = await Task.countDocuments({
      user: req.user.id,
      isArchived: false,
    });

    const completed = await Task.countDocuments({
      user: req.user.id,
      status: "Completed",
      isArchived: false,
    });

    const pending = await Task.countDocuments({
      user: req.user.id,
      status: "Pending",
      isArchived: false,
    });

    const high = await Task.countDocuments({
      user: req.user.id,
      priority: "High",
      isArchived: false,
    });

    const medium = await Task.countDocuments({
      user: req.user.id,
      priority: "Medium",
      isArchived: false,
    });

    const low = await Task.countDocuments({
      user: req.user.id,
      priority: "Low",
      isArchived: false,
    });

    res.json({
      success: true,
      data: {
        total,
        completed,
        pending,
        priority: {
          high,
          medium,
          low,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};