import pytest
from reviewAnalysis import get_database


def test_getDatabase():
    assert get_database() == "Property"