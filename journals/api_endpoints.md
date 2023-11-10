# API Endpoints

## Log in

- Endpoint path: /login
- Endpoint method: POST

- Request shape (form):

  - username: string
  - password: string

- Response: Account information and a token
- Response shape (JSON):
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
- Response shape (JSON):
  ```json
  true
  ```

## Chat Component

- Endpoint path: /api/chat/{:id}
- Endpoint method: GET, POST\*

### Description

- Allows user to chat with other users.

### Response Shape (JSON):

```JSON
{
    "TBD:" TBD
}
```

## Dashboard

- Endpoint path: /api/dashboad
- Endpoint method: GET, PUT (Update Profile Pic)

### Description

- Allows user to view decks available to study.
- Allows user to view/edit profile picture.
- Allows user to view calendar of study streak (in days).

### Response Shape (JSON):

```JSON
{
    "TBD:" TBD
}
```

## Practice Page

- Endpoint path: /api/study/{:id}
- Endpoint method: GET, PUT (Update Profile Pic)

### Description

- Allows user to answer random cards.
- Allows user to check if they got it right or wrong.

### Response Shape (JSON):

```JSON
{
    "TBD:" TBD
}
```

## Deck View Page

- Endpoint path: /api/deck
- Endpoint method: GET, DELETE

### Description

- Allows user to view details of a particular deck.
- Allows user to view how many cards in deck.
- Allows user to view how many cards studied today.
- Allows user to delete a deck.

### Response Shape (JSON):

```JSON
{
    "TBD:" TBD
}
```

## Browse Deck View Page

- Endpoint path: /api/deck
- Endpoint method: GET

### Description

- TBD

### Response Shape (JSON):

```JSON
{
    "TBD:" TBD
}
```

## Card View Page

- Endpoint path: /api/card/{:id}
- Endpoint method: GET

### Description

- TBD

### Response Shape (JSON):

```JSON
{
    "TBD:" TBD
}
```

## Card Edit Page

- Endpoint path: /api/card/edit/{:id}
- Endpoint method: GET

### Description

- TBD

### Response Shape (JSON):

```JSON
{
    "TBD:" TBD
}
```

## Public Decks List View Page

- Endpoint path: /api/card/edit/{:id}
- Endpoint method: GET

### Description

- TBD

### Response Shape (JSON):

```JSON
{
    "TBD:" TBD
}
```

## Create Card Page

- Endpoint path: /api/card/create
- Endpoint method: POST

### Description

- TBD

### Response Shape (JSON):

```JSON
{
    "TBD:" TBD
}
```
