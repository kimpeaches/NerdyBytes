from fastapi.testclient import TestClient
from queries.deck import DeckRepository
from main import app
from typing import Union
from queries.deck import DeckOut, Error
from authenticator import authenticator


client = TestClient(app)


class MockDeckRepository:
    def get_one(self, id: int) -> Union[DeckOut, Error]:
        return DeckOut(
            id=1,
            user_id=1,
            name="Ninja's and Dino-nuggets",
            public_status=False,
            study_count=0,
            total_cards=0,
        )


def mock_get_current_account_data():
    return {
        "id": 1,
        "username": "method_man",
        "picture_url": "https://wu-tang.com/picture.jpg",
    }


def test_get_one_deck():
    # overides the authenication function to return a mock user
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = mock_get_current_account_data
    # overides the deck repository to return a mock deck
    app.dependency_overrides[DeckRepository] = MockDeckRepository

    # creates a mock token
    headers = {"Authorization": "Bearer mock_token"}
    # sends a request to the endpoint with the mock token
    response = client.get("/api/1/deck/1", headers=headers)

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "user_id": 1,
        "name": "Ninja's and Dino-nuggets",
        "public_status": False,
        "study_count": 0,
        "total_cards": 0,
    }
    app.dependency_overrides = {}
