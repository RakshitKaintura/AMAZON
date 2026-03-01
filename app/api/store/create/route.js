import imagekit from "@/configs/imageKit";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// GET Handler: Checks registration status
export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    // check is user have already registered a store
    const store = await prisma.store.findFirst({
      where: { userId: userId }
    })

    // if store is already registered then send status of store
    if(store){
      return NextResponse.json({status: store.status})
    }

    return NextResponse.json({status: "not registered"})

  } catch (error) {
    console.error(error);
    return NextResponse.json({error: error.code || error.message}, { status: 400 })
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
    const name = formData.get("name");
    const username = formData.get("username");
    const description = formData.get("description");
    const email = formData.get("email");
    const contact = formData.get("contact");
    const address = formData.get("address");
    const image = formData.get("image");

    // 1. Validate required fields
    if(!name || !username || !description || !email || !contact || !address || !image){
        return NextResponse.json({error: "missing store info"}, {status: 400})
    }

    // 2. Check if user already registered a store
    const store = await prisma.store.findFirst({
        where: { userId: userId }
    })

    if(store){
        return NextResponse.json({status: store.status})
    }

    // 3. Check if username is already taken
    const isUsernameTaken = await prisma.store.findFirst({
        where: { username: username.toLowerCase() }
    })

    if(isUsernameTaken){
        return NextResponse.json({error: "username already taken"}, {status: 400})
    }

    // 4. Image upload and optimization via ImageKit
    const buffer = Buffer.from(await image.arrayBuffer());
    const response = await imagekit.upload({
        file: buffer,
        fileName: image.name,
        folder: "logos"
    })

    const optimizedImage = imagekit.url({
        path: response.filePath,
        transformation: [
            {quality: 'auto'},
            {format: 'webp'},
            {width: '512'}
        ]
    })

    // 5. Create new store record
    const newStore = await prisma.store.create({
        data: {
            userId,
            name,
            description,
            username: username.toLowerCase(),
            email,
            contact,
            address,
            logo: optimizedImage
        }
    })

    // 6. Link store to the user model
    await prisma.user.update({
        where: { id: userId },
        data: {store: {connect: {id: newStore.id}}}
    })

    return NextResponse.json({message: "applied, waiting for approval"})

  } catch (error) {
    console.error(error);
    return NextResponse.json({error: error.code || error.message}, { status: 400 })
  }
}