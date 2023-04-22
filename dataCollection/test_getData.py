import pytest
from getData import getDataRequest, sendToWorker



def test_getDataRequest():
    propertyData = getDataRequest()
    assert propertyData != None

def test_sendToWorker():
    assert sendToWorker != None