# flask packages
from flask import jsonify
from flask_restful import Resource

# mongo-engine models
from models.ratings import Ratings


class RatingsApi(Resource):
    def get(self):
        output = Ratings.objects()
        return jsonify({'result': output})


class RatingsApiSingleEntity(Resource):
    def get(self, movieId):
        output = Ratings.objects(movieId=movieId)
        return jsonify({'result': output})
