"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const defaultBudgetOptions = ["Up to $5K", "$5K - $10K", "$10K - $15K", "$15K - $20K"];

const serviceGroups = [
  {
    label: "Development",
    options: [
      "Websites",
      "Mobile Applications",
      "E-Commerce Solutions",
      "SaaS Platforms",
      "Custom Web Application",
      "Customer Portals & Dashboards",
      "ODOO Implementation",
      "API & System Integrations",
      "AI Workflows & Agents",
    ],
  },
  {
    label: "Digital",
    options: [
      "Social Media Marketing",
      "Search Engine Optimization",
      "Influencer Marketing",
      "Email & WhatsApp Automation",
      "Content Creation & Strategy",
      "Analytics & Growth Analysis",
    ],
  },
  {
    label: "Design",
    options: [
      "Website UX/UI Design",
      "Mobile App Design",
      "Brand Strategy",
      "Brand Identity",
      "Logo Design",
      "Social Media Design",
      "Pitch Deck Design",
      "Print & Marketing Collateral",
    ],
  },
] as const;

const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx", ".ppt", ".pptx"];
const ACCEPTED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]);
const MAX_FILE_BYTES = 2 * 1024 * 1024;

export type ContactFormContent = {
  formHeadingBefore?: string;
  formHeadingItalic?: string;
  formHeadingAfter?: string;
  queryTabLabel?: string;
  projectTabLabel?: string;
  querySubmitLabel?: string;
  projectSubmitLabel?: string;
  consentText?: string;
  budgetLabel?: string;
  budgetOptions?: string[];
  serviceInterestLabel?: string;
  projectDetailsLabel?: string;
};

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
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full bg-transparent border-b border-black/20 pt-5 pb-2 text-[#0A0A0C] text-[16px] font-normal outline-none focus:border-black/60 transition-colors duration-200"
        suppressHydrationWarning
      />
      <label className="absolute left-0 top-3.5 text-black font-medium text-[16px] pointer-events-none transition-all duration-200 peer-focus:top-0 peer-focus:text-black/80 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-black/50">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
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
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full bg-transparent border-b border-black/20 pt-5 pb-2 text-[#0A0A0C] text-[16px] font-normal outline-none focus:border-black/60 transition-colors duration-200 resize-none"
        suppressHydrationWarning
      />
      <label className="absolute left-0 top-3.5 text-black font-medium text-[16px] pointer-events-none transition-all duration-200 peer-focus:top-0 peer-focus:text-black/80 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-black/50">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    </div>
  );
}

function isAcceptedFile(file: File) {
  const lower = file.name.toLowerCase();
  const hasExt = ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext));
  const hasMime = !file.type || ACCEPTED_MIME.has(file.type);
  return hasExt && hasMime;
}

