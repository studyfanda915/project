import { NextRequest, NextResponse } from 'next/server';
import { aiProvider } from '@/lib/ai/provider';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { text } = (await req.json()) as { text: string };
  return NextResponse.json({ result: await aiProvider.summarize(text) });
}
