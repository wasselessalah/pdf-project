import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { createUser } from "@/action/user.action";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers from the incoming request
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If required headers are missing, return an error response
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Parse the incoming request body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Initialize the Svix webhook verifier
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the webhook signature and decode the event
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  // Process the event based on its type
  const eventType = evt.type;

  if (eventType === "user.created") {
    const {
      id,
      email_addresses,
      image_url,
      first_name,
      last_name,
    } = evt.data;

    // Construct the user object to be saved in the database
    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      image: image_url,
      firstName: first_name,
      lastName: last_name,
    };

    try {
      const newUser = await createUser(user);

      if (newUser) {
        // Update Clerk's user metadata with the new user ID from your database
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser._id,
          },
        });
      }
    } catch (error) {
      console.error("Error creating user or updating metadata:", error);
      return new Response("Error occurred while processing user creation", {
        status: 500,
      });
    }
  }

  console.log(`Webhook with ID: ${evt.data.id}, Type: ${eventType}`);
  console.log("Webhook body:", body);

  return new Response("", { status: 200 });
}
