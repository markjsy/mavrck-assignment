import 'reflect-metadata';
import { ObjectType, Field, ID, InputType } from 'type-graphql';
import { Post, PostCreateInput } from './Post';

@ObjectType()
export class User {
    @Field((type) => ID)
    id: number;

    @Field()
    userName: string;

    @Field((type) => String, { nullable: true })
    fullName?: string | null;

    @Field((type) => String, { nullable: true })
    biography?: string | null;

    @Field((type) => String, { nullable: true })
    followerCount?: number | null;

    @Field((type) => Date, { nullable: true })
    retrievedAt?: Date;

    @Field((type) => [Post],{ nullable: true })
    posts?: Post[];
}

@InputType()
export class UserCreateInput {
    @Field({ nullable: false })
    userName: string;

    @Field({ nullable: true })
    fullName: string;

    @Field({ nullable: true })
    followerCount: number;

    @Field({ nullable: true })
    biography: string;

    @Field((type) => [PostCreateInput], { nullable: true })
    posts: [PostCreateInput];
}
