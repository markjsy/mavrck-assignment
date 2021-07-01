import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: any = [
 
  {
    userName: 'Mavrck1',
    fullName: 'Mav Rck1',
    biography: 'Here is the bio of Mavrck1',
    followerCount: 100,
    posts: {
      create: [
        {
          likeCount: 321,
          commentCount: 1234,
          postType: 'VIDEO',
          mediaURL: 'https://photos.angel.co/startups/i/187199-8e5a4e21af81c9a7daa7ac29bd76baa4-medium_jpg.jpg?buster=1589601706'
        },
      ],
    },
    
  },
  {
    userName: 'Mavrck2',
    biography: 'Here is the bio of Mavrck2',
    fullName: 'Mav Rck2',
    followerCount: 100,
    posts: {
      create: [
        {
          likeCount: 321,
          commentCount: 1234,
          postType: 'VIDEO',
          mediaURL: 'https://photos.angel.co/startups/i/187199-8e5a4e21af81c9a7daa7ac29bd76baa4-medium_jpg.jpg?buster=1589601706'
        },
      ],
    },
  },
  {
    userName: 'Mavrck3',
    biography: 'Here is the bio of Mavrck3',
    fullName: 'Mav Rck3',
    followerCount: 1220,
    posts: {
      create: [
        {
          likeCount: 321,
          commentCount: 1234,
          postType: 'VIDEO',
          mediaURL: 'https://photos.angel.co/startups/i/187199-8e5a4e21af81c9a7daa7ac29bd76baa4-medium_jpg.jpg?buster=1589601706'
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