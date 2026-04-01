import prisma from "@/lib/prisma";
import { openai } from "@/configs/openai";

function buildFallbackSummary(averageRating, totalReviews) {
  if (!totalReviews) {
    return "No reviews yet. Be the first customer to share your experience with this product.";
  }

  const rounded = Number(averageRating.toFixed(1));

  if (rounded >= 4.5) {
    return `Customers are highly satisfied overall. Across ${totalReviews} reviews, buyers frequently praise this product's quality, value, and reliability.`;
  }

  if (rounded >= 3.5) {
    return `Customers report a generally positive experience. Across ${totalReviews} reviews, most buyers are happy with quality and value, while a smaller group mentions a few areas for improvement.`;
  }

  if (rounded >= 2.5) {
    return `Customer feedback is mixed. Across ${totalReviews} reviews, some buyers are satisfied, while others mention quality and consistency concerns.`;
  }

  return `Customers report several concerns. Across ${totalReviews} reviews, buyers most often mention quality and reliability issues.`;
}

function buildDistribution(reviews) {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  for (const item of reviews) {
    if (counts[item.rating] !== undefined) {
      counts[item.rating] += 1;
    }
  }

  const total = reviews.length;

  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = counts[stars];
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    return { stars, count, percentage };
  });

  return { counts, distribution };
}

async function buildAiSummary(reviews, averageRating, totalReviews) {
  const reviewLines = reviews
    .filter((item) => item.review && item.review.trim().length > 0)
    .map((item) => `Rating: ${item.rating}/5. Review: ${item.review.trim()}`)
    .slice(0, 80);

  if (!reviewLines.length) {
    return buildFallbackSummary(averageRating, totalReviews);
  }

  if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) {
    return buildFallbackSummary(averageRating, totalReviews);
  }

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    temperature: 0.3,
    max_tokens: 260,
    messages: [
      {
        role: "system",
        content:
          "You summarize e-commerce customer reviews. Write one detailed paragraph in plain English that covers overall sentiment, common positives, common negatives, and whether concerns appear isolated or repeated. Mention practical context (value, quality, durability, ease of use, delivery) only if present in reviews. Do not fabricate details, do not use markdown, and keep it between 110 and 160 words.",
      },
      {
        role: "user",
        content: `Average rating: ${averageRating.toFixed(2)}/5 from ${totalReviews} reviews. Create a detailed customer-insight summary from these reviews:\n\n${reviewLines.join("\n")}`,
      },
    ],
  });

  const summary = response.choices?.[0]?.message?.content?.trim();
  return summary || buildFallbackSummary(averageRating, totalReviews);
}

export async function refreshProductReviewInsights(productId) {
  const reviews = await prisma.rating.findMany({
    where: { productId },
    select: {
      rating: true,
      review: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((acc, item) => acc + item.rating, 0) / totalReviews
      : 0;

  const { counts, distribution } = buildDistribution(reviews);

  let summary = buildFallbackSummary(averageRating, totalReviews);
  if (totalReviews > 0) {
    try {
      summary = await buildAiSummary(reviews, averageRating, totalReviews);
    } catch {
      summary = buildFallbackSummary(averageRating, totalReviews);
    }
  }

  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: {
      reviewSummary: summary,
      reviewSummaryUpdatedAt: new Date(),
      ratingCount: totalReviews,
      averageRating: Number(averageRating.toFixed(1)),
      ratingBreakdown: counts,
    },
    select: {
      reviewSummary: true,
      reviewSummaryUpdatedAt: true,
      ratingCount: true,
      averageRating: true,
      ratingBreakdown: true,
    },
  });

  return {
    summary: updatedProduct.reviewSummary,
    averageRating: updatedProduct.averageRating,
    totalReviews: updatedProduct.ratingCount,
    ratingBreakdown: updatedProduct.ratingBreakdown,
    distribution,
    updatedAt: updatedProduct.reviewSummaryUpdatedAt,
  };
}

export function distributionFromBreakdown(ratingBreakdown, totalReviews) {
  const safeBreakdown = ratingBreakdown && typeof ratingBreakdown === "object"
    ? ratingBreakdown
    : {};

  return [5, 4, 3, 2, 1].map((stars) => {
    const count = Number(safeBreakdown[stars] || safeBreakdown[String(stars)] || 0);
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { stars, count, percentage };
  });
}
