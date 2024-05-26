import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const types = [
    { name: 'entrada' },
    { name: 'almoco_entrada' },
    { name: 'almoco_saida' },
    { name: 'saida' },

  ]

  for (const type of types) {
    await prisma.type.upsert({
      where: { name: type.name },
      update: {},
      create: type,
    })
  }

 
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
