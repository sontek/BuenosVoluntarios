from pyramid.settings import asbool
import uuid
from couchbase.n1ql import N1QLQuery


def update_interests(request):
    cb = request.couch.open_bucket('users')

    return {
        "success": False,
    }