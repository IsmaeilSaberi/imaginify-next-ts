"use server";

import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found.");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

//UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) {
      throw new Error("User update failed!");
    }
    return JSON.parse(JSON.stringify(updateUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find User to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found.");
    }

    // Delete user
    const deleteUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deleteUser ? JSON.parse(JSON.stringify(deleteUser)) : null;
  } catch (error) {
    handleError(error);
  }
}
