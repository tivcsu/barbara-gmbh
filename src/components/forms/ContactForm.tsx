"use client";

import { useActionState, useMemo, useRef, useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import {
  initialContactActionState,
  submitContactForm,
  type ContactActionState,
  type ContactField,
} from "@/src/features/contact";
import { Link } from "@/src/i18n/navigation";

type ContactFormAction = (
  locale: string,
  previousState: ContactActionState,
  formData: FormData,
) => Promise<ContactActionState>;

type ContactFormProps = {
  action?: ContactFormAction;
};

const emptyFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  privacy: false,
};

export function ContactForm({ action = submitContactForm }: ContactFormProps) {
  const t = useTranslations("ContactPage.form");
  const nav = useTranslations("Navigation");
  const locale = useLocale();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState(emptyFormValues);
  const boundAction = useMemo(
    () => async (previousState: ContactActionState, formData: FormData) => {
      const nextState = await action(locale, previousState, formData);

      if (nextState.status === "success") {
        setValues(emptyFormValues);
        formRef.current?.reset();
      }

      return nextState;
    },
    [action, locale],
  );
  const [state, formAction, pending] = useActionState(
    boundAction,
    initialContactActionState,
  );

  const errorFor = (field: ContactField) => state.fieldErrors?.[field]?.[0];
  const fieldError = (field: ContactField) => {
    const error = errorFor(field);

    return error ? (
      <p id={`${field}-error`} className="form-error" role="alert">
        {t(`errors.${error}`)}
      </p>
    ) : null;
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      aria-busy={pending}
      aria-labelledby="contact-form-title"
      className="relative border border-border bg-white p-6 sm:p-8 lg:p-10"
    >
      <h2 id="contact-form-title" className="font-display text-3xl font-semibold text-ink">
        {t("title")}
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted">{t("intro")}</p>

      <fieldset disabled={pending} className="m-0 border-0 p-0 disabled:opacity-75">
        <legend className="sr-only">{t("fieldsLegend")}</legend>

        <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="website">{t("honeypot")}</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              {t("name")} <span aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
              minLength={2}
              maxLength={100}
              required
              aria-invalid={Boolean(errorFor("name"))}
              aria-describedby={errorFor("name") ? "name-error" : undefined}
              className="form-control"
            />
            {fieldError("name")}
          </div>

          <div className="form-group">
            <label htmlFor="company" className="form-label">{t("company")}</label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              value={values.company}
              onChange={(event) => setValues((current) => ({ ...current, company: event.target.value }))}
              maxLength={120}
              aria-invalid={Boolean(errorFor("company"))}
              aria-describedby={errorFor("company") ? "company-error" : undefined}
              className="form-control"
            />
            {fieldError("company")}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              {t("email")} <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
              maxLength={254}
              required
              aria-invalid={Boolean(errorFor("email"))}
              aria-describedby={errorFor("email") ? "email-error" : undefined}
              className="form-control"
            />
            {fieldError("email")}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">{t("phone")}</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(event) => setValues((current) => ({ ...current, phone: event.target.value }))}
              maxLength={40}
              aria-invalid={Boolean(errorFor("phone"))}
              aria-describedby={errorFor("phone") ? "phone-error" : undefined}
              className="form-control"
            />
            {fieldError("phone")}
          </div>

          <div className="form-group sm:col-span-2">
            <label htmlFor="service" className="form-label">{t("service")}</label>
            <select
              id="service"
              name="service"
              value={values.service}
              onChange={(event) => setValues((current) => ({ ...current, service: event.target.value }))}
              aria-invalid={Boolean(errorFor("service"))}
              aria-describedby={errorFor("service") ? "service-error" : undefined}
              className="form-control"
            >
              <option value="">{t("chooseService")}</option>
              <option value="maintenance-cleaning">{nav("maintenanceCleaning")}</option>
              <option value="office-cleaning">{nav("officeCleaning")}</option>
              <option value="building-cleaning">{nav("buildingCleaning")}</option>
              <option value="window-cleaning">{nav("windowCleaning")}</option>
              <option value="deep-cleaning">{nav("deepCleaning")}</option>
              <option value="other">{t("otherService")}</option>
            </select>
            {fieldError("service")}
          </div>

          <div className="form-group sm:col-span-2">
            <label htmlFor="message" className="form-label">
              {t("message")} <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={values.message}
              onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))}
              minLength={10}
              maxLength={5_000}
              required
              aria-invalid={Boolean(errorFor("message"))}
              aria-describedby={errorFor("message") ? "message-error" : undefined}
              className="form-control resize-y"
            />
            {fieldError("message")}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-start gap-3">
            <input
              id="privacy"
              name="privacy"
              type="checkbox"
              checked={values.privacy}
              onChange={(event) => setValues((current) => ({ ...current, privacy: event.target.checked }))}
              required
              aria-invalid={Boolean(errorFor("privacy"))}
              aria-describedby={errorFor("privacy") ? "privacy-error" : undefined}
              className="form-checkbox"
            />
            <label htmlFor="privacy" className="text-xs leading-5 text-muted">
              {t("privacyBefore")} {" "}
              <Link href="/privacy" className="font-semibold text-ink underline decoration-gold underline-offset-4">
                {t("privacyLink")}
              </Link>{" "}
              {t("privacyAfter")} <span aria-hidden="true">*</span>
            </label>
          </div>
          {fieldError("privacy")}
        </div>

        <button type="submit" className="button-primary mt-8 w-full sm:w-auto">
          {pending ? (
            <>
              {t("submitting")}
              <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" strokeWidth={1.5} />
            </>
          ) : (
            <>
              {t("submit")}
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            </>
          )}
        </button>
      </fieldset>

      <FormStatus state={state} />
    </form>
  );
}

function FormStatus({ state }: { state: ContactActionState }) {
  const t = useTranslations("ContactPage.form.status");

  if (state.status === "idle") {
    return <div className="sr-only" aria-live="polite" />;
  }

  const isSuccess = state.status === "success";
  const title = isSuccess ? t("successTitle") : t(`${state.message}Title`);
  const body = isSuccess ? t("successBody") : t(`${state.message}Body`);

  return (
    <div
      className={`form-status ${isSuccess ? "form-status-success" : "form-status-error"}`}
      role={isSuccess ? "status" : "alert"}
      aria-live="polite"
    >
      {isSuccess ? (
        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.5} />
      ) : (
        <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.5} />
      )}
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm leading-6">{body}</p>
      </div>
    </div>
  );
}
