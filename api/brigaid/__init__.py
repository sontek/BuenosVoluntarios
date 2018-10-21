from wsgiref.simple_server import make_server
from brigaid.core import main


if __name__ == '__main__':
    app = main()
    print("http://0.0.0.0:6543")
    server = make_server('0.0.0.0', 6543, app)
    server.serve_forever()