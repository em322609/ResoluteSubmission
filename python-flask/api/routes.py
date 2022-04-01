from api.movies import MoviesApi, MoviesApiSingleEntity
from api.ratings import RatingsApiSingleEntity
from api.links import LinksApiSingleEntity
from api.tags import TagsApiSingleEntity


from api.authentication import SignUpApi, LoginApi

def create_routes(api):
    api.add_resource(SignUpApi, '/authentication/signup/')
    api.add_resource(LoginApi, '/authentication/login/')
    api.add_resource(MoviesApi, '/movies/all')
    api.add_resource(MoviesApiSingleEntity, '/movies/<movie_name>')
    api.add_resource(RatingsApiSingleEntity, '/ratings/<movieId>')
    api.add_resource(LinksApiSingleEntity, '/links/<movieId>')
    api.add_resource(TagsApiSingleEntity, '/tags/<movieId>')



