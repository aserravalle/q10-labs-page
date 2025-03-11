import type { APIRoute } from 'astro';
import sgMail from '@sendgrid/mail';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const firstName = data.get('firstName');
  const lastName = data.get('lastName');
  const email = data.get('email');
  const message = data.get('message');

  sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY);

  const msg = {
    to: 'bingbong@gmail.com',
    from: 'noreply@q10labs.com',
    subject: 'New Contact Form Submission',
    text: `
      Name: ${firstName} ${lastName}
      Email: ${email}
      Message: ${message}
    `,
  };

  try {
    await sgMail.send(msg);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};