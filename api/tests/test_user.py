from fastapi.testclient import TestClient
from main import app
from typing import Union
from queries.user import UserOutWithPassword, UserRepository, Error
from authenticator import authenticator


client = TestClient(app)


class MockUserRepository:
    def get_user_by_id(self, id: int) -> Union[UserOutWithPassword, Error]:
        return UserOutWithPassword(
            id=3,
            picture_url="pic.com",
            username="kim",
            hashed_password="asdfghjkloiuytrewq",
        )


def mock_get_current_account_data():
    return {
        "id": 3,
        "username": "kim",
        "picture_url": "pic.com",
    }


def test_get_user_by_id():
    # overides the authenication function to return a mock user
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = mock_get_current_account_data
    # overides the deck repository to return a mock deck
    app.dependency_overrides[UserRepository] = MockUserRepository

    # creates a mock token
    headers = {"Authorization": "Bearer mock_token"}
    # sends a request to the endpoint with the mock token
    response = client.get("/api/user/1", headers=headers)

    assert response.status_code == 200
    assert response.json() == {
        "id": 3,
        "picture_url": "pic.com",
        "username": "kim",
    }
    app.dependency_overrides = {}
