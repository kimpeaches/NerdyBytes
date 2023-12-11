# Monolithic System Data Models

This document outlines the data models for our monolithic application, where all components are interconnected and part of a single unified system. The models include User, Chat Room, Messages, Deck, and Card, each integral to the system's functionality.

## User Entity

---

The `User` entity represents the individual users of the system, holding their personal and authentication details.

| Name     | Type        | Unique | Optional | Description               |
| -------- | ----------- | ------ | -------- | ------------------------- |
| picture  | string      | no     | no       | URL of the user's picture |
| username | string      | yes    | no       | User's unique identifier  |
| password | string      | no     | no       | User's password           |
| decks    | foreign key | no     | yes      | References to Decks       |
| metrics  | foreign key | no     | yes      | References to Metrics     |

## Chat Room Entity

---

The `Chat Room` entity encapsulates the information about the chat rooms available in the system, including the users participating and the messages exchanged.

| Name     | Type        | Unique | Optional | Description            |
| -------- | ----------- | ------ | -------- | ---------------------- |
| users    | list        | no     | no       | List of users          |
| name     | string      | no     | no       | Name of the chat room  |
| messages | foreign key | no     | yes      | References to Messages |

## Messages Entity

---

The `Messages` entity stores the details of the messages exchanged in the chat rooms, linking back to the users and the specific chat room.

| Name         | Type        | Unique | Optional | Description                  |
| ------------ | ----------- | ------ | -------- | ---------------------------- |
| text         | string      | no     | no       | Content of the message       |
| created      | datetime    | no     | no       | Creation time of the message |
| username     | foreign key | no     | no       | User who created the message |
| chat_room_id | foreign key | no     | no       | Reference to Chat Room       |

## Deck Entity

---

The `Deck` entity describes the collection of cards, each deck identified by its unique name and the collection of cards it contains.

| Name  | Type        | Unique | Optional | Description         |
| ----- | ----------- | ------ | -------- | ------------------- |
| cards | foreign key | no     | yes      | References to Cards |
| name  | string      | no     | no       | Name of the deck    |

## Card Entity

---

The `Card` entity represents individual cards within a deck, detailing the type, question, and answers associated with each card.

| Name            | Type   | Unique | Optional | Description                     |
| --------------- | ------ | ------ | -------- | ------------------------------- |
| type            | string | no     | no       | Type of the card                |
| question        | string | no     | no       | The question on the card        |
| possible_answer | string | no     | yes      | Possible answer to the question |
| actual_answer   | string | no     | no       | Actual answer to the question   |
