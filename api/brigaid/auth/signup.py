import scrypt
from brigaid.auth.utils import hash_password, verify_password
from pyramid.settings import asbool
import uuid
from couchbase.n1ql import N1QLQuery

def sign_up(request):
    email = request.json.get("email_address", "")
    password = request.json.get("password", "")
    is_ngo = asbool(request.json.get("ngo", False))
    phone = request.json.get('phone_number', "")
    data = hash_password(password)
    cb = request.couch.open_bucket('users')

    id = str(uuid.uuid4())
    cb.insert(
        id,
        {
            'email_address': email,
            'password': data,
            'is_ngo': is_ngo,
            'phone_number': phone
        }
    )

    user = cb.get(id).value
    user['id'] = id
    del user['password']

    return {
        "success": True,
        "user": user,
    }


def sign_in(request):
    email = request.json.get("email_address", "")
    password = request.json.get("password", "")
    query_string = (
        "SELECT meta(`users`).id, *  FROM `users` WHERE email_address=$email_address"
    )
    query = N1QLQuery(query_string, email_address=email)
    cb = request.couch.open_bucket('users')

    for row in cb.n1ql_query(query):
        id = row['id']
        user = row['users']
        user['id'] = id

        if verify_password(user['password'], password):
            del user['password']
            return {
                "success": True,
                "user": user
            }

    return {
        "success": False,
    }