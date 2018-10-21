import os
from passlib.hash import argon2


def hash_password(password):
    return argon2.hash(password)


def verify_password(hashed_password, guessed_password):
    return argon2.verify(guessed_password, hashed_password)
