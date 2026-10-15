import type { CSSProperties, ReactElement } from "react";

import type { ContactService, ContactSubmission } from "./types";

const serviceLabels: Record<ContactService, string> = {
  "maintenance-cleaning": "Rendszeres takarítás",
  "office-cleaning": "Irodai takarítás",
  "building-cleaning": "Épülettakarítás",
  "window-cleaning": "Ablaktisztítás",
  "deep-cleaning": "Nagytakarítás",
  other: "Egyéb szolgáltatás",
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
  const service = submission.service ? serviceLabels[submission.service] : "—";

  return (
    <html lang="hu">
      <body style={bodyStyle}>
        <main style={cardStyle}>
          <p style={{ color: "#8e6825", fontSize: "12px", fontWeight: 700, letterSpacing: "0.14em" }}>
            BARBARA GMBH WEBOLDAL
          </p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "30px", fontWeight: 500, margin: "12px 0 8px" }}>
            Új kapcsolatfelvételi üzenet
          </h1>
          <p style={{ color: "#6c675f", lineHeight: 1.6, margin: 0 }}>
            Beérkezett: {formatReceivedAt(submission.receivedAt)} · Beküldés nyelve: {submission.locale.toUpperCase()}
          </p>

          <p style={labelStyle}>Név</p>
          <p style={{ margin: 0 }}>{submission.name}</p>

          <p style={labelStyle}>Cég</p>
          <p style={{ margin: 0 }}>{submission.company ?? "—"}</p>

          <p style={labelStyle}>E-Mail</p>
          <p style={{ margin: 0 }}>{submission.email}</p>

          <p style={labelStyle}>Telefonszám</p>
          <p style={{ margin: 0 }}>{submission.phone ?? "—"}</p>

          <p style={labelStyle}>Igényelt szolgáltatás</p>
          <p style={{ margin: 0 }}>{service}</p>

          <p style={labelStyle}>Üzenet</p>
          <p style={{ lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>{submission.message}</p>
        </main>
      </body>
    </html>
  );
}

export function createContactEmailText(submission: ContactSubmission): string {
  const service = submission.service ? serviceLabels[submission.service] : "—";

  return [
    "Új kapcsolatfelvételi üzenet a Barbara GmbH weboldaláról",
    "",
    `Beérkezett: ${formatReceivedAt(submission.receivedAt)}`,
    `Beküldés nyelve: ${submission.locale.toUpperCase()}`,
    `Név: ${submission.name}`,
    `Cég: ${submission.company ?? "—"}`,
    `E-Mail: ${submission.email}`,
    `Telefonszám: ${submission.phone ?? "—"}`,
    `Igényelt szolgáltatás: ${service}`,
    "",
    "Üzenet:",
    submission.message,
  ].join("\n");
}

function formatReceivedAt(receivedAt: string): string {
  return new Intl.DateTimeFormat("hu-HU", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Vienna",
  }).format(new Date(receivedAt));
}
