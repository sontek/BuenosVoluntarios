def update_interests(request):
    cb = request.couch.open_bucket('users')
    id = request.json['id']
    print("user ID", id)
    document = cb.get(id).value
    document['interests'] = request.json['interests']
    cb.upsert(id, document)
    del document['password']

    return {
        "success": True,
        "user": document,
    }