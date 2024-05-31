import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const newCoach = await req.json();

    const result = await prisma.coach.create({
      data: {
        ...newCoach,
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
    const coaches = await prisma.coach.findMany({
      include: {
        course: true,
      },
    });

    return NextResponse.json(coaches);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
}
