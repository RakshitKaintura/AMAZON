import { contactData } from "@/lib/siteContent";

export default function ContactPage() {
  const contact = contactData;

  return (
    <div className="min-h-[70vh] mx-6 py-10 text-slate-700">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">{contact?.title || "Contact"}</h1>
        <p className="mt-6"><span className="font-medium">Email:</span> {contact?.email || "support@example.com"}</p>
        <p className="mt-2"><span className="font-medium">Phone:</span> {contact?.phone || "+91 00000 00000"}</p>
        <p className="mt-2"><span className="font-medium">Address:</span> {contact?.address || "India"}</p>
        <p className="mt-2"><span className="font-medium">Support Hours:</span> {contact?.supportHours || "Mon - Fri"}</p>
      </div>
    </div>
  );
}
