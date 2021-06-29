import 'reflect-metadata'
import { ObjectType, Field, ID } from 'type-graphql'
import { Post } from './Post'

@ObjectType()
export class User {
  @Field((type) => ID)
  id: number

  @Field()
  userName: string

  @Field((type) => String, { nullable: true })
  fullName?: string | null

  @Field((type) => String, { nullable: true })
  biography: string | null

  @Field((type) => String, { nullable: true })
  followerCount: number | null

  @Field((type) => Date, { nullable: true })
  retrievedAt: Date | null

  @Field((type) => [Post], { nullable: true })
  posts?: [Post] | null
}