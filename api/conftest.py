import pytest
from webtest import TestApp


@pytest.fixture
def app(request):
    from brigaid.core import main
    return TestApp(main())