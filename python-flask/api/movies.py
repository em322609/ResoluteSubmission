# flask packages
from flask import jsonify
from flask_restful import Resource

# mongo-engine models
from models.movies import Movies
from models.ratings import Ratings
from models.links import Links
from models.tags import Tags


class MoviesApi(Resource):
    def get(self):
        output = Movies.objects()
        return jsonify([output])

class MoviesApiSingleEntity(Resource):
    def get(self, movie_name):
        movie_output = Movies.objects(title__contains=movie_name)
        return jsonify({'result': movie_output})
