const validateReminder = (
  req,
  res,
  next
) => {
  const {
    title,
    reminderDate,
  } = req.body;

  if (
    !title ||
    !reminderDate
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Title and Reminder Date are required",
    });
  }

  next();
};

module.exports = {
  validateReminder,
};