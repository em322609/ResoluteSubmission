from mongoengine import Document, StringField, FloatField;
class Links(Document):
    movieId = StringField(required=True)
    imdbId = StringField()
    tmdbId = FloatField()