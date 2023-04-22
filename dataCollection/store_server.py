import pika
import jsonpickle
import os
import json
from dotenv import dotenv_values
from pymongo import MongoClient

config = dotenv_values(".env")
print(f"Read the mongo connection details from .env file")

mongodb_client = MongoClient(config["ATLAS_URI"])
print("Mongo client created")

rabbitMQHost = os.getenv("RABBITMQ_HOST") or "localhost"
print(f"Connecting to rabbitmq({rabbitMQHost})")


def get_database(client):
    return client[config["DB_NAME"]]


def get_collection_name(dbname):
    return dbname[config["PROPERTY_COLLECTION"]]


def store_data(collection_name, propertyData):
    count =0
    print(len(propertyData['properties']))
    for i in range(0, len(propertyData['properties'])):
        if "address" in propertyData['properties'][i] and "community" in propertyData['properties'][i]:
            count+=1
            data={
                'propertyId':propertyData['properties'][i]["property_id"],
                'propertyType':propertyData['properties'][i]["prop_type"],
                'listingStatus':propertyData['properties'][i]["listing_status"],
                'beds':int(propertyData['properties'][i]["beds"]),
                'address' : {
                    'city': propertyData['properties'][i]["address"]["city"],
                    'country' :propertyData['properties'][i]["address"]["country"],
                    'county': propertyData['properties'][i]["address"]["county"],
                    'lat' : float(propertyData['properties'][i]["address"]["lat"]),
                    'line': propertyData['properties'][i]["address"]["line"],
                    'postalCode': propertyData['properties'][i]["address"]["postal_code"],
                    'stateCode': propertyData['properties'][i]["address"]["state_code"],
                    #'neighborhood': propertyData['properties'][i]["address"]["neighborhood_name"],
                    'lon' :float(propertyData['properties'][i]["address"]["lon"]),
                    'buildingSizeUnit': propertyData['properties'][i]["building_size"]["units"]
                },
                'details':{
                    'bathsMax' :int(propertyData['properties'][i]["community"]["baths_max"]),
                    'bathsMin': int(propertyData['properties'][i]["community"]["baths_min"]),
                    'bedsMax' : int(propertyData['properties'][i]["community"]["beds_max"]),
                    'bedsMin' : int( propertyData['properties'][i]["community"]["beds_min"]),
                    #'contactNo': propertyData['properties'][i]["community"]["contact_number"],
                    'priceMax':  int(propertyData['properties'][i]["community"]["price_max"]) if propertyData['properties'][i]["community"]["price_max"] is not None else 2000 ,
                    'priceMin' : int(propertyData['properties'][i]["community"]["price_min"]) if propertyData['properties'][i]["community"]["price_min"] is not None else 2000 ,
                    'sqftMax': int(propertyData['properties'][i]["community"]["sqft_max"]) if propertyData['properties'][i]["community"]["sqft_max"] is not None else 1000,
                    'sqftMin': int(propertyData['properties'][i]["community"]["sqft_min"]) if propertyData['properties'][i]["community"]["sqft_min"] is not None else 1000,
                },
                'photoCount' : int(propertyData['properties'][i]["photo_count"]),
                'photos': propertyData['properties'][i]["photos"]

            }
            document = collection_name.insert_one(data)
            print(f"Inserted document with id = {document.inserted_id}")
        document = collection_name.insert_one(propertyData['properties'][i])
        print(f"Inserted document with id = {document.inserted_id}")
    print(count)

def callback(ch, method, properties, body):
    data = jsonpickle.decode(body)
    propertyData = json.loads(data['propertyData'].text)
    dbname = get_database(mongodb_client)
    collection_name = get_collection_name(dbname)
    store_data(collection_name, propertyData)
    print(" [x] Done")
    ch.basic_ack(delivery_tag=method.delivery_tag)


def startConsumer():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitMQHost))
    channel = connection.channel()
    channel.queue_declare(queue='toWorker10')
    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='toWorker10', on_message_callback=callback)
    channel.start_consuming()


if __name__ == '__main__':
    startConsumer()
