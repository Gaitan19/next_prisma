import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const newTopic = await req.json();

    const result = await prisma.topic.create({
      data: {
        ...newTopic,
      },
    });

    return await NextResponse.json(result);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const topics = await prisma.topic.findMany({
      include: {
        course: true,
      },
    });

    return NextResponse.json(topics);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
}
