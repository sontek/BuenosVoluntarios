import os
from brigaid.auth.signup import sign_up, sign_in
from pyramid.config import Configurator
from couchbase.cluster import Cluster
from couchbase.cluster import PasswordAuthenticator


def configure_cb(request):
    cluster = Cluster('couchbase://localhost')
    authenticator = PasswordAuthenticator(
        os.environ['CB_USERNAME'], os.environ['CB_PASSWORD']
    )
    cluster.authenticate(authenticator)
    return cluster


def main():
    with Configurator() as config:
        config.add_route('signup', '/signup')
        config.add_view(sign_up, route_name='signup', renderer='json')
        config.add_route('signin', '/signin')
        config.add_view(sign_in, route_name='signin', renderer='json')

        config.add_request_method(configure_cb, 'couch', reify=True)
        app = config.make_wsgi_app()

    return app
