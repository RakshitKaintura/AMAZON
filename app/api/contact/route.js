import { NextResponse } from "next/server";

export async function GET() {
  const contactData = {
    title: "Contact Us",
    email: "support@gocartplus.com",
    phone: "+91 98765 43210",
    address: "2nd Floor, MG Road, Bengaluru, Karnataka, India",
    supportHours: "Mon - Sat, 9:00 AM - 7:00 PM"
  };

  return NextResponse.json({ success: true, contact: contactData });
}
