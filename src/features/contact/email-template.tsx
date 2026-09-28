import type { CSSProperties, ReactElement } from "react";

import type { ContactService, ContactSubmission } from "./types";

const serviceLabels: Record<ContactService, { de: string; en: string }> = {
  "maintenance-cleaning": { de: "Unterhaltsreinigung", en: "Maintenance cleaning" },
  "office-cleaning": { de: "Büroreinigung", en: "Office cleaning" },
  "building-cleaning": { de: "Gebäudereinigung", en: "Building cleaning" },
  "window-cleaning": { de: "Fensterreinigung", en: "Window cleaning" },
  "deep-cleaning": { de: "Grundreinigung", en: "Deep cleaning" },
  other: { de: "Andere Leistung", en: "Other service" },
};

const bodyStyle: CSSProperties = {
  backgroundColor: "#f8f7f3",
  color: "#171717",
  fontFamily: "Arial, sans-serif",
  margin: 0,
  padding: "32px 16px",
};

const cardStyle: CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #dedbd2",
  margin: "0 auto",
  maxWidth: "640px",
  padding: "32px",
};

const labelStyle: CSSProperties = {
  color: "#6c675f",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  margin: "24px 0 6px",
  textTransform: "uppercase",
};

export function ContactEnquiryEmail({
  submission,
}: {
  submission: ContactSubmission;
}): ReactElement {
  const service = submission.service
    ? serviceLabels[submission.service][submission.locale]
    : "—";

  return (
    <html lang="de">
      <body style={bodyStyle}>
        <main style={cardStyle}>
          <p style={{ color: "#8e6825", fontSize: "12px", fontWeight: 700, letterSpacing: "0.14em" }}>
            BARBARA GMBH WEBSITE
          </p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "30px", fontWeight: 500, margin: "12px 0 8px" }}>
            Neue Kontaktanfrage
          </h1>
          <p style={{ color: "#6c675f", lineHeight: 1.6, margin: 0 }}>
            Eingegangen am {formatReceivedAt(submission.receivedAt)} · Sprache: {submission.locale.toUpperCase()}
          </p>

          <p style={labelStyle}>Name</p>
          <p style={{ margin: 0 }}>{submission.name}</p>

          <p style={labelStyle}>Firma</p>
          <p style={{ margin: 0 }}>{submission.company ?? "—"}</p>

          <p style={labelStyle}>E-Mail</p>
          <p style={{ margin: 0 }}>{submission.email}</p>

          <p style={labelStyle}>Telefon</p>
          <p style={{ margin: 0 }}>{submission.phone ?? "—"}</p>

          <p style={labelStyle}>Gewünschte Leistung</p>
          <p style={{ margin: 0 }}>{service}</p>

          <p style={labelStyle}>Nachricht</p>
          <p style={{ lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>{submission.message}</p>
        </main>
      </body>
    </html>
  );
}

export function createContactEmailText(submission: ContactSubmission): string {
  const service = submission.service
    ? serviceLabels[submission.service][submission.locale]
    : "—";

  return [
    "Neue Kontaktanfrage über die Barbara GmbH Website",
    "",
    `Eingegangen: ${formatReceivedAt(submission.receivedAt)}`,
    `Sprache: ${submission.locale.toUpperCase()}`,
    `Name: ${submission.name}`,
    `Firma: ${submission.company ?? "—"}`,
    `E-Mail: ${submission.email}`,
    `Telefon: ${submission.phone ?? "—"}`,
    `Gewünschte Leistung: ${service}`,
    "",
    "Nachricht:",
    submission.message,
  ].join("\n");
}

function formatReceivedAt(receivedAt: string): string {
  return new Intl.DateTimeFormat("de-AT", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Vienna",
  }).format(new Date(receivedAt));
}
