from mongoengine import Document, StringField, FloatField, DateTimeField;
class Tags(Document):
    userId = StringField(required=True)
    movieId = StringField()
    tag = StringField()
    timestamp = DateTimeField()