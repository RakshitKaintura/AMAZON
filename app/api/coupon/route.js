import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { userId, has } = getAuth(request);

    // check authentication
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized user" },
        { status: 401 }
      );
    }

    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: "Coupon code is required" },
        { status: 400 }
      );
    }

    // find valid coupon
    const coupon = await prisma.coupon.findFirst({
      where: {
        code: code.toUpperCase(),
        expiresAt: {
          gt: new Date()
        }
      }
    });

    if (!coupon) {
      return NextResponse.json(
        { error: "Coupon not found or expired" },
        { status: 404 }
      );
    }

    // check new user condition
    if (coupon.forNewUser) {
      const orderCount = await prisma.order.count({
        where: { userId }
      });

      if (orderCount > 0) {
        return NextResponse.json(
          { error: "Coupon valid for new users only" },
          { status: 400 }
        );
      }
    }

    // check membership condition
    if (coupon.forMember) {
      const hasPlusPlan = has({ plan: "plus" });

      if (!hasPlusPlan) {
        return NextResponse.json(
          { error: "Coupon valid for members only" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({ coupon });

  } catch (error) {
    console.error("Coupon API Error:", error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}