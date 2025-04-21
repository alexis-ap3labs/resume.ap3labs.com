import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { name, email, message } = await request.json();

    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>', // Vous pourrez personnaliser ceci après vérification du domaine
      to: 'alexis@ap3labs.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    return json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return json(
      { error: 'Failed to send email' }, 
      { status: 500 }
    );
  }
} 