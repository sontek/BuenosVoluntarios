from couchbase.cluster import Cluster
from couchbase.cluster import PasswordAuthenticator
import os

def configure_cb():
    cluster = Cluster('couchbase://localhost')
    authenticator = PasswordAuthenticator(
        os.environ['CB_USERNAME'], os.environ['CB_PASSWORD']
    )
    cluster.authenticate(authenticator)
    return cluster

cluster = configure_cb()

queries = [
    "CREATE INDEX ix_email ON `users`(email);",

]