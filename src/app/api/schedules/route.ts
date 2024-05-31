import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const newSchedule = await req.json();

    const result = await prisma.schedule.create({
      data: {
        ...newSchedule,
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
    const schedules = await prisma.schedule.findMany({
      include: {
        coach: true,
        topic: true,
      },
    });

    return NextResponse.json(schedules);
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
}
