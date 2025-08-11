import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';

import { createNewUser } from '@/lib/actions/user.actions';

export async function POST(request: Request) {
  const svixId = headers().get('svix-id') ?? '';
  const svixTimestamp = headers().get('svix-timestamp') ?? '';
  const svixSignature = headers().get('svix-signature') ?? '';

  if (!process.env.WEBHOOK_SECRET) {
    throw new Error('WEBHOOK_SECRET is not set');
  }

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Bad Request', { status: 400 });
  }

  const payload = await request.json();
  const body = JSON.stringify(payload);

  const sivx = new Webhook(process.env.WEBHOOK_SECRET);

  let message: WebhookEvent;

  try {
    message = sivx.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent;
  } catch (error) {
    console.log(error);

    return new Response('Bad Request', { status: 400 });
  }

  const eventType = message.type;

  if (eventType === 'user.created') {
    // create User to database
    const {
      email_addresses: emailAddress,
      id,
      image_url: imageUrl,
      username,
    } = message.data;
    const user = await createNewUser({
      username: username!,
      name: username!,
      clerkId: id,
      email: emailAddress[0]?.email_address,
      avatar: imageUrl,
    });

    return NextResponse.json({
      message: 'OK',
      user,
    });
  }

  // Rest

  return new Response('OK', { status: 200 });
}
