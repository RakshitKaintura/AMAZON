import imagekit from "@/configs/imageKit";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Ensures the route is not statically optimized, preventing 405 errors on Vercel
export const dynamic = 'force-dynamic';

// GET Handler: Checks registration status
export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ status: "unauthorized" }, { status: 401 });
    }

    // Check if user has already registered a store
    const store = await prisma.store.findFirst({
      where: { userId: userId }
    });

    if (store) {
      return NextResponse.json({ status: store.status });
    }

    return NextResponse.json({ status: "not registered" });

  } catch (error) {
    console.error("GET Store Status Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

// POST Handler: Processes new store application
export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    // Use .toString().trim() to ensure clean data from form inputs
    const name = formData.get("name")?.toString().trim();
    const username = formData.get("username")?.toString().toLowerCase().trim();
    const description = formData.get("description")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const contact = formData.get("contact")?.toString().trim();
    const address = formData.get("address")?.toString().trim();
    const image = formData.get("image");

    // 1. Validate required fields
    if (!name || !username || !description || !email || !contact || !address || !image) {
      return NextResponse.json({ error: "Missing required store information" }, { status: 400 });
    }

    // 2. Check if user already registered a store
    const existingStore = await prisma.store.findFirst({
      where: { userId: userId }
    });

    if (existingStore) {
      return NextResponse.json({ status: existingStore.status });
    }

    // 3. Check if username is already taken
    const isUsernameTaken = await prisma.store.findFirst({
      where: { username: username }
    });

    if (isUsernameTaken) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 });
    }

    // 4. Image upload and optimization via ImageKit
    const buffer = Buffer.from(await image.arrayBuffer());
    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: `${userId}_${Date.now()}_${image.name}`,
      folder: "store_logos"
    });

    const optimizedImageUrl = imagekit.url({
      path: uploadResponse.filePath,
      transformation: [
        { quality: 'auto' },
        { format: 'webp' },
        { width: '512' }
      ]
    });

    // 5 & 6. Create store and link to user in a single Transaction
    // This ensures that if linking the user fails, the store is not created (maintains data integrity)
    await prisma.$transaction(async (tx) => {
      const newStore = await tx.store.create({
        data: {
          userId,
          name,
          description,
          username,
          email,
          contact,
          address,
          logo: optimizedImageUrl
        }
      });

      await tx.user.update({
        where: { id: userId },
        data: { 
          store: { connect: { id: newStore.id } } 
        }
      });
    });

    return NextResponse.json({ message: "Applied successfully, waiting for approval" });

  } catch (error) {
    console.error("POST Create Store Error:", error);
    
    // Handle specific Prisma unique constraint errors
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "A store with this username already exists" }, { status: 400 });
    }

    return NextResponse.json(
      { error: error.message || "Failed to process store application" }, 
      { status: 500 }
    );
  }
}