export default function ContactForm({ content }: { content?: ContactFormContent }) {
  const [tab, setTab] = useState<"query" | "project">("project");
  const [projectDetailMode, setProjectDetailMode] = useState<"upload" | "text">("text");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    consent: false,
  });
  const [project, setProject] = useState({
    fullName: "",
    email: "",
    budget: "",
    service: "",
    about: "",
    consent: false,
  });
  const [projectFile, setProjectFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const headingBefore = content?.formHeadingBefore ?? "Tell us";
  const headingItalic = content?.formHeadingItalic ?? "about";
  const headingAfter = content?.formHeadingAfter ?? "you";
  const queryTabLabel = content?.queryTabLabel ?? "I have a Query";
  const projectTabLabel = content?.projectTabLabel ?? "I have a Project";
  const querySubmitLabel = content?.querySubmitLabel ?? "Submit Query";
  const projectSubmitLabel = content?.projectSubmitLabel ?? "Submit";
  const consentText =
    content?.consentText ??
    "I agree to be contacted by team Tamatos, regarding my inquiry. I understand I can reached out at any time.";
  const budgetLabel = content?.budgetLabel ?? "What is your budget?";
  const budgetOptions =
    content?.budgetOptions?.filter(Boolean).length
      ? content.budgetOptions.filter(Boolean)
      : defaultBudgetOptions;
  const serviceInterestLabel =
    content?.serviceInterestLabel ?? "Which service are you interested in?";
  const projectDetailsLabel = content?.projectDetailsLabel ?? "Tell us about your project";

  const resetForms = () => {
    setQuery({ fullName: "", email: "", phone: "", subject: "", message: "", consent: false });
    setProject({ fullName: "", email: "", budget: "", service: "", about: "", consent: false });
    setProjectFile(null);
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const submitJson = async (payload: Record<string, unknown>) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.error || "Failed to send message");
    }
  };

  const submitProject = async () => {
    const formData = new FormData();
    formData.append("type", "project");
    formData.append("fullName", project.fullName);
    formData.append("email", project.email);
    formData.append("budget", project.budget);
    formData.append("service", project.service);
    formData.append("about", projectDetailMode === "text" ? project.about : "");
    formData.append("consent", String(project.consent));
    formData.append("detailMode", projectDetailMode);
    if (projectDetailMode === "upload" && projectFile) {
      formData.append("file", projectFile);
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.error || "Failed to send message");
    }
  };

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    try {
      await submitJson({ type: "query", ...query });
      setStatus("success");
      resetForms();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Unable to send the message.");
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFileError("");

    if (!project.budget) {
      setStatus("error");
      setErrorMessage("Please select your budget.");
      return;
    }
    if (!project.service) {
      setStatus("error");
      setErrorMessage("Please select a service.");
      return;
    }
    if (projectDetailMode === "upload") {
      if (!projectFile) {
        setFileError("Please upload a PDF, DOC, or PPT file (max 2MB).");
        return;
      }
    } else if (!project.about.trim()) {
      setStatus("error");
      setErrorMessage("Please tell us about your project.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");
    try {
      await submitProject();
      setStatus("success");
      resetForms();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Unable to send the message.");
    }
  };

  const onFileChange = (file: File | null) => {
    setFileError("");
    if (!file) {
      setProjectFile(null);
      return;
    }
    if (!isAcceptedFile(file)) {
      setProjectFile(null);
      setFileError("Only PDF, DOC, DOCX, PPT, or PPTX files are allowed.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setProjectFile(null);
      setFileError("File must be 2MB or smaller.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setProjectFile(file);
  };

  return (
    <div>
      <h1
        className="text-[#0A0A0C] font-semibold leading-tight mb-6"
        style={{ fontSize: "clamp(24.89px, 3vw, 42.67px)", letterSpacing: "-0.04em" }}
      >
        {headingBefore} <em className="italic text-black/70">{headingItalic}</em> {headingAfter}
        <span className="text-[#9DF560]">.</span>
      </h1>

      <div
        className="inline-flex items-center p-2 rounded-full mb-4"
        style={{ border: "1.5px solid #0A0A0C" }}
      >
        <button
          type="button"
          onClick={() => setTab("project")}
          className="rounded-full px-5 py-2.5 text-[16px] font-medium transition-all duration-200"
          style={{
            background: tab === "project" ? "#0A0A0C" : "transparent",
            color: tab === "project" ? "#fff" : "#0A0A0C",
            letterSpacing: "-0.03em",
          }}
        >
          {projectTabLabel}
        </button>
        <button
          type="button"
          onClick={() => setTab("query")}
          className="rounded-full px-5 py-2.5 text-[16px] font-medium transition-all duration-200"
          style={{
            background: tab === "query" ? "#0A0A0C" : "transparent",
            color: tab === "query" ? "#fff" : "#0A0A0C",
            letterSpacing: "-0.03em",
          }}
        >
          {queryTabLabel}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {tab === "query" && (
          <motion.form
            key="query"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onSubmit={handleQuerySubmit}
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <FloatingInput
                label="Full name"
                required
                value={query.fullName}
                onChange={(v) => setQuery((p) => ({ ...p, fullName: v }))}
              />
              <FloatingInput
                label="Email address"
                required
                type="email"
                value={query.email}
                onChange={(v) => setQuery((p) => ({ ...p, email: v }))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <FloatingInput
                label="Phone number"
                required
                type="tel"
                value={query.phone}
                onChange={(v) => setQuery((p) => ({ ...p, phone: v }))}
              />
              <FloatingInput
                label="Subject"
                value={query.subject}
                onChange={(v) => setQuery((p) => ({ ...p, subject: v }))}
              />
            </div>

            <FloatingTextarea
              label="Message"
              required
              value={query.message}
              onChange={(v) => setQuery((p) => ({ ...p, message: v }))}
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-2">
              <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 cursor-pointer text-black/70 text-[13px] leading-snug">
                <input
                  type="checkbox"
                  required
                  checked={query.consent}
                  onChange={(e) => setQuery((p) => ({ ...p, consent: e.target.checked }))}
                  className="mt-0.5 shrink-0 accent-[#9DF560]"
                />
                {consentText}
              </label>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-[#9DF560] text-[#0A0A0C] font-semibold hover:bg-[#8ae84d] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ fontSize: "16px", padding: "14px 42px" }}
              >
                {status === "sending" ? "Sending..." : querySubmitLabel}
              </button>
            </div>
          </motion.form>
        )}

        {tab === "project" && (
          <motion.form
            key="project"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onSubmit={handleProjectSubmit}
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <FloatingInput
                label="Full name"
                required
                value={project.fullName}
                onChange={(v) => setProject((p) => ({ ...p, fullName: v }))}
              />
              <FloatingInput
                label="Corporate email"
                required
                type="email"
                value={project.email}
                onChange={(v) => setProject((p) => ({ ...p, email: v }))}
              />
            </div>

            <div>
              <p className="text-[#0A0A0C] font-medium text-[16px] mb-3">
                {budgetLabel}
                <span className="text-red-500 ml-0.5">*</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {budgetOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setProject((p) => ({ ...p, budget: opt }))}
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

            <div className="relative">
              <label className="block text-[#0A0A0C] font-medium text-[16px] mb-2">
                {serviceInterestLabel}
                <span className="text-red-500 ml-0.5">*</span>
              </label>
              <select
                required
                value={project.service}
                onChange={(e) => setProject((p) => ({ ...p, service: e.target.value }))}
                className="w-full appearance-none bg-transparent border-b border-black/20 pt-1 pb-2.5 text-[#0A0A0C] text-[16px] font-normal outline-none focus:border-black/60 transition-colors duration-200 pr-8"
              >
                <option value="" disabled>
                  Select a service
                </option>
                {serviceGroups.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.options.map((option) => (
                      <option key={`${group.label}-${option}`} value={`${group.label} — ${option}`}>
                        {option}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 bottom-3 text-black/50">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            <div>
              <p className="text-[#0A0A0C] font-medium text-[16px] mb-3">
                {projectDetailsLabel}
                <span className="text-red-500 ml-0.5">*</span>
              </p>

              <div
                className="inline-flex items-center p-1 rounded-full mb-4"
                style={{ border: "1.5px solid rgba(10,10,12,0.25)" }}
              >
                <button
                  type="button"
                  onClick={() => setProjectDetailMode("text")}
                  className="rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200"
                  style={{
                    background: projectDetailMode === "text" ? "#0A0A0C" : "transparent",
                    color: projectDetailMode === "text" ? "#fff" : "#0A0A0C",
                  }}
                >
                  Write
                </button>
                <button
                  type="button"
                  onClick={() => setProjectDetailMode("upload")}
                  className="rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200"
                  style={{
                    background: projectDetailMode === "upload" ? "#0A0A0C" : "transparent",
                    color: projectDetailMode === "upload" ? "#fff" : "#0A0A0C",
                  }}
                >
                  Upload
                </button>
              </div>

              {projectDetailMode === "text" ? (
                <FloatingTextarea
                  label="Project details"
                  required
                  value={project.about}
                  onChange={(v) => setProject((p) => ({ ...p, about: v }))}
                />
              ) : (
                <div>
                  <label
                    className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-dashed border-black/25 px-4 py-5 cursor-pointer hover:border-black/50 transition-colors duration-200"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                      className="sr-only"
                      onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
                    />
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/5 text-[#0A0A0C]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-medium text-[#0A0A0C]">
                        {projectFile ? projectFile.name : "Upload brief / deck"}
                      </span>
                      <span className="block text-[12px] text-black/55 mt-0.5">
                        PDF, DOC, or PPT — max 2MB
                      </span>
                    </span>
                  </label>
                  {fileError && (
                    <p className="mt-2 text-[13px] text-red-600">{fileError}</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-2">
              <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 cursor-pointer text-black/70 text-[13px] leading-snug">
                <input
                  type="checkbox"
                  required
                  checked={project.consent}
                  onChange={(e) => setProject((p) => ({ ...p, consent: e.target.checked }))}
                  className="mt-0.5 shrink-0 accent-[#9DF560]"
                />
                {consentText}
              </label>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-full bg-[#9DF560] text-[#0A0A0C] font-semibold hover:bg-[#8ae84d] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ fontSize: "16px", padding: "14px 42px" }}
              >
                {status === "sending" ? "Sending..." : projectSubmitLabel}
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
