'use strict';
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  try {
    const email = process.argv[2];
    if (!email) {
      console.error('Uso: node scripts/get_user.cjs user@example.com');
      process.exit(1);
    }

    const user = await prisma.usuario.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) {
      process.exit(0);
    }

    process.exit(0);
  } catch (err) {
    console.error('Error al obtener usuario:', err);
    process.exit(2);
  } finally {
    await prisma.$disconnect();
  }
})();
