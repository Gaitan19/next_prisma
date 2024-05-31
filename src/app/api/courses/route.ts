import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const newCourse = await req.json();

    const result = await prisma.course.create({
      data: {
        ...newCourse,
        end_date: new Date(),
      },
    });

    return await NextResponse.json(result);
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const courses = await prisma.course.findMany();

  return NextResponse.json(courses);
}
