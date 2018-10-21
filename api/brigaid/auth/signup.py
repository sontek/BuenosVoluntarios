import scrypt
from brigaid.auth.utils import hash_password


def sign_up(request):
    email = request.json.get("email_address")
    password = request.json.get("password")
    data = hash_password(password)
    cb = request.couch.open_bucket('users')
    cb.insert(
        f'u:{email}',
        {
            'email_address': email,
            'password': data,
        }
    )

    return {
        "username": email,
        "password": data,
    }