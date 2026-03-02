import { clerkClient } from "@clerk/nextjs/server";

const authAdmin = async (userId) => {
  try {
    if (!userId) return false;

    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    // Ensure the environment variable exists
    if (!process.env.ADMIN_EMAIL) {
      console.error("ADMIN_EMAIL is not defined in environment variables");
      return false;
    }

    // Normalize both the .env string and the Clerk email to lowercase and trim spaces
    const adminEmails = process.env.ADMIN_EMAIL.split(',').map(e => e.trim().toLowerCase());
    const userEmail = user.emailAddresses[0].emailAddress.toLowerCase();

    return adminEmails.includes(userEmail);
  } catch (error) {
    console.error("Admin Auth Error:", error);
    return false;
  }
}

export default authAdmin;