const validateSignup = (
  req,
  res,
  next
) => {
  const {
    name,
    email,
    password,
  } = req.body;

  if (
    !name ||
    !email ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Name, Email and Password are required",
    });
  }

  next();
};

const validateLogin = (
  req,
  res,
  next
) => {
  const {
    email,
    password,
  } = req.body;

  if (
    !email ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Email and Password are required",
    });
  }

  next();
};

module.exports = {
  validateSignup,
  validateLogin,
};