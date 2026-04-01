"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, User, Phone, MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const mainRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const emailFormRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useGSAP(() => {
    if (!mainRef.current || !formRef.current) return;

    const formElements = formRef.current.children;
    gsap.set(formElements, { opacity: 1, y: 0 });

    gsap.from(formElements, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, { scope: mainRef, dependencies: [] });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // Check if environment variables are set
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const autoReplyTemplateId = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration is missing. Please check your environment variables.");
      }

      // Send notification email to admin
      const adminResult = await emailjs.sendForm(
        serviceId,
        templateId,
        emailFormRef.current!,
        publicKey
      );

      console.log("Admin notification sent successfully:", adminResult.text);

      // Send auto-reply email to user (if auto-reply template is configured)
      if (autoReplyTemplateId) {
        try {
          const autoReplyResult = await emailjs.send(
            serviceId,
            autoReplyTemplateId,
            {
              to_email: formData.email,
              to_name: formData.name,
              user_name: formData.name,
            },
            publicKey
          );
          console.log("Auto-reply sent successfully:", autoReplyResult.text);
        } catch (autoReplyError) {
          console.warn("Auto-reply failed (non-critical):", autoReplyError);
          // Don't fail the whole submission if auto-reply fails
        }
      }

      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error: any) {
      console.error("Failed to send email:", error);
      setIsSubmitting(false);
      setSubmitStatus("error");
      setErrorMessage(error.text || error.message || "Failed to send message. Please try again.");
      
      // Reset error message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main ref={mainRef} className="min-h-screen bg-[#F9FAFB] overflow-hidden">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-[#EFF6FF] to-transparent pointer-events-none" />
      <div className="fixed -top-[20%] -right-[10%] w-[60%] h-[70%] bg-blue-100/40 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-32 relative z-10">
        {/* Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-[#3B82F6] transition-colors mb-12 uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Form Container */}
        <div ref={formRef} className="glass-card p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6 border border-blue-100">
              <Mail className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-sm font-bold tracking-wider uppercase text-[#3B82F6]">
                Email Us
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-4 tracking-tight">
              Let's Talk about Future
            </h1>
            <p className="text-lg text-zinc-600">
              Fill out the form below and we'll get back to you within 24 hours to schedule your consultation.
            </p>
          </div>

          <form ref={emailFormRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-zinc-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all text-zinc-900"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-zinc-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all text-zinc-900"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-zinc-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all text-zinc-900"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-zinc-700 mb-2">
                Message *
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-zinc-400" />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all text-zinc-900 resize-none"
                  placeholder="Tell us about your requirements and preferred date/time for the visit..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white font-bold py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Request
                </>
              )}
            </button>

            {/* Success Message */}
            {submitStatus === "success" && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span className="font-semibold">Thank you! We'll contact you within 24 hours to schedule your visit.</span>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === "error" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span className="font-semibold">{errorMessage}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
