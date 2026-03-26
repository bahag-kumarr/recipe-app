import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Recipe,
          as: "recipes",
        },
      ],
      order: [["id", "ASC"]],
    });
    if (users.length < 1) {
      return res.status(404).json(`Users not found`);
    }
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(`Internal server error`);
  }
};

export const createUser = async (req, res) => {
  const { firstName, email, password } = req.body;
  const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newUser = await User.create({
      firstName,
      email,
      password,
      profilePicture,
    });
    return res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal server error");
  }
};

export const getUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const userByID = await User.findByPk(id);
    if (!userByID) {
      return res.status(404).json(`User not found`);
    }
    return res.status(200).json(userByID);
  } catch (err) {
    console.log(err);
    return res.status(500).json(`Internal server error`);
  }
};

export const updateUserByID = async (req, res) => {
  const { firstName, email, password } = req.body;
  const profilePicture = req.file ? `/uploads/${req.file.filename}` : undefined;
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json("User not found");

    if (firstName) user.firstName = firstName;
    if (email) user.email = email;
    if (password) user.password = password;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal server error");
  }
};
