import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Send email via mailto-style approach using a fetch to an email service
    // For now, we log and return success. In production, integrate with
    // an email provider (e.g., Resend, SendGrid, or Twilio SendGrid).
    // The form data is structured and ready for any email API integration.

    const emailData = {
      to: "support@vintico.site",
      from: email,
      name,
      subject: subject || "Contact Form Submission",
      message,
      timestamp: new Date().toISOString(),
    };

    console.log("[Contact Form Submission]", JSON.stringify(emailData));

    // TODO: Replace with actual email service integration
    // Example with Resend:
    // await resend.emails.send({
    //   from: "noreply@vintico.site",
    //   to: "support@vintico.site",
    //   subject: `Contact: ${subject || "New message"} from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    // });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact API Error]", err);
    return NextResponse.json(
      { success: false, error: "Failed to send message." },
      { status: 500 }
    );
  }
}
