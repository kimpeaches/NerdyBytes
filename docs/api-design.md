## User

- Methods: `POST`, `GET`, `PUT`, `DELETE`
- URLs: `/api/users/`, `/api/user/{id}`

### Schemas

#### Input

```json
{
  "username": "string",
  "password": "string",
  "picture_url": "string"
}
```

#### Output

```json
{
  "access_token": "string",
  "token_type": "Bearer",
  "account": {
    "id": 0,
    "username": "string",
    "picture_url": "string"
  }
}
```

## Deck

- Methods: `POST`, `GET`, `PUT`, `DELETE`
- URLs: `/api/deck`, `/api/deck/{id}`

### Schemas

#### Input

```json
{
  "user_id": 0,
  "name": "string",
  "public_status": false,
  "study_count": 0,
  "total_cards": 0
}
```

#### Output

```json
{
  "user_id": 0,
  "name": "string",
  "public_status": false,
  "study_count": 0,
  "total_cards": 0
}
```

## Card

- Methods: `POST`, `GET`, `PUT`, `DELETE`
- URLs: `/api/card`, `/api/card/{id}`

### Schemas

#### Input

```json
{
  "deck_id": 0,
  "question": "string",
  "wrong_count": 0,
  "right_count": 0,
  "flag": false
}
```

#### Output

```json
{
  "deck_id": 0,
  "question": "string",
  "wrong_count": 0,
  "right_count": 0,
  "flag": false
}
```

## Option

- Methods: `POST`, `GET`, `PUT`, `DELETE`
- URLs: `/api/option`, `/api/option/{id}`

### Schemas

#### Input

```json
{
  "card_id": 0,
  "possible_answer": "string",
  "is_correct": false
}
```

#### Output

```json
{
  "card_id": 0,
  "possible_answer": "string",
  "is_correct": false
}
```

## Dates

- Methods: `POST`, `GET`
- URLs: `/api/dates`

### Schemas

#### Input

```json
{
  "user_id": 0,
  "date": "2023-12-11",
  "studied_today": true
}
```

#### Output

```json
{
  "id": 0,
  "user_id": 0,
  "date": "2023-12-11",
  "studied_today": true
}
```

## Chat Rooms

- Methods: `POST`, `GET`, `PUT`, `DELETE`
- URLs: `/api/rooms`, `/api/rooms/{chat_room_id}`

### Schemas

#### Input

```json
{
  "user_id": 0,
  "name": "string",
  "messages": "string"
}
```

#### Output

```json
{
  "id": 0,
  "user_id": 0,
  "name": "string",
  "messages": "string",
  "created": "string"
}
```

## Chat Messages

- Methods: `POST`, `GET`
- URLs: `/api/messages`, `/api/rooms/{chat_room_id}/messages`

### Schemas

#### Input

```json
{
  "user_id": 0,
  "name": "string",
  "messages": "string"
}
```

#### Output

```json
{
  "id": 0,
  "user_id": 0,
  "name": "string",
  "messages": "string",
  "created": "string"
}
```
