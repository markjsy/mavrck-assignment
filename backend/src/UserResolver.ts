import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  Int,
  InputType,
  Field,
} from 'type-graphql'
import { Post } from './Post'
import { User } from './User'
import { Context } from './Context'
import { PostCreateInput } from './PostResolver'

@InputType()
class UserCreateInput {
  @Field({ nullable: false })
  userName: string

  @Field({ nullable: true })
  fullName: string

  @Field({ nullable: true })
  followerCount: number

  @Field({ nullable: true })
  biography: string

  @Field((type) => [PostCreateInput], { nullable: true })
  posts: [PostCreateInput]
}

@Resolver(User)
export class UserResolver {

  @FieldResolver()
  async posts(@Root() user: User, @Ctx() ctx: Context): Promise<Post[]> {
    return ctx.prisma.user
      .findUnique({
        where: {
          id: user.id,
        },
      })
      .posts()
  }

  @Mutation((returns) => User)
  async addUser(
    @Arg('data') data: UserCreateInput,
    @Ctx() ctx: Context,
  ): Promise<User> {

    const postData = data.posts?.map((post) => {
      return {
        likeCount: post.likeCount,
        postType: post.postType || undefined
      }
    })

    return ctx.prisma.user.create({
      data: {
        userName: data.userName,
        fullName: data.fullName,
        posts: {
          create: postData
        }
      },
    })
  }

  @Query(() => [User])
  async getAllUsers(@Ctx() ctx: Context) {
    return ctx.prisma.user.findMany()
  }


}