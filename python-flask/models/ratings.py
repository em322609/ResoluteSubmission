from mongoengine import Document, StringField, FloatField, DateTimeField;
class Ratings(Document):
    userId = StringField(required=True)
    movieId = StringField()
    rating = StringField()
    timestamp = DateTimeField()