import 'reflect-metadata';
import { Resolver, Query, Mutation, Arg, Ctx, FieldResolver, Root, Int, InputType, Field, Subscription, ResolverFilterData, PubSubEngine, PubSub, ID, Publisher } from 'type-graphql';
import { Post } from '../model/Post';
import { User, UserCreateInput } from '../model/User';
import { Context } from '../singleton/Context';

@Resolver(User)
export class UserResolver {
    @FieldResolver()
    async posts(@Root() user: User, @Ctx() ctx: Context): Promise<Post[]> {
        return ctx.prisma.user
            .findUnique({
                where: {
                    id: user.id
                }
            })
            .posts();
    }

    @Mutation((returns) => User, { nullable: true })
    async updateUser(
        @PubSub() pubSub: PubSubEngine,
        @Arg('data') data: UserCreateInput,
        @Ctx() ctx: Context): Promise<User> {

        const postData = data.posts?.map((post) => {
            return {
                likeCount: post.likeCount,
                commentCount: post.commentCount,
                mediaURL: post.mediaURL,
                publishedAt: post.publishedAt,
                postType: post.postType
            };
        });

        const retVal = ctx.prisma.user.update({
            where: { userName: data.userName },
            data: {
                userName: data.userName,
                fullName: data.fullName,
                followerCount: data.followerCount,
                biography: data.biography,
                retrievedAt: new Date(),
                posts: {
                    create: postData
                }
            }
        });
        await pubSub.publish("NOTIFICATIONS", retVal);
        return retVal;
    }

    @Mutation((returns) => User)
    async addUser(
        @PubSub() pubSub: PubSubEngine,
        @Arg('data') data: UserCreateInput,
        @Ctx() ctx: Context): Promise<User> {

        const postData = data.posts?.map((post) => {
            return {
                likeCount: post.likeCount,
                commentCount: post.commentCount,
                mediaURL: post.mediaURL,
                publishedAt: post.publishedAt,
                postType: post.postType
            };
        });

        const retVal = ctx.prisma.user.create({
            data: {
                userName: data.userName,
                fullName: data.fullName,
                followerCount: data.followerCount,
                biography: data.biography,
                retrievedAt: new Date(),
                posts: {
                    create: postData
                }
            }
        });
        await pubSub.publish("NOTIFICATIONS", retVal);
        return retVal
    }

    @Query(() => [User])
    async getAllUsers(@Ctx() ctx: Context): Promise<User[]> {
        return ctx.prisma.user.findMany();
    }

    @Query((returns) => User, { nullable: true })
    async getUserByUserName(@Arg('userName') userName: string, @Ctx() ctx: Context) {
        return ctx.prisma.user
            .findUnique({
                where: {
                    userName: userName
                }
            })
    }

    @Subscription({ topics: "NOTIFICATIONS" })
    normalSubscription(@Root() { id, retrievedAt, userName, fullName, followerCount, biography, posts }: User): User {
        const postData = posts?.map((post) => {
            return {
                id: post.id,
                likeCount: post.likeCount,
                commentCount: post.commentCount,
                publishedAt: post.publishedAt,
                mediaURL: post.mediaURL,
                mediaCode: post.mediaCode,
                postType: post.postType
            };
        });

        return {
            id: id,
            retrievedAt: retrievedAt,
            userName: userName,
            fullName: fullName,
            followerCount: followerCount,
            biography: biography,
            posts: postData
        }
    }

    @Mutation(returns => Boolean)
    async pubSubMutation(
        @PubSub() pubSub: PubSubEngine,
        @Arg('data') data: UserCreateInput): Promise<boolean> {
        const payload: any = { ...data };
        await pubSub.publish("NOTIFICATIONS", payload);
        return true;
    }
}
