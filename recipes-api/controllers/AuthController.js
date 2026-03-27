import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json("A user with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profilePicture,
    });

    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    return res.status(201).json(userWithoutPassword);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal server error");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal server error");
  }
};
