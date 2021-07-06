export const RABBIT_AMQP_URL = process.env.AMQP_HOST ? `amqp://${process.env.AMQP_HOST}` : 'amqp://0.0.0.0:5672';
export const QUEUE_NAME_ADD = process.env.QUEUE_NAME_ADD ? process.env.QUEUE_NAME_ADD : 'puppet';
export const QUEUE_NAME_UPDATE = process.env.QUEUE_NAME_UPDATE ? process.env.QUEUE_NAME_UPDATE : 'puppetUpdate';
