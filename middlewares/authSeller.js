import prisma from "@/lib/prisma";

const authSeller = async (userId) => {
  try {

    if (!userId) return null;

    const store = await prisma.store.findUnique({
      where: { userId }
    });

    if (!store || store.status !== "approved") {
      return null;
    }

    return store.id;

  } catch (error) {
    console.error(error);
    return null;
  }
};

export default authSeller;