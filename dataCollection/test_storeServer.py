import pytest
from pymongo import MongoClient
from store_server import get_database


def test_getDatabase():
    mongodb_client = MongoClient("mongodb+srv://shka5709:fseData123@fseproject.j4lmokk.mongodb.net/?retryWrites=true&w=majority")
    print("Mongo client created")
    dbName = get_database(mongodb_client)
    assert dbName != None




