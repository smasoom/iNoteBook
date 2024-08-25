const jwt = require("jsonwebtoken");
const JWT_SECRET = "Masoomisagirl";

const fetchuser = (req, res, next) => {
  // Get the token from the header
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    // Verify the token
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user; // Assign the user data to req.user

    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
