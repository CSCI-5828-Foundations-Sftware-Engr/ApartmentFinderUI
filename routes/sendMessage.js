const amqp = require('amqplib');
let connection;
let channel;

async function connectToRabbitMQ() {
    if (connection && channel) {
      return Promise.resolve({ connection, channel });
    }
    try {
      // Create a connection to the RabbitMQ server
      connection = await amqp.connect('amqp://localhost');
  
      // Create a channel
      channel = await connection.createChannel();
  
      // Declare a queue
      const queueName = 'reviewQueue';
      await channel.assertQueue(queueName, { durable: false });
  
      console.log('Connected to RabbitMQ successfully!');
      return { connection, channel };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  async function sendMessage(review, propertyId) {
    try {
      const { connection, channel } = await connectToRabbitMQ();
      message = review + '||' + propertyId;
      console.log(message);
  
      // Send a message to the queue
      //const message = 'Hello, RabbitMQ!';
      channel.sendToQueue('reviewQueue', Buffer.from(message), {
        // Set the `mandatory` flag to true to receive a return message
        mandatory: true,
        // Set the `deliveryMode` to 2 for persistent messages
        deliveryMode: 2
      });
  
      console.log(`Sent message: ${message}`);
  
      // Wait for the confirmation from RabbitMQ server
    // await new Promise((resolve, reject) => {
    //     channel.once('error', (error) => {
    //       reject(error);
    //     });
    //     channel.once('ack', () => {
    //       console.log('Message sent successfully!');
    //       resolve();
    //     });
    //     channel.once('nack', () => {
    //       reject(new Error('Failed to send message'));
    //     });
    //   });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  module.exports = {sendMessage};