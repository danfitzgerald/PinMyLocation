import { PrismaClient } from '@prisma/client';

let prisma;

// Declare prisma globally
global.prisma = global.prisma || new PrismaClient();
prisma = global.prisma;

// Conditionally set prisma in the global scope for development environment
if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

export default prisma;
