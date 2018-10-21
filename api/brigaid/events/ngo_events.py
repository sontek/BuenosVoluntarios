import uuid
import os
from twilio.rest import Client
from couchbase.n1ql import N1QLQuery


def create_event(request):
    name = request.json.get("name", "")
    interests = request.json.get("interests", "")
    owner = request.json.get("owner", "")

    cb = request.couch.open_bucket('events')
    event_id = str(uuid.uuid4())
    print('created new UUID", id', event_id)
    cb.insert(
        event_id,
        {
            'name': name,
            'interests': interests,
            'owner': owner
        }
    )

    # Your Account SID from twilio.com/console
    account_sid = "AC2a6a0095f3929a5df982100476d51529"
    # Your Auth Token from twilio.com/console
    auth_token  = os.environ['TWILIO_AUTH_TOKEN']

    client = Client(account_sid, auth_token)
    query_string = (
        "SELECT meta(`users`).id, *  FROM `users`"
    )
    query = N1QLQuery(query_string)
    cb = request.couch.open_bucket('users')

    for row in cb.n1ql_query(query):
        user = row['users']
        if 'phone_number' in user and user['phone_number'] != "":
            message = client.messages.create(
                to="+1" + user['phone_number'],
                from_="+14234558985",
                body="New volunteer opportunity available! https://brigaid.ngrok.io/events"
            )

            print(message.sid)

    return {
        "success": True,
        "id": event_id,
    }