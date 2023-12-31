import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers['authorization'] as string;
  const token = bearerToken.split(' ')[1];
  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    return res
      .status(401)
      .json({ errorMessage: 'Unauthorized request - token is invalid' });
  }

  const user = (await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      first_name: true,
      last_name: true,
      phone: true,
      email: true,
      city: true,
    },
  })) as User | null;

  if (!user) {
    return res.status(404).json({ errorMessage: 'User not found' });
  }

  return res.json({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    phone: user.phone,
    email: user.email,
    city: user.city,
  });
}
