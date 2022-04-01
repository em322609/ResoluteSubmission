# mongoengine resources
from mongoengine import NotUniqueError, ValidationError

# project resources
from models.movies import Movies
from models.links import Links
from models.ratings import Ratings
from models.tags import Tags

from models.users import Users
from tools.mongo_loader import mongo

# external packages
import csv
from random import randint


@mongo
def csv_to_movie(filepath: str = 'resources/movies.csv', delimiter: str = ','):
    """
    Converts data in csv file to documents in meal collection.
    Uses @mongo wrapper to connect via mongoengine during execution.
    :param filepath:
    :param delimiter:
    :return:
    """
    with open(filepath, 'r') as file:
        data = csv.DictReader(file, delimiter=delimiter)
        for datum in data:
            movie = Movies(**datum, __auto_convert=True).save(validate=False)
            print(movie)
@mongo
def csv_to_links(filepath: str = 'resources/links.csv', delimiter: str = ','):
    """
    Converts data in csv file to documents in meal collection.
    Uses @mongo wrapper to connect via mongoengine during execution.
    :param filepath:
    :param delimiter:
    :return:
    """
    with open(filepath, 'r') as file:
        data = csv.DictReader(file, delimiter=delimiter)
        for datum in data:
            link = Links(**datum, __auto_convert=True).save(validate=False)
            print(link)

@mongo
def csv_to_ratings(filepath: str = 'resources/ratings.csv', delimiter: str = ','):
    """
    Converts data in csv file to documents in meal collection.
    Uses @mongo wrapper to connect via mongoengine during execution.
    :param filepath:
    :param delimiter:
    :return:
    """
    with open(filepath, 'r') as file:
        data = csv.DictReader(file, delimiter=delimiter)
        for datum in data:
            rating = Ratings(**datum, __auto_convert=True).save(validate=False)
            print(rating)

@mongo
def csv_to_tags(filepath: str = 'resources/tags.csv', delimiter: str = ','):
    """
    Converts data in csv file to documents in meal collection.
    Uses @mongo wrapper to connect via mongoengine during execution.
    :param filepath:
    :param delimiter:
    :return:
    """
    with open(filepath, 'r') as file:
        data = csv.DictReader(file, delimiter=delimiter)
        for datum in data:
            tag = Tags(**datum, __auto_convert=True).save(validate=False)
            print(tag)
