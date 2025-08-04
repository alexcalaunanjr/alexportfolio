import { EmailTemplate } from '@/components/Contact/email-template';
import { Resend } from 'resend';
import { NextRequest } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, subject } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Alex Portfolio Contact Form <onboarding@resend.dev>',
      to: 'alexcalaunan@hotmail.com',
      subject: `Someone has sent you a message from your portfolio!`,
      react: await EmailTemplate({
        name,
        email,
        message,
        subject: subject || 'New Contact Form Submission',
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({
      success: true,
      message: 'Email sent successfully!',
      data,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json(
      {
        error: 'Failed to send email',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const audiences = await resend.audiences.list();
    return Response.json(audiences);
  } catch (error) {
    console.error('Error fetching audiences:', error);
    return Response.json(
      {
        error: 'Failed to fetch audiences',
      },
      { status: 500 }
    );
  }
}
