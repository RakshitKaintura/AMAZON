import { aboutData } from "@/lib/siteContent";

export default function AboutPage() {
  const about = aboutData;

  return (
    <div className="min-h-[70vh] mx-6 py-10 text-slate-700">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">{about?.title || "About"}</h1>
        <p className="mt-3 text-slate-500">{about?.subtitle || "Know more about our store."}</p>

        <p className="mt-8 leading-7">{about?.mission || "We are building a better shopping experience."}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {(about.stats || []).map((item) => (
            <div key={item.label} className="border border-slate-200 rounded-lg p-4 bg-white">
              <p className="text-2xl font-semibold text-slate-900">{item.value}</p>
              <p className="text-sm text-slate-500 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
