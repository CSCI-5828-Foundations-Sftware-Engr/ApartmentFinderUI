import pika
import os
from pymongo import MongoClient
from flair.nn import Classifier
from flair.data import Sentence



mongodb_client = MongoClient("mongodb+srv://shka5709:fseData123@fseproject.j4lmokk.mongodb.net/?retryWrites=true&w=majority")
print("Mongo client created")

rabbitMQHost = os.getenv("RABBITMQ_HOST") or "localhost"
print(f"Connecting to rabbitmq({rabbitMQHost})")

# load the model
tagger = Classifier.load('sentiment')


def get_database():
    return mongodb_client["Property"]


def get_collection_name(dbname):
    return dbname["reviewAnalysis"]

def analysis(collection_name, message):
    review = message.split("||")[0]
    propertyId = message.split("||")[1]
    sentence = Sentence(review)
    tagger.predict(sentence)
    analysis=None
    for label in sentence.get_labels():
        analysis = label.value
    print(analysis)
    existingReviewAnalysis = collection_name.find_one({"propertyId":propertyId})
    if(existingReviewAnalysis):
        print("Review Analysis found")
        print(existingReviewAnalysis)
        if(analysis == "NEGATIVE"):
            newValue = {"$set" : {"negative": existingReviewAnalysis["negative"]+1}}
            document = collection_name.update_one({"propertyId":propertyId}, newValue)
            print(f"Updated review Analysis with negative value for propertyId = {propertyId}")
        else:
            newValue = {"$set" : {"positive": existingReviewAnalysis["positive"]+1}}
            document = collection_name.insert_one({"propertyId":propertyId}, newValue)
            print(f"Updated review Analysis with positive value for propertyId = {propertyId}")

    else:
        print("Review Analysis not found")
        reviewAnalsis={
            "propertyId": propertyId,
            "positive":0,
            "negative": 0
        }
        if(analysis == "NEGATIVE"):
            reviewAnalsis["negative"] = 1
        else:
            reviewAnalsis["positive"] = 1
        document = collection_name.insert_one(reviewAnalsis)
        print(f"Inserted review Analysis with id = {document.inserted_id}")

    



def callback(ch, method, properties, body):
    body = body.decode('UTF-8') 
    print(body)
    dbname = get_database()
    collection_name = get_collection_name(dbname)
    analysis(collection_name, body)
    print(" [x] Done")
    ch.basic_ack(delivery_tag=method.delivery_tag)


def startConsumer():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitMQHost))
    channel = connection.channel()
    channel.queue_declare(queue='reviewQueue')
    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='reviewQueue', on_message_callback=callback)
    channel.start_consuming()


if __name__ == '__main__':
    startConsumer()
