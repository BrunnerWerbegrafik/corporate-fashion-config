import type { CartEntry, RequestSubmission } from "../types/models";
import { generateRequestNumber } from "../utils/generateRequestNumber";
import { productService } from "./productService";
import { positionService } from "./positionService";

interface SubmitInput {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  note?: string;
  dataPrivacyAccepted: boolean;
  cartEntries: CartEntry[];
  logoFile?: File | null;
}

export interface SubmitResult {
  requestNumber: string;
  delivered: boolean; // false → API not configured, request still recorded server-side
  warning?: string;
}

function buildHumanReadableSummary(entries: CartEntry[]): string {
  return entries
    .map((entry, idx) => {
      const product = productService.getById(entry.productId);
      const variant = product?.colorVariants.find((c) => c.id === entry.colorVariantId);
      const positions = entry.positions
        .map((id) => positionService.getById(id)?.name)
        .filter(Boolean)
        .join(", ");

      return [
        `${idx + 1}. ${product?.name ?? entry.productId}`,
        `   Farbe: ${variant?.name ?? "—"}`,
        `   Menge: ${entry.quantity} Stück`,
        `   Veredelung: ${entry.finishingType}`,
        `   Positionen: ${positions || "—"}`,
        entry.positionNote ? `   Position-Notiz: ${entry.positionNote}` : null,
        entry.finalNote ? `   Abschluss-Notiz: ${entry.finalNote}` : null,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");
}

export const submissionService = {
  async submit(input: SubmitInput): Promise<SubmitResult> {
    const requestNumber = generateRequestNumber();
    const submittedAt = new Date().toISOString();

    const submission: RequestSubmission = {
      firstName: input.firstName,
      lastName: input.lastName,
      company: input.company,
      email: input.email,
      phone: input.phone,
      note: input.note,
      dataPrivacyAccepted: input.dataPrivacyAccepted,
      cartEntries: input.cartEntries,
      logoFileName: input.logoFile?.name,
      submittedAt,
      requestNumber,
    };

    const summaryText = buildHumanReadableSummary(input.cartEntries);

    const formData = new FormData();
    formData.append("submission", JSON.stringify(submission));
    formData.append("summaryText", summaryText);
    if (input.logoFile) {
      formData.append("logo", input.logoFile);
    }

    try {
      const res = await fetch("/api/submit-anfrage", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.error ??
            `Server antwortete mit Status ${res.status}. Versuche es bitte erneut.`
        );
      }

      const data = (await res.json()) as { delivered: boolean; warning?: string };
      return {
        requestNumber,
        delivered: data.delivered,
        warning: data.warning,
      };
    } catch (err) {
      // Im Dev-Mode ohne Vercel Functions → Fallback auf Console-Log,
      // damit die Erfolgsseite trotzdem erreichbar ist.
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.warn("[submissionService] Fallback-Mode: API nicht erreichbar.", err);
        // eslint-disable-next-line no-console
        console.info("[submissionService] Submission:", submission);
        // eslint-disable-next-line no-console
        console.info("[submissionService] Summary:\n" + summaryText);
        return {
          requestNumber,
          delivered: false,
          warning:
            "Dev-Mode: API nicht erreichbar – Anfrage in Console geloggt statt versendet.",
        };
      }
      throw err;
    }
  },
};
