# flask packages
from flask import jsonify
from flask_restful import Resource

# mongo-engine models
from models.tags import Tags


class TagsApi(Resource):
    def get(self):
        output = Tags.objects()
        return jsonify({'result': output})

class TagsApiSingleEntity(Resource):
    def get(self, movieId):
        output = Tags.objects(movieId=movieId)
        return jsonify({'result': output})

