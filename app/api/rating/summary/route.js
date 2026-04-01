import prisma from "@/lib/prisma";
import {
  distributionFromBreakdown,
  refreshProductReviewInsights,
} from "@/lib/reviewInsights";
import { after, NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        reviewSummary: true,
        reviewSummaryUpdatedAt: true,
        ratingCount: true,
        averageRating: true,
        ratingBreakdown: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const currentReviewCount = await prisma.rating.count({ where: { productId } });
    const cachedSummary = (product.reviewSummary || "").trim();
    const hasTargetFormat = cachedSummary.length >= 180;

    const hasValidCache =
      Boolean(product.reviewSummaryUpdatedAt) &&
      product.ratingCount === currentReviewCount &&
      hasTargetFormat;

    if (!hasValidCache) {
      // If only review count changed but summary format is already good,
      // serve cache immediately and refresh in background.
      const canServeCachedWhileRefreshing =
        Boolean(product.reviewSummary) && hasTargetFormat;

      if (canServeCachedWhileRefreshing) {
        // Serve the latest cached summary immediately and refresh in background.
        after(async () => {
          try {
            await refreshProductReviewInsights(productId);
          } catch (error) {
            console.error("Background review summary refresh failed:", error);
          }
        });

        const cachedTotalReviews = product.ratingCount || 0;
        const cachedAverageRating = Number(product.averageRating || 0);
        const cachedDistribution = distributionFromBreakdown(
          product.ratingBreakdown,
          cachedTotalReviews
        );

        return NextResponse.json({
          summary: product.reviewSummary,
          averageRating: cachedAverageRating,
          totalReviews: cachedTotalReviews,
          ratingBreakdown: product.ratingBreakdown,
          distribution: cachedDistribution,
          updatedAt: product.reviewSummaryUpdatedAt,
          isRefreshing: true,
        });
      }

      const refreshed = await refreshProductReviewInsights(productId);
      return NextResponse.json({ ...refreshed, isRefreshing: false });
    }

    const totalReviews = product.ratingCount || 0;
    const averageRating = Number(product.averageRating || 0);
    const distribution = distributionFromBreakdown(product.ratingBreakdown, totalReviews);

    return NextResponse.json({
      summary: product.reviewSummary,
      averageRating,
      totalReviews,
      ratingBreakdown: product.ratingBreakdown,
      distribution,
      updatedAt: product.reviewSummaryUpdatedAt,
      isRefreshing: false,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.code || error.message }, { status: 400 });
  }
}
