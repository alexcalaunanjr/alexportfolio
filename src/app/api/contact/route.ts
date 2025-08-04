import { Resend } from 'resend';
import { NextRequest } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY!);

// Function to add a NEW contact
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    const { data, error } = await resend.contacts.create({
      audienceId: process.env.RESEND_AUDIENCE_ID!,
      firstName: name,
      email,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({
      success: true,
      message: 'Contact added successfully!',
      data,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json(
      {
        error: 'Failed to add contact',
      },
      { status: 500 }
    );
  }
}

// export async function GET() {
//   try {
//     const audiences = await resend.audiences.list();
//     return Response.json(audiences);
//   } catch (error) {
//     console.error('Error fetching audiences:', error);
//     return Response.json(
//       {
//         error: 'Failed to fetch audiences',
//       },
//       { status: 500 }
//     );
//   }
// }
