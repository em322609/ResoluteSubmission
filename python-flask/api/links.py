# flask packages
from flask import jsonify
from flask_restful import Resource

# mongo-engine models
from models.links import Links


class LinksApi(Resource):
    def get(self):
        output = Links.objects()
        return jsonify({'result': output})


class LinksApiSingleEntity(Resource):
    def get(self, movieId):
        output = Links.objects(movieId=movieId)
        return jsonify({'result': output})