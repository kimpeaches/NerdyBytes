from fastapi.testclient import TestClient
from queries.dates import DatesRepository, DatesOut, Error
from main import app
from typing import List, Union
from authenticator import authenticator

client = TestClient(app)


class MockDatesRepository:
    def get_all(self) -> Union[List[DatesOut], Error]:
        return [
            DatesOut(
                id=1,
                user_id=1,
                date="2023-12-07",
                studied_today=False,
            )
        ]


def mock_get_current_account_data():
    return {
        "id": 1,
        "username": "Harold",
        "picture_url": "https://face.com",
    }


def test_get_user_by_id():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = mock_get_current_account_data
    app.dependency_overrides[DatesRepository] = MockDatesRepository

    headers = {"Authorization": "Bearer mock_token"}
    response = client.get("/api/1/dates/", headers=headers)

    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 1,
            "user_id": 1,
            "date": "2023-12-07",
            "studied_today": False,
        }
    ]
    app.dependency_overrides = {}
