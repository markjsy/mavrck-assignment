import amqplib from 'amqplib';
import { QUEUE_NAME, RABBIT_AMQP_URL } from '../config/rabbitmq';
import { addUser, getUserInformation, Post, User } from './puppet';

async function consume(){
    try {
        const connection = await amqplib.connect(RABBIT_AMQP_URL);
        const channel = await connection.createChannel();

        // Waits to consume from rabbit message queue
        channel.consume(QUEUE_NAME, async (msg: any) => {
            
            const parsedMsg: any = JSON.parse(msg.content)
            const userName: string = Object.keys(parsedMsg)[0];
            const userNameProcessed: string = userName.substring(1,userName.length-1);
            const userData = await getUserInformation(userNameProcessed)
            const userDataParsed = JSON.parse(userData)


            // General user information
            const user = userDataParsed.graphql.user
            const fullName: string = user.full_name
            const biography: string = user.biography
            const followerCount:number = user.edge_followed_by.count

            // Post information
            const latestPost = user.edge_owner_to_timeline_media.edges[0].node
            const likeCount: number = latestPost.edge_liked_by.count
            const commentCount: number = latestPost.edge_media_to_comment.count
            const postType:string = latestPost.__typename
            const mediaURL:string = latestPost.display_url
            const mediaCode:string = latestPost.shortcode
            const publishedAt:string = new Date(latestPost.taken_at_timestamp *1000).toUTCString()

            //console.log(latestPost)
            //console.log("likeCount: ", likeCount)
            //console.log("commentCount: ", commentCount)
            //console.log("postType: ", postType)
            //console.log("mediaURL: ", mediaURL)
            //console.log("mediaCode: ", mediaCode)
            //console.log("publishedAt: ", publishedAt)


            const postObj: Post[] = [{
                likeCount: likeCount,
                commentCount: commentCount,
                postType: postType,
                mediaURL: mediaURL,
                mediaCode: mediaCode,
                publishedAt: publishedAt
            }]
            const userObj: User = {
                userName: userNameProcessed,
                fullName: fullName,
                biography: biography,
                followerCount: followerCount,
                posts: postObj
            }
            const addUserResp = await addUser(userObj, postObj)
            console.log("addUserResp: ", addUserResp);
            // Acknowledges message as completed by consumer
            channel.ack(msg)
        });

        console.log('Successfuly consumed message');
    } catch (ex) {
        console.error("Consumer: Error occurred when connecting")
    }
} 
console.log("RUNNING CONSUMER")
consume()
