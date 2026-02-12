import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const free = await prisma.plan.upsert({
    where: { name: 'free' },
    update: {},
    create: { name: 'free', maxFileSizeMb: 25, retentionHours: 1, monthlyLimit: 200, priceCents: 0 }
  });

  await prisma.plan.upsert({
    where: { name: 'pro' },
    update: {},
    create: { name: 'pro', maxFileSizeMb: 500, retentionHours: 24, monthlyLimit: 10000, priceCents: 1900 }
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@smartconverter.local' },
    update: {},
    create: {
      email: 'admin@smartconverter.local',
      name: 'Admin',
      passwordHash: await bcrypt.hash('ChangeMe123!', 10),
      planId: free.id
    }
  });

  await prisma.adminRole.upsert({
    where: { userId: admin.id },
    update: {},
    create: { userId: admin.id, role: 'SUPER_ADMIN' }
  });
}

main().finally(async () => prisma.$disconnect());
