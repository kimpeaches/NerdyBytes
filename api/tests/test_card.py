from fastapi.testclient import TestClient
from queries.card import CardRepository
from main import app
from typing import Union
from queries.card import CardOut, Error
from authenticator import authenticator

client = TestClient(app)


class MockCardRepository:
    def get_one(self, id: int) -> Union[CardOut, Error]:
        return CardOut(
            id=1,
            deck_id=1,
            question="What's 5+5",
            wrong_count=0,
            right_count=0,
            flag=False,
        )


def mock_get_current_account_data():
    return {
        "id": 1,
        "username": "jay",
        "picture_url": "https://string.com",
    }


def test_get_one_card():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = mock_get_current_account_data
    app.dependency_overrides[CardRepository] = MockCardRepository

    headers = {"Authorization": "Bearer mock_token"}
    response = client.get("/api/card/1", headers=headers)

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "deck_id": 1,
        "question": "What's 5+5",
        "wrong_count": 0,
        "right_count": 0,
        "flag": False,
    }
    app.dependency_overrides = {}
