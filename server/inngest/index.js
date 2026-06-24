import { Inngest } from "inngest";
import User from "../models/user.js"; // Import your User model

// Initialize Inngest Client
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// 1. Function to save user data to MongoDB when a user is created in Clerk
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk.user.created" }, // Listens for the 'created' event from Clerk
  async ({ event }) => {
    // Extract user data from the event object
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses.email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    // Store the user data in the database
    await User.create(userData);
  }
);

// 2. Function to update user data in MongoDB when modified in Clerk
export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk.user.updated" }, // Listens for the 'updated' event
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses.email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    // Find the user by ID and update their information
    await User.findByIdAndUpdate(id, userData);
  }
);

// 3. Function to delete user from MongoDB when deleted in Clerk
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk.user.deleted" }, // Listens for the 'deleted' event
  async ({ event }) => {
    const { id } = event.data;

    // Remove the user record from the database
    await User.findByIdAndDelete(id);
  }
);

// Export all functions in an array for the Inngest server to use
export const ingestFunctions = [
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
];