import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: any = [
  {
    userName: 'Mvrck1',
    biography: 'Here is the bio of Mvrck1',
    fullName: 'Mav Rck1',
    followerCount: 100,
    posts: {
      create: [
        {
          likeCount: 321,
          commentCount: 1234,
          postType: 'VIDEO',
          mediaURL: 'www.google.com'
        },
      ],
    },
    
  },
  {
    userName: 'Mvrck2',
    biography: 'Here is the bio of Mvrck2',
    fullName: 'Mav Rck2',
    followerCount: 100,
    posts: {
      create: [
        {
          likeCount: 321,
          commentCount: 1234,
          postType: 'VIDEO',
          mediaURL: 'www.google.com'
        },
      ],
    },
  },
  {
    userName: 'Mvrck3',
    biography: 'Here is the bio of Mvrck3',
    fullName: 'Mav Rck3',
    followerCount: 100,
    posts: {
      create: [
        {
          likeCount: 321,
          commentCount: 1234,
          postType: 'VIDEO',
          mediaURL: 'www.google.com'
        },
      ],
    },
    
  }

]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })