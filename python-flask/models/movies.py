from mongoengine import Document, StringField, FloatField, IntField;


class Movies(Document):
    movieId = IntField()
    title = StringField()
    genres = StringField()
    meta = {
        'strict': False,
    }
