/**
 * Email service — stub implementation.
 *
 * Every function console.logs its payload for now.
 * To plug in a real provider (Resend, SendGrid, etc.) replace the
 * body of each function with an HTTP call to your provider's API.
 */

export interface SendTestEmailParams {
  to: string;
  subject: string;
  body: string;
}

export interface SendBulkEmailParams {
  recipients: { email: string; first_name: string | null }[];
  subject: string;
  body: string;
}

export interface EmailResult {
  ok: boolean;
  message: string;
}

/**
 * Send a single test email.
 * Replace the console.log with a real provider call later.
 */
export async function sendTestEmail(
  params: SendTestEmailParams
): Promise<EmailResult> {
  console.log("[email:sendTestEmail]", {
    to: params.to,
    subject: params.subject,
    body: params.body,
  });

  // Simulate a short network delay
  await delay(400);

  return { ok: true, message: `Test email logged for ${params.to}` };
}

/**
 * Send bulk emails to all opted-in recipients.
 * Replace the console.log with a real provider call later.
 */
export async function sendBulkEmail(
  params: SendBulkEmailParams
): Promise<EmailResult> {
  console.log("[email:sendBulkEmail]", {
    recipientCount: params.recipients.length,
    subject: params.subject,
    body: params.body,
    recipients: params.recipients.map((r) => r.email),
  });

  // Simulate a short network delay
  await delay(600);

  return {
    ok: true,
    message: `Campaign queued for ${params.recipients.length} recipients`,
  };
}

/**
 * Replace {{first_name}} placeholders in a message body.
 */
export function renderBody(
  template: string,
  firstName: string | null
): string {
  return template.replace(
    /\{\{first_name\}\}/g,
    firstName?.trim() || "there"
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
