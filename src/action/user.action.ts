"use server";

import User from '@/models/user.model';
import { connect } from '@/db';



export async function createUser(userInput: any) {
  try {
    await connect();

    const newUser = await User.create(userInput);

    // TODO: Implement token creation logic here
    // Example: const token = createToken(newUser);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}
