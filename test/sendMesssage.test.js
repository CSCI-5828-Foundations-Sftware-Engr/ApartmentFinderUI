const amqp = require('amqplib');
const { sendMessage } = require('../routes/sendMessage');
const sinon = require('sinon');
const { expect } = require('chai');

// Mocking amqplib module
sinon.stub(amqp, 'connect');

describe('RabbitMQ Module', () => {
  let connection;
  let channel;

  beforeEach(() => {
    // Setting up connection and channel mocks
    channel = {
      assertQueue: sinon.stub(),
      sendToQueue: sinon.stub(),
    };
    connection = {
      createChannel: sinon.stub().resolves(channel),
    };
    amqp.connect.callsFake(() => Promise.resolve(connection));
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should connect to RabbitMQ and send a message', async () => {
    const review = 'Test Review';
    const propertyId = '123';

    await sendMessage(review, propertyId);

    expect(amqp.connect.calledWith('amqp://localhost')).to.be.true;
    expect(connection.createChannel.called).to.be.true;
    expect(channel.assertQueue.calledWith('reviewQueue', { durable: false })).to.be.true;

    const message = `${review}||${propertyId}`;
    expect(channel.sendToQueue.calledWith(
      'reviewQueue',
      Buffer.from(message),
      {
        mandatory: true,
        deliveryMode: 2,
      },
    )).to.be.true;
  });

  // it('should handle errors when connecting to RabbitMQ', async () => {
  //   amqp.connect.callsFake(() => Promise.reject(new Error('Connection error')));

  //   try {
  //     await sendMessage('Test Review', '123');
  //   } catch (error) {
  //     expect(error.message).to.equal('Connection error');
  //   }
  // });
});
