import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Get Dashboard Data for Seller
export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    // 1️⃣ Check if user is logged in
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized user" },
        { status: 401 }
      );
    }

    // 2️⃣ Check if user is an approved seller
    const storeId = await authSeller(userId);

    if (!storeId) {
      return NextResponse.json(
        { error: "Seller not authorized" },
        { status: 403 }
      );
    }

    // 3️⃣ Get all orders for this store
    const orders = await prisma.order.findMany({
      where: { storeId },
    });

    // 4️⃣ Get all products for this store
    const products = await prisma.product.findMany({
      where: { storeId },
    });

    // 5️⃣ Get ratings for those products
    const ratings = await prisma.rating.findMany({
      where: {
        productId: {
          in: products.map((product) => product.id),
        },
      },
      include: {
        user: true,
        product: true,
      },
    });

    // 6️⃣ Calculate earnings
    const totalEarnings = Math.round(
      orders.reduce((acc, order) => acc + order.total, 0)
    );

    const dashboardData = {
      ratings,
      totalOrders: orders.length,
      totalEarnings,
      totalProducts: products.length,
    };

    return NextResponse.json({ dashboardData });

  } catch (error) {
    console.error("Dashboard API Error:", error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

