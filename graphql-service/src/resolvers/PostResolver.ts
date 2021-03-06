import 'reflect-metadata';
import { Resolver, Query, Mutation, Arg, Ctx, Int, InputType, Field } from 'type-graphql';
import { Post } from '../model/Post';
import { Context } from '../singleton/Context';

@Resolver(Post)
export class PostResolver {
    @Query((returns) => Post, { nullable: true })
    async getPostById(@Arg('id') id: number, @Ctx() ctx: Context) {
        return ctx.prisma.post.findFirst({
            where: { id }
        });
    }

    @Query((returns) => [Post], { nullable: true })
    async getAllPosts(@Ctx() ctx: Context) {
        return ctx.prisma.post.findMany();
    }

    @Mutation((returns) => Post, { nullable: true })
    async incrementLikeCount(@Arg('id', (type) => Int) id: number, @Ctx() ctx: Context) {
        return ctx.prisma.post.update({
            where: { id: id || undefined },
            data: {
                likeCount: {
                    increment: 1
                }
            }
        });
    }

    @Mutation((returns) => Post, { nullable: true })
    async deletePost(@Arg('id', (type) => Int) id: number, @Ctx() ctx: Context) {
        return ctx.prisma.post.delete({
            where: {
                id
            }
        });
    }
}
