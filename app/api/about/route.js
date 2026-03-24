import { NextResponse } from "next/server";

export async function GET() {
  const aboutData = {
    title: "About Gocart Plus",
    subtitle: "Fast, simple shopping for everyday electronics.",
    mission:
      "We help customers discover quality products at fair prices with a smooth checkout experience.",
    stats: [
      { label: "Happy Customers", value: "12,000+" },
      { label: "Products Listed", value: "4,500+" },
      { label: "Cities Served", value: "120+" }
    ]
  };

  return NextResponse.json({ success: true, about: aboutData });
}
