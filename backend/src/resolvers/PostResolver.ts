import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  Int,
  InputType,
  Field,
} from 'type-graphql'
import { Post } from '../model/Post'
import { Context } from '../singleton/Context'

export enum SortOrder {
  asc = 'asc',
  desc = 'desc'
}

@InputType()
export class PostCreateInput {
  @Field({ nullable: true })
  likeCount: number

  @Field({ nullable: true })
  commentCount: number

  @Field({ nullable: true })
  postType: string

  @Field({ nullable: true })
  mediaURL: string
}


@Resolver(Post)
export class PostResolver {

  @Query((returns) => Post, { nullable: true })
  async getPostById(@Arg('id') id: number, @Ctx() ctx: Context) {
    return ctx.prisma.post.findFirst({
      where: { id },
    })
  }

  @Mutation((returns) => Post, { nullable: true })
  async incrementLikeCount(@Arg('id', (type) => Int) id: number, @Ctx() ctx: Context) {
    return ctx.prisma.post.update({
      where: { id: id || undefined },
      data: {
        likeCount: {
          increment: 1,
        },
      },
    })
  }

  @Mutation((returns) => Post, { nullable: true })
  async deletePost(
    @Arg('id', (type) => Int) id: number,
    @Ctx() ctx: Context,
  ) {
    return ctx.prisma.post.delete({
      where: {
        id
      },
    })
  }
}