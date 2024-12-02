import { NextResponse } from 'next/response';
import { prisma } from '@/lib/db';
import { getToken } from '@/lib/auth';

export async function PUT(req: Request) {
  try {
    const token = await getToken(req);
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { walletAddress, scaiId } = body;

    const user = await prisma.user.update({
      where: { id: token.sub },
      data: {
        walletAddress,
        scaiId,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Profile update failed' },
      { status: 500 }
    );
  }
}