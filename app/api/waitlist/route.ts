// app/api/waitlist/route.ts
import { joinWaitlist } from '@/app/actions/nodemailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return Response.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const formData = new FormData();
    formData.append('email', email);

    const result = await joinWaitlist(formData);

    if (result.success) {
      return Response.json({ message: result.message });
    } else {
      return Response.json({ error: result.message }, { status: 400 });
    }
  } catch (error) {
    console.error('Waitlist error:', error);
    return Response.json(
      { error: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    );
  }
}