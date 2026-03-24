import { NextResponse } from "next/server";
import { contactData } from "@/lib/siteContent";

export async function GET() {
  return NextResponse.json({ success: true, contact: contactData });
}
