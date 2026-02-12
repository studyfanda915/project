import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user?.passwordHash) return null;
        const matches = await bcrypt.compare(credentials.password, user.passwordHash);
        return matches ? { id: user.id, email: user.email, name: user.name } : null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? 'google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? 'google-client-secret'
    })
  ],
  pages: { signIn: '/dashboard' }
};
