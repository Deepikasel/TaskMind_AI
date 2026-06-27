const Reminder = require("../models/Reminder");

/*
==========================================
Create Reminder
POST /api/reminders
==========================================
*/

exports.createReminder = async (req, res) => {
  try {
    const {
      title,
      description,
      reminderDate,
      reminderTime,
      repeat,
      priority,
      category,
      aiCategory,
      tags,
      voiceInput,
    } = req.body;

    const reminder = await Reminder.create({
      user: req.user.id,
      title,
      description,
      reminderDate,
      reminderTime,
      repeat,
      priority,
      category,
      aiCategory,
      tags,
      voiceInput,
    });

    res.status(201).json({
      success: true,
      message: "Reminder created successfully",
      data: reminder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================
Get All Reminders
GET /api/reminders
==========================================
*/

exports.getReminders = async (req, res) => {
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

    const total = await Reminder.countDocuments(query);

    const reminders = await Reminder.find(query)
      .sort({
        reminderDate: 1,
      })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: reminders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================
Get Single Reminder
GET /api/reminders/:id
==========================================
*/

exports.getReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: "Reminder not found",
      });
    }

    res.json({
      success: true,
      data: reminder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================
Update Reminder
PUT /api/reminders/:id
==========================================
*/

exports.updateReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: "Reminder not found",
      });
    }

    res.json({
      success: true,
      message: "Reminder updated successfully",
      data: reminder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================
Complete Reminder
PATCH /api/reminders/:id/complete
==========================================
*/

exports.completeReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: "Reminder not found",
      });
    }

    reminder.status = "Completed";

    await reminder.save();

    res.json({
      success: true,
      message: "Reminder marked as completed",
      data: reminder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================
Delete Reminder
DELETE /api/reminders/:id
==========================================
*/

exports.deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: "Reminder not found",
      });
    }

    await reminder.deleteOne();

    res.json({
      success: true,
      message: "Reminder deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================
Today's Reminders
GET /api/reminders/today
==========================================
*/

exports.todayReminders = async (req, res) => {
  try {
    const today = new Date();

    const start = new Date(today.setHours(0, 0, 0, 0));
    const end = new Date(today.setHours(23, 59, 59, 999));

    const reminders = await Reminder.find({
      user: req.user.id,
      reminderDate: {
        $gte: start,
        $lte: end,
      },
    }).sort({
      reminderTime: 1,
    });

    res.json({
      success: true,
      data: reminders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================
Upcoming Reminders
GET /api/reminders/upcoming
==========================================
*/

exports.upcomingReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({
      user: req.user.id,
      reminderDate: {
        $gte: new Date(),
      },
      status: "Pending",
    })
      .sort({
        reminderDate: 1,
      })
      .limit(10);

    res.json({
      success: true,
      data: reminders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================
Reminder Statistics
GET /api/reminders/stats
==========================================
*/

exports.reminderStats = async (req, res) => {
  try {
    const total = await Reminder.countDocuments({
      user: req.user.id,
    });

    const completed = await Reminder.countDocuments({
      user: req.user.id,
      status: "Completed",
    });

    const pending = await Reminder.countDocuments({
      user: req.user.id,
      status: "Pending",
    });

    const high = await Reminder.countDocuments({
      user: req.user.id,
      priority: "High",
    });

    const medium = await Reminder.countDocuments({
      user: req.user.id,
      priority: "Medium",
    });

    const low = await Reminder.countDocuments({
      user: req.user.id,
      priority: "Low",
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