import amqplib from 'amqplib';
import { QUEUE_NAME_ADD, RABBIT_AMQP_URL } from '../config/rabbitmq';
import { addUser, getUserInformation, Post, User } from './puppet';

async function consume() {
    try {
        
        const connection = await amqplib.connect(RABBIT_AMQP_URL);
        const channel = await connection.createChannel();

        // Waits to consume from rabbit message queue
        console.log("OUTSIDE THE CONSUMER")

        channel.consume('puppet', async (msg: any) => {
            console.log("INSIDE THE CONSUMER")
            const parsedMsg: any = JSON.parse(msg.content)
            const userName: string = Object.keys(parsedMsg)[0];
            const userNameProcessed: string = userName.substring(1, userName.length - 1);
            const userData = await getUserInformation(userNameProcessed)
            const userDataParsed = JSON.parse(userData)

            // General user information
            if (userDataParsed && userDataParsed.graphql && userDataParsed.graphql.user) {

                const user = userDataParsed.graphql.user
                const fullName: string = user.full_name
                const biography: string = user.biography
                const followerCount: number = user.edge_followed_by.count

                // Post information
                if (user && user.edge_owner_to_timeline_media && user.edge_owner_to_timeline_media.edges.length > 0) {

                    const latestPost = user.edge_owner_to_timeline_media.edges[0].node
                    const likeCount: number = latestPost.edge_liked_by.count
                    const commentCount: number = latestPost.edge_media_to_comment.count
                    const postType: string = latestPost.__typename
                    const mediaURL: string = latestPost.display_url
                    const mediaCode: string = latestPost.shortcode
                    const publishedAt: string = new Date(latestPost.taken_at_timestamp * 1000).toUTCString()

                    const postObj: Post[] = [{
                        likeCount: likeCount,
                        commentCount: commentCount,
                        postType: postType,
                        mediaURL: mediaURL,
                        mediaCode: mediaCode,
                        publishedAt: publishedAt
                    }]
                    const userObj: User = {
                        userName: userNameProcessed.replace(/(\r\n|\n|\r)/gm, ""),
                        fullName: fullName.replace(/(\r\n|\n|\r)/gm, ""),
                        biography: biography.replace(/(\r\n|\n|\r)/gm, ""),
                        followerCount: followerCount,
                        posts: postObj
                    }
                    const addUserResp = await addUser(userObj, postObj)
                    console.log("addUserResp: ", addUserResp)
                    console.log("userObj: ", userObj)
                    console.log("postObj: ", postObj)
                }
            }
            // Acknowledges message as completed by consumer
            channel.ack(msg)
        });

        console.log('Successfuly consumed message1');
    } catch (ex) {
        console.error("Consumer: Error occurred when connecting")
    }
}
consume()
