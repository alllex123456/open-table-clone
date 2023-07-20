import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '@/utilities/generateToken';
import bcrypt from 'bcrypt';
import { setCookie } from 'cookies-next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return;

  const { email, password } = req.body;

  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: 'Email is invalid',
    },
    {
      valid: validator.isLength(password, { min: 6 }),
      errorMessage: 'Password is invalid',
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user)
    return res.status(401).json({ errorMessage: 'User does not exist' });

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch)
    return res.status(401).json({ errorMessage: 'Password is incorrect' });

  const token = await generateToken(user.email);

  setCookie('jwt', token, { req, res, maxAge: 60 * 6 * 24 });

  res.json({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.phone,
    city: user.city,
  });
}
