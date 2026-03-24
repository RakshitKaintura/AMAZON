import { NextResponse } from "next/server";
import { aboutData } from "@/lib/siteContent";

export async function GET() {
  return NextResponse.json({ success: true, about: aboutData });
}
