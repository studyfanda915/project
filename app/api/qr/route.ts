import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { content } = (await req.json()) as { content: string };
  const dataUrl = await QRCode.toDataURL(content, { margin: 1, width: 384 });
  return NextResponse.json({ dataUrl });
}
