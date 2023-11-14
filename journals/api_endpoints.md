# API Endpoints

## Log in

- Endpoint path: /login
- Endpoint method: POST

- Request shape (form):

  - username: string
  - password: string

- Response: Account information and a token
- JSON Shape
  ```json
  {
    "account": {
      «key»: type»,
    },
    "token": string
  }
  ```

## Log out

- Endpoint path: /logout
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Always true
- JSON Shape
  ```json
  true
  ```

## List Decks

- Endpoint path: /api/decks/
- Endpoint method: GET

### Description

This will be the Deck api list view for the JSON we can utilize on the front end.

### JSON Shape

Output:

```JSON
{
  "decks": [
    {
    "id": int,
    "name": str,
    "public_status": bool,
    "total_cards": int,
    "total_touched_cards": int,
  },
  {
    "id": int,
    "name": str,
    "public_status": bool,
    "total_cards": int,
    "total_touched_cards": int,
  },
  ]
}
```

## Show Deck

- Endpoint path: /api/decks/{:id}
- Endpoint method: GET

### Description

This will be the Deck api view for the JSON we can utilize on the front end.

### JSON Shape

Output:

```JSON
{
    "name": str,
    "public_status": bool,
    "total_cards": int,
    "total_touched_cards": int,
}
```

## Delete Deck

- Endpoint path: /api/decks/{:id}
- Endpoint method: DELETE

### Description

This will be the delete method api for each card deck.

### JSON Shape

Input:

Not needed. Id will be in the href/url of the DELETE request.

Output:

```JSON
{
  "deleted": bool
}
```

## Create Deck

- Endpoint path: /api/decks/
- Endpoint method: POST

### Description

This will be the create method api for each card deck.

### JSON Shape

Input:

```JSON
{
  "name": str,
  "public_status": bool (default=false),
}
```

Output:

```JSON
{
  "id": int,
  "name": str,
  "public_status": bool,
}
```

## Update Deck

- Endpoint path: /api/decks/{:id}
- Endpoint method: PUT

### Description

This will be the udpate method api for each card deck.

### JSON Shape

Input:

```JSON
{
  "name": str,
  "public_status": bool,
}
```

Output:

```JSON
{
  "id": int,
  "name": str,
  "public_status": bool,
}
```

## List Cards

- Endpoint path: /api/cards/
- Endpoint method: GET

### Description

- Api view to show a list of cards.
- Api returns all cards with the deck id it belongs to, so we can filter on the front end.

### JSON Shape

```JSON
{ "cards": [
  {
    "id": int,
      "deck_id": int,
      "card_type": multiple_choice/reorder/matching,
      "flag": bool,
  },
    {
    "id": int,
      "deck_id": int,
      "card_type": multiple_choice/reorder/matching,
      "flag": bool,
  },
]
}
```

## Show Card

- Endpoint path: /api/cards/{:id}
- Endpoint method: GET

### Description

- Api view to show card details.

### JSON Shape

```JSON
{
    "id": int,
    "deck_id": int,
    "card_type": multiple_choice/reorder/matching,
    "question": str,
    "wrong_count": int,
    "right_count": int,
    "flag": bool
}
```

## Create Card

- Endpoint path: /api/cards/
- Endpoint method: PUT

### Description

- Api view to create a new card.

### JSON Shape

Input:

```JSON
{
    "deck_id": int,
    "card_type": multiple_choice/reorder/matching,
    "question": str
}
```

Output:

```JSON
{
    "id": int,
    "deck_id": int,
    "card_type": multiple_choice/reorder/matching,
    "question": str,
    "wrong_count": int,
    "right_count": int,
    "flag": bool
}
```

## Update Card

- Endpoint path: /api/cards/{:id}
- Endpoint method: PUT

### Description

- Api view to update an existing card.

### JSON Shape

Input:

```JSON
{
    "deck_id": int,
    "question": str,
    "flag": bool
}
```

Output:

```JSON
{
    "id": int,
    "deck_id": int,
    "card_type": multiple_choice/reorder/matching,
    "question": str,
    "wrong_count": int,
    "right_count": int,
    "flag": bool
}
```

## Delete Card

- Endpoint path: /api/cards/{:id}
- Endpoint method: PUT

### Description

- Api view to update an existing card.

### JSON Shape

Input:

Not needed. Id will be in the href/url of the DELETE request.

Output:

```JSON
{
  "deleted": bool
}
```

## List Answers

- Endpoint path: /api/answer/{:id}
- Endpoint method: GET

### Description

- Api view to list answers for each card.
- Api returns all answers with the card id it belongs to, so we can filter on the front end.

### JSON Shape

Input:

Not needed. Id will be in the href/url of the DELETE request.

Output:

```JSON
{
  answer: [
    {
      "id": int,
      "card_id": int,
      "text": str,
      "is_correct": bool
    },
    {
      "id": int,
      "card_id": int,
      "text": str,
      "is_correct": bool
    },
  ]
}

```

## Show Answer

- Endpoint path: /api/answer/{:id}
- Endpoint method: PUT

### Description

- Api view to show answer.

### JSON Shape

Input:

Not needed. Id will be in the href/url of the DELETE request.

Output:

```JSON
{
  "id": int,
  "card_id": int,
  "text": str,
  "is_correct": bool
}
```

## Delete Answer

- Endpoint path:
- Endpoint method:

### Description

### JSON Shape

## Update Answer

- Endpoint path:
- Endpoint method:

### Description

### JSON Shape

## List Dates

- Endpoint path:
- Endpoint method:

### Description

### JSON Shape

## View User

- Endpoint path:
- Endpoint method:

### Description

### JSON Shape

## Create User

- Endpoint path:
- Endpoint method:

### Description

### JSON Shape

## Update User

- Endpoint path:
- Endpoint method:

### Description

### JSON Shape

## List Chat Rooms

- Endpoint path:
- Endpoint method:

### Description

### JSON Shape

## View Chat Room

- Endpoint path:
- Endpoint method:

### Description

### JSON Shape

## Create Chat Room

- Endpoint path:
- Endpoint method:

### Description

### JSON Shape

## Delete Chat Room

- Endpoint path:
- Endpoint method:

### Description

### JSON Shape

## Create Message

- Endpoint path:
- Endpoint method:

### Description

### JSON Shape

## View Message

- Endpoint path:
- Endpoint method:

### Description

### JSON Shape
