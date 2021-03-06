import 'reflect-metadata';
import { ObjectType, Field, ID, Int, InputType } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class Post {
    @Field((type) => ID)
    id: number;

    @Field((type) => Int, { nullable: true })
    likeCount: number | null;

    @Field((type) => Int, { nullable: true })
    commentCount: number | null;

    @Field((type) => String, { nullable: true })
    postType: string | null;

    @Field((type) => String, { nullable: true })
    mediaURL: string | null;

    @Field((type) => String, { nullable: true })
    mediaCode: string | null;

    @Field((type) => Date, { nullable: true })
    publishedAt?: Date | null;

    @Field((type) => User, { nullable: true })
    author?: User | null;

    @Field((type) => Int, { nullable: true })
    authorId?: number | null;
}

@InputType()
export class PostCreateInput {
    @Field({ nullable: true })
    likeCount: number;

    @Field({ nullable: true })
    commentCount: number;

    @Field({ nullable: true })
    postType: string;

    @Field({ nullable: true })
    publishedAt: Date;

    @Field({ nullable: true })
    mediaURL: string;

    @Field({ nullable: true })
    mediaCode: string;
}
