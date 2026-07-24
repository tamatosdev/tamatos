"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const budgetOptions = ["Up to $5K", "$5K - $10K", "$10K - $15K", "$15K - $20K"];

function FloatingInput({
  label,
  required,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative" suppressHydrationWarning>
      <input
        type={type}
        required={required}
        placeholder=" "
        value={value}
        onChange={e => onChange(e.target.value)}
        className="peer w-full bg-transparent border-b border-black/20 pt-5 pb-2 text-[#0A0A0C] text-[16px] font-normal outline-none focus:border-black/60 transition-colors duration-200"
        suppressHydrationWarning
      />
      <label className="absolute left-0 top-3.5 text-black font-medium text-[16px] pointer-events-none transition-all duration-200 peer-focus:top-0 peer-focus:text-[14px] peer-focus:text-black/80 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[14px] peer-[:not(:placeholder-shown)]:text-black/50">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    </div>
  );
}

function FloatingTextarea({
  label,
  required,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative" suppressHydrationWarning>
      <textarea
        required={required}
        placeholder=" "
        rows={3}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="peer w-full bg-transparent border-b border-black/20 pt-5 pb-2 text-[#0A0A0C] text-[16px] font-normal outline-none focus:border-black/60 transition-colors duration-200 resize-none"
        suppressHydrationWarning
      />
      <label className="absolute left-0 top-3.5 text-black font-medium text-[16px] pointer-events-none transition-all duration-200 peer-focus:top-0 peer-focus:text-[14px] peer-focus:text-black/80 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[14px] peer-[:not(:placeholder-shown)]:text-black/50">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    </div>
  );
}

export default function ContactForm() {
  const [tab, setTab] = useState<"query" | "project">("query");

  const [query, setQuery] = useState({ fullName: "", email: "", phone: "", subject: "", message: "", consent: false });
  const [project, setProject] = useState({ fullName: "", email: "", budget: "", about: "", consent: false });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const submitForm = async (payload: Record<string, unknown>) => {
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Unable to send the message. Please try again later.");
      }

      setStatus("success");
      setQuery({ fullName: "", email: "", phone: "", subject: "", message: "", consent: false });
      setProject({ fullName: "", email: "", budget: "", about: "", consent: false });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm({ type: "query", ...query });
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm({ type: "project", ...project });
  };

  return (
    <div>
      {/* Heading */}
      <h1
        className="text-[#0A0A0C] font-semibold leading-tight mb-6"
        style={{ fontSize: "clamp(28px, 3vw, 48px)", letterSpacing: "-0.04em" }}
      >
        Tell us <em className="italic text-black/70">about</em> you<span className="text-[#9DF560]">.</span>
      </h1>

      {/* Tab switcher */}
      <div
        className="inline-flex items-center p-2 rounded-full mb-4"
        style={{ border: "1.5px solid #0A0A0C" }}
      >
        <button
          onClick={() => setTab("query")}
          className="rounded-full px-5 py-2.5 text-[16px] font-medium transition-all duration-200"
          style={{
            background: tab === "query" ? "#0A0A0C" : "transparent",
            color: tab === "query" ? "#fff" : "#0A0A0C",
            letterSpacing: "-0.03em",
          }}
        >
          I have a Query
        </button>
        <button
          onClick={() => setTab("project")}
          className="rounded-full px-5 py-2.5 text-[16px] font-medium transition-all duration-200"
          style={{
            background: tab === "project" ? "#0A0A0C" : "transparent",
            color: tab === "project" ? "#fff" : "#0A0A0C",
          }}
        >
          I have a Project
        </button>
      </div>

      {/* ── Forms with transition ── */}
      <AnimatePresence mode="wait">
      {tab === "query" && (
        <motion.form
          key="query"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          onSubmit={handleQuerySubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            <FloatingInput label="Full name" required value={query.fullName} onChange={v => setQuery(p => ({ ...p, fullName: v }))} />
            <FloatingInput label="Email address" required type="email" value={query.email} onChange={v => setQuery(p => ({ ...p, email: v }))} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            <FloatingInput label="Phone number" required type="tel" value={query.phone} onChange={v => setQuery(p => ({ ...p, phone: v }))} />
            <FloatingInput label="Subject" value={query.subject} onChange={v => setQuery(p => ({ ...p, subject: v }))} />
          </div>

          <FloatingTextarea label="Message" required value={query.message} onChange={v => setQuery(p => ({ ...p, message: v }))} />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-2">
            <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 cursor-pointer text-black/70 text-[13px] leading-snug">
              <input type="checkbox" required checked={query.consent} onChange={e => setQuery(p => ({ ...p, consent: e.target.checked }))} className="mt-0.5 shrink-0 accent-[#9DF560]" />
              I agree to be contacted by team Tamatos, regarding my inquiry. I understand I can reached out at any time.
            </label>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full  rounded-full bg-[#9DF560] text-[#0A0A0C] font-semibold hover:bg-[#8ae84d] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ fontSize: "18px", padding: "14px 42px" }}
            >
              {status === "sending" ? "Sending..." : "Submit Query"}
            </button>
          </div>
        </motion.form>
      )}

      {/* ── Project form ── */}
      {tab === "project" && (
        <motion.form
          key="project"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          onSubmit={handleProjectSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            <FloatingInput label="Full name" required value={project.fullName} onChange={v => setProject(p => ({ ...p, fullName: v }))} />
            <FloatingInput label="Corporate email" required type="email" value={project.email} onChange={v => setProject(p => ({ ...p, email: v }))} />
          </div>

          <div>
            <p className="text-[#0A0A0C] font-medium text-[14px] mb-3">
              What is your budget?<span className="text-red-500 ml-0.5">*</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {budgetOptions.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setProject(p => ({ ...p, budget: opt }))}
                  className="rounded-full px-5 py-2.5 text-[14px] font-medium transition-all duration-200"
                  style={{
                    border: "1.5px solid",
                    borderColor: project.budget === opt ? "#0A0A0C" : "rgba(10,10,12,0.2)",
                    background: project.budget === opt ? "#0A0A0C" : "transparent",
                    color: project.budget === opt ? "#fff" : "#0A0A0C",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <FloatingTextarea label="About Project" required value={project.about} onChange={v => setProject(p => ({ ...p, about: v }))} />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-2">
            <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 cursor-pointer text-black/70 text-[13px] leading-snug">
              <input type="checkbox" required checked={project.consent} onChange={e => setProject(p => ({ ...p, consent: e.target.checked }))} className="mt-0.5 shrink-0 accent-[#9DF560]" />
              I agree to be contacted by team Tamatos, regarding my inquiry. I understand I can reached out at any time.
            </label>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-[#9DF560] text-[#0A0A0C] font-semibold hover:bg-[#8ae84d] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ fontSize: "17px", padding: "14px 42px" }}
            >
              {status === "sending" ? "Sending..." : "Submit"}
            </button>
          </div>
        </motion.form>
      )}
      </AnimatePresence>

      {status === "success" && (
        <div className="mt-6 rounded-2xl border border-green-200/30 bg-[#f1ffda] px-5 py-4 text-sm text-[#152b08]">
          Your message has been sent successfully. We&apos;ll get back to you soon.
        </div>
      )}

      {status === "error" && (
        <div className="mt-6 rounded-2xl border border-red-200/30 bg-[#ffe1dd] px-5 py-4 text-sm text-[#6d0400]">
          {errorMessage || "Unable to send the message. Please try again."}
        </div>
      )}
    </div>
  );
}
