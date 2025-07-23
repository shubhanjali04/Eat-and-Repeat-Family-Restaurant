import User from "../model/userModel.js"

export const createUser = async (req,res) => {
  try {
    const { name, email, address } = req.body
    

    const existing = await User.findOne({email})
    if(existing) {
      return res.status(409).json({message:"User already exists"})
    }

    const newUser = new User({name, email, address})
    await newUser.save()

    res.status(201).json({message:"User created successfully",user:newUser})
  } catch (error) {
    console.error("user creation error:",error.message)
    res.status(500).json({message:"Internal server error",error:error.message})
  }
}

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    console.error("Error fetching users:", error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Get single user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error("Error fetching user:", error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}


// Update user by ID
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email } = req.body

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, runValidators: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser })
  } catch (error) {
    console.error("Error updating user:", error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}

// Delete user by ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Error deleting user:", error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}