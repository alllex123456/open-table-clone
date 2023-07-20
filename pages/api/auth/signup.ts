import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from '@/utilities/generateToken';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return;

  const { firstName, lastName, email, password, city, phone } = req.body;

  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isLength(firstName, { min: 2 }),
      errorMessage: 'First name must be at least 2 characters long',
    },
    {
      valid: validator.isLength(lastName, { min: 2 }),
      errorMessage: 'Last name must be at least 2 characters long',
    },
    {
      valid: validator.isEmail(email),
      errorMessage: 'Email is invalid',
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage: 'Password is too weak',
    },
    {
      valid: validator.isLength(password, { min: 6 }),
      errorMessage: 'Password must be at least 6 characters long',
    },
    {
      valid: validator.isLength(city, { min: 2 }),
      errorMessage: 'The city must be at least 2 characters long',
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: 'The mobile phone number is invalid',
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  if (errors.length) {
    return res.status(400).json({ errorMessage: errors[0] });
  }

  const isUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (isUser) {
    return res.status(400).json({
      errorMessage: 'There is already an account associated with this email',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      password: hashedPassword,
      city,
      phone,
      email,
    },
  });

  const token = await generateToken(user.email);

  setCookie('jwt', token, { req, res, maxAge: 60 * 6 * 24 });

  res.status(200).json({
    first_name: user.first_name,
    last_name: user.last_name,
    city: user.city,
    phone: user.phone,
    email: user.email,
  });
}
