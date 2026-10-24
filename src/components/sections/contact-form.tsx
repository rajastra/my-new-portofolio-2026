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
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 sm:grid-cols-2" noValidate>
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
          className="mt-2 block min-h-14 w-full bg-paper-raised px-4 text-base text-ink"
        />
        {errors.name?.message && (
          <p id="name-error" className="mt-1 text-sm text-[#b42318] dark:text-[#ff8a7a]">
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
          className="mt-2 block min-h-14 w-full bg-paper-raised px-4 text-base text-ink"
        />
        {errors.email?.message && (
          <p id="email-error" className="mt-1 text-sm text-[#b42318] dark:text-[#ff8a7a]">
            {t(errors.email.message as ContactErrorKey)}
          </p>
        )}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="block text-base font-medium text-ink">
          {t("message")}
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="mt-2 block w-full bg-paper-raised p-4 text-base text-ink"
        />
        {errors.message?.message && (
          <p id="message-error" className="mt-1 text-sm text-[#b42318] dark:text-[#ff8a7a]">
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
        <p role="alert" className="text-sm sm:col-span-2 text-[#b42318] dark:text-[#ff8a7a]">
          {t("errorServer", { email })}
        </p>
      )}

      <div className="sm:col-span-2">
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
