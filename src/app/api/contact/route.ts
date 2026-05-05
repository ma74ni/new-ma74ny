import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactSchema } from '@/lib/validators';

export async function POST(req: NextRequest) {
  const body: unknown = await req.json().catch(() => null);
  const parsed = ContactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: 'Input inválido.' }, { status: 400 });
  }

  const { name, email, message } = parsed.data;
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'contact@ma74ny.com',
      to: 'ma74ny@gmail.com',
      subject: `Nuevo mensaje de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
    });

    return NextResponse.json({ message: 'Mensaje enviado correctamente.' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: 'Error al enviar el mensaje. Inténtalo de nuevo.' },
      { status: 500 },
    );
  }
}
