const Note = require("../models/Note");

/*
==========================================
Create Note
POST /api/notes
==========================================
*/

exports.createNote = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      aiCategory,
      tags,
      summary,
      favorite,
      color,
      voiceInput,
    } = req.body;

    const note = await Note.create({
      user: req.user.id,
      title,
      content,
      category,
      aiCategory,
      tags,
      summary,
      favorite,
      color,
      voiceInput,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
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
Get All Notes
GET /api/notes
==========================================
*/

exports.getNotes = async (req, res) => {
  try {
    const {
      search,
      category,
      favorite,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {
      user: req.user.id,
    };

    if (category) query.category = category;

    if (favorite !== undefined)
      query.favorite = favorite === "true";

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          content: {
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

    const total = await Note.countDocuments(query);

    const notes = await Note.find(query)
      .sort({
        updatedAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: notes,
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
Get Single Note
GET /api/notes/:id
==========================================
*/

exports.getNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.json({
      success: true,
      data: note,
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
Update Note
PUT /api/notes/:id
==========================================
*/

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.json({
      success: true,
      message: "Note updated successfully",
      data: note,
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
Favorite / Unfavorite Note
PATCH /api/notes/:id/favorite
==========================================
*/

exports.toggleFavorite = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    note.favorite = !note.favorite;

    await note.save();

    res.json({
      success: true,
      message: note.favorite
        ? "Added to favorites"
        : "Removed from favorites",
      data: note,
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
Delete Note
DELETE /api/notes/:id
==========================================
*/

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    await note.deleteOne();

    res.json({
      success: true,
      message: "Note deleted successfully",
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
Note Statistics
GET /api/notes/stats
==========================================
*/

exports.noteStats = async (req, res) => {
  try {
    const total = await Note.countDocuments({
      user: req.user.id,
    });

    const favorites = await Note.countDocuments({
      user: req.user.id,
      favorite: true,
    });

    const categories = await Note.aggregate([
      {
        $match: {
          user: req.user._id,
        },
      },
      {
        $group: {
          _id: "$category",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        total,
        favorites,
        categories,
      },
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
Recent Notes
GET /api/notes/recent
==========================================
*/

exports.recentNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
    })
      .sort({
        updatedAt: -1,
      })
      .limit(5);

    res.json({
      success: true,
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};