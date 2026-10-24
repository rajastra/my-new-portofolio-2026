"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { buttonClass } from "@/components/ui/button-link";

type ContactErrorKey = "errorName" | "errorEmail" | "errorMessage";

export function ContactForm({ email }: { email: string }) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p role="status" className="text-base font-medium text-ink">
        {t("sent")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="block text-base font-medium text-ink">
          {t("name")}
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="mt-2 block w-full min-h-11 rounded-md border border-ink/25 bg-paper-raised px-3 text-base text-ink focus:border-jade focus:outline-none focus:ring-1 focus:ring-jade"
        />
        {errors.name?.message && (
          <p id="name-error" className="mt-1 text-sm text-red-600">
            {t(errors.name.message as ContactErrorKey)}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-base font-medium text-ink">
          {t("email")}
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="mt-2 block w-full min-h-11 rounded-md border border-ink/25 bg-paper-raised px-3 text-base text-ink focus:border-jade focus:outline-none focus:ring-1 focus:ring-jade"
        />
        {errors.email?.message && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {t(errors.email.message as ContactErrorKey)}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-base font-medium text-ink">
          {t("message")}
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="mt-2 block w-full rounded-md border border-ink/25 bg-paper-raised p-3 text-base text-ink focus:border-jade focus:outline-none focus:ring-1 focus:ring-jade"
        />
        {errors.message?.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600">
            {t(errors.message.message as ContactErrorKey)}
          </p>
        )}
      </div>

      {/* Honeypot field */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          {t("errorServer", { email })}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonClass("primary")}
        >
          {isSubmitting ? t("sending") : t("send")}
        </button>
      </div>
    </form>
  );
}
