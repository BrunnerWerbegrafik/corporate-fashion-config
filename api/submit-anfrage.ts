import { Resend } from "resend";

export const config = {
  runtime: "edge",
};

const RECIPIENT = "info@brunner-werbegrafik.de";
const FROM_DEFAULT = "Corporate Fashion Konfigurator <konfigurator@brunner-werbegrafik.de>";
const MAX_LOGO_BYTES = 20 * 1024 * 1024;

interface CartEntryPayload {
  id: string;
  productId: string;
  colorVariantId: string;
  quantity: number;
  finishingType: "druck" | "stick";
  positions: string[];
  positionNote?: string;
  finalNote?: string;
  createdAt: string;
}

interface SubmissionPayload {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  note?: string;
  dataPrivacyAccepted: boolean;
  cartEntries: CartEntryPayload[];
  logoFileName?: string;
  submittedAt: string;
  requestNumber: string;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtmlEmail(submission: SubmissionPayload, summaryText: string, logoFileName?: string) {
  const rows = submission.cartEntries
    .map((entry, idx) => {
      const positions = entry.positions.join(", ") || "—";
      return `
        <tr>
          <td style="padding:10px 12px;border-top:1px solid #1F3552;color:#0A1A2F;vertical-align:top;font-weight:600;">${idx + 1}.</td>
          <td style="padding:10px 12px;border-top:1px solid #1F3552;color:#0A1A2F;vertical-align:top;">
            <div style="font-weight:700;">${escapeHtml(entry.productId)}</div>
            <div>Farbe: ${escapeHtml(entry.colorVariantId)} · Menge: ${entry.quantity} Stück</div>
            <div>Veredelung: ${escapeHtml(entry.finishingType)}</div>
            <div>Positionen: ${escapeHtml(positions)}</div>
            ${entry.positionNote ? `<div style="margin-top:4px;font-style:italic;">Position: „${escapeHtml(entry.positionNote)}"</div>` : ""}
            ${entry.finalNote ? `<div style="margin-top:4px;font-style:italic;">Notiz: „${escapeHtml(entry.finalNote)}"</div>` : ""}
          </td>
        </tr>
      `;
    })
    .join("");

  return `
  <!doctype html>
  <html>
    <body style="margin:0;background:#F4F5F7;font-family:Arial,Helvetica,sans-serif;color:#0A1A2F;">
      <div style="max-width:640px;margin:0 auto;padding:32px 24px;">
        <div style="background:#0A1A2F;color:white;padding:24px;border-radius:4px 4px 0 0;">
          <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.6;">Neue Konfigurator-Anfrage</div>
          <div style="font-size:24px;font-weight:700;margin-top:6px;">${escapeHtml(submission.requestNumber)}</div>
        </div>
        <div style="background:white;padding:24px;border-radius:0 0 4px 4px;border:1px solid #E5E7EB;border-top:none;">
          <h2 style="margin:0 0 12px 0;font-size:18px;">Kontakt</h2>
          <p style="margin:0 0 4px 0;"><strong>${escapeHtml(submission.firstName)} ${escapeHtml(submission.lastName)}</strong></p>
          <p style="margin:0 0 4px 0;">${escapeHtml(submission.company)}</p>
          <p style="margin:0 0 4px 0;">E-Mail: <a href="mailto:${escapeHtml(submission.email)}" style="color:#009FE3;">${escapeHtml(submission.email)}</a></p>
          <p style="margin:0;">Telefon: ${escapeHtml(submission.phone)}</p>
          ${submission.note ? `<p style="margin:16px 0 0 0;padding:12px;background:#F4F5F7;border-left:3px solid #009FE3;font-style:italic;">„${escapeHtml(submission.note)}"</p>` : ""}

          <h2 style="margin:24px 0 8px 0;font-size:18px;">Konfigurierte Artikel (${submission.cartEntries.length})</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>

          <h2 style="margin:24px 0 8px 0;font-size:18px;">Logo</h2>
          <p style="margin:0;">${logoFileName ? `Datei beigefügt: <strong>${escapeHtml(logoFileName)}</strong>` : "<em>Kein Logo hochgeladen.</em>"}</p>

          <p style="margin-top:24px;font-size:12px;color:#6B7280;">Eingegangen am ${new Date(submission.submittedAt).toLocaleString("de-DE")}.</p>
        </div>
      </div>
    </body>
  </html>
  `;
}

function buildPlainText(submission: SubmissionPayload, summaryText: string, logoFileName?: string) {
  return [
    `Neue Konfigurator-Anfrage`,
    `Anfragenummer: ${submission.requestNumber}`,
    ``,
    `KONTAKT`,
    `${submission.firstName} ${submission.lastName}`,
    submission.company,
    `E-Mail: ${submission.email}`,
    `Telefon: ${submission.phone}`,
    submission.note ? `Notiz: ${submission.note}` : "",
    ``,
    `ARTIKEL (${submission.cartEntries.length}):`,
    summaryText,
    ``,
    `LOGO: ${logoFileName ?? "—"}`,
    ``,
    `Eingegangen: ${new Date(submission.submittedAt).toLocaleString("de-DE")}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function buildCustomerHtml(submission: SubmissionPayload) {
  return `
  <!doctype html>
  <html>
    <body style="margin:0;background:#F4F5F7;font-family:Arial,Helvetica,sans-serif;color:#0A1A2F;">
      <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
        <div style="background:white;padding:32px;border-radius:4px;border:1px solid #E5E7EB;">
          <h1 style="margin:0 0 12px 0;font-size:32px;color:#0A1A2F;">Alles klar.</h1>
          <p style="margin:0 0 24px 0;font-size:16px;color:#4B5563;">Wir melden uns innerhalb von <em style="color:#009FE3;">24 Stunden</em> mit dem Angebot.</p>

          <div style="background:#F4F5F7;padding:16px;border-radius:4px;margin-bottom:24px;">
            <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#6B7280;">Deine Anfragenummer</div>
            <div style="font-size:22px;font-weight:700;margin-top:4px;">${escapeHtml(submission.requestNumber)}</div>
            <div style="font-size:12px;color:#6B7280;margin-top:6px;">Bei Rückfragen bitte diese Nummer angeben.</div>
          </div>

          <p style="margin:0 0 8px 0;color:#4B5563;font-size:14px;">Beste Grüße<br/>Team Brunner Werbegrafik</p>
          <p style="margin:24px 0 0 0;font-size:12px;color:#9CA3AF;">Diese E-Mail wurde automatisch generiert. Antworten gehen direkt an unser Postfach.</p>
        </div>
      </div>
    </body>
  </html>
  `;
}

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return new Response(JSON.stringify({ error: "Ungültiger Request-Body." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const rawSubmission = formData.get("submission");
  const summaryText = (formData.get("summaryText") as string | null) ?? "";
  const logo = formData.get("logo") as File | null;

  if (typeof rawSubmission !== "string") {
    return new Response(JSON.stringify({ error: "Submission fehlt." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  let submission: SubmissionPayload;
  try {
    submission = JSON.parse(rawSubmission);
  } catch {
    return new Response(JSON.stringify({ error: "Submission konnte nicht geparst werden." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  if (!submission.dataPrivacyAccepted) {
    return new Response(JSON.stringify({ error: "Datenschutz nicht bestätigt." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  if (logo && logo.size > MAX_LOGO_BYTES) {
    return new Response(JSON.stringify({ error: "Logo-Datei überschreitet 20 MB." }), {
      status: 413,
      headers: { "content-type": "application/json" },
    });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // E-Mail-Versand ist (noch) nicht konfiguriert.
    // Die Anfrage wird im Vercel-Function-Log persistiert, damit nichts verloren geht.
    console.warn("[submit-anfrage] RESEND_API_KEY nicht gesetzt – Anfrage wird nur geloggt.");
    console.info("[submit-anfrage] Submission:", submission);
    console.info("[submit-anfrage] Summary:\n" + summaryText);
    if (logo) {
      console.info(`[submit-anfrage] Logo-Datei: ${logo.name} (${logo.size} Bytes)`);
    }
    return new Response(
      JSON.stringify({
        delivered: false,
        warning:
          "RESEND_API_KEY ist auf Vercel noch nicht gesetzt. Die Anfrage wurde im Function-Log gespeichert, aber nicht per E-Mail versendet.",
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }

  const resend = new Resend(apiKey);
  const fromAddress = process.env.RESEND_FROM ?? FROM_DEFAULT;

  const attachments: { filename: string; content: string }[] = [];
  if (logo) {
    const buffer = await logo.arrayBuffer();
    const base64 = arrayBufferToBase64(buffer);
    attachments.push({ filename: logo.name, content: base64 });
  }

  try {
    const adminMail = await resend.emails.send({
      from: fromAddress,
      to: [RECIPIENT],
      replyTo: submission.email,
      subject: `Konfigurator-Anfrage ${submission.requestNumber} · ${submission.company}`,
      html: buildHtmlEmail(submission, summaryText, logo?.name),
      text: buildPlainText(submission, summaryText, logo?.name),
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (adminMail.error) {
      throw new Error(adminMail.error.message);
    }

    // Bestätigungs-Mail an den Kunden – Fehler hier sind nicht kritisch
    await resend.emails
      .send({
        from: fromAddress,
        to: [submission.email],
        subject: `Deine Anfrage bei Brunner Werbegrafik · ${submission.requestNumber}`,
        html: buildCustomerHtml(submission),
        text: `Alles klar.\n\nWir melden uns innerhalb von 24 Stunden mit deinem Angebot.\n\nDeine Anfragenummer: ${submission.requestNumber}\nBei Rückfragen bitte diese Nummer angeben.\n\nBeste Grüße\nTeam Brunner Werbegrafik`,
      })
      .catch((err) => {
        console.warn("[submit-anfrage] Bestätigungsmail an Kunden fehlgeschlagen:", err);
      });

    return new Response(JSON.stringify({ delivered: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    console.error("[submit-anfrage] Resend-Fehler:", err);
    return new Response(
      JSON.stringify({
        error:
          "E-Mail-Versand fehlgeschlagen. Wir wurden benachrichtigt – bitte versuche es später noch einmal oder kontaktiere uns direkt unter info@brunner-werbegrafik.de.",
      }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
  }
  // btoa ist im Edge-Runtime verfügbar.
  return btoa(binary);
}
