import requests
import pika
import jsonpickle
import os

rabbitMQHost = os.getenv("RABBITMQ_HOST") or "localhost"


def sendToWorker(message):
    connection = pika.BlockingConnection(pika.ConnectionParameters(rabbitMQHost))
    channel = connection.channel()
    channel.queue_declare(queue='topic', durable=True)

    channel.basic_publish(
        exchange='',
        routing_key='toWorker10',
        body=jsonpickle.encode(message),
        properties=pika.BasicProperties(delivery_mode=2))
    channel.close()
    connection.close()


url = "https://realty-in-us.p.rapidapi.com/properties/v2/list-for-rent"
querystring = {"city": "Boulder", "state_code": "CO", "limit": "1000", "offset": "0", "sort": "relevance"}
headers = {
    "X-RapidAPI-Key": "a1cf9a902dmshe1143ed19f5a15ep150379jsn8d41d8e4bbdf",
    "X-RapidAPI-Host": "realty-in-us.p.rapidapi.com"
}
propertyData = requests.request("GET", url, headers=headers, params=querystring)
sendToWorker({'propertyData': propertyData})
