# Monolithic System Data Models

This document outlines the data models for our monolithic application. Each entity, such as User, Chat Room, Messages, Deck, and Card, is integral to the system's functionality and has a unique identifier.

## User Entity

---

The `User` entity represents individual users with personal and authentication details.

| Name     | Type        | Unique | Optional | Description                |
| -------- | ----------- | ------ | -------- | -------------------------- |
| id       | int         | yes    | no       | Unique identifier for user |
| picture  | string      | no     | no       | URL of the user's picture  |
| username | string      | yes    | no       | User's unique username     |
| password | string      | no     | no       | User's password            |
| decks    | foreign key | no     | yes      | References to Decks        |
| metrics  | foreign key | no     | yes      | References to Metrics      |

## Chat Room Entity

---

The `Chat Room` entity encapsulates chat room details, including participating users and exchanged messages.

| Name     | Type        | Unique | Optional | Description                         |
| -------- | ----------- | ------ | -------- | ----------------------------------- |
| id       | int         | yes    | no       | Unique identifier for the chat room |
| users    | list        | no     | no       | List of users                       |
| name     | string      | no     | no       | Name of the chat room               |
| messages | foreign key | no     | yes      | References to Messages              |

## Messages Entity

---

The `Messages` entity stores message details exchanged in chat rooms, linking to users and chat rooms.

| Name         | Type        | Unique | Optional | Description                       |
| ------------ | ----------- | ------ | -------- | --------------------------------- |
| id           | int         | yes    | no       | Unique identifier for the message |
| text         | string      | no     | no       | Content of the message            |
| created      | datetime    | no     | no       | Creation time of the message      |
| username     | foreign key | no     | no       | User who created the message      |
| chat_room_id | foreign key | no     | no       | Reference to Chat Room            |

## Deck Entity

---

The `Deck` entity describes collections of cards, each identified by a unique name.

| Name  | Type        | Unique | Optional | Description                    |
| ----- | ----------- | ------ | -------- | ------------------------------ |
| id    | int         | yes    | no       | Unique identifier for the deck |
| cards | foreign key | no     | yes      | References to Cards            |
| name  | string      | no     | no       | Name of the deck               |

## Card Entity

---

The `Card` entity represents individual cards within a deck, detailing their type and associated questions and answers.

| Name            | Type   | Unique | Optional | Description                     |
| --------------- | ------ | ------ | -------- | ------------------------------- |
| id              | int    | yes    | no       | Unique identifier for the card  |
| type            | string | no     | no       | Type of the card                |
| question        | string | no     | no       | The question on the card        |
| possible_answer | string | no     | yes      | Possible answer to the question |
| actual_answer   | string | no     | no       | Actual answer to the question   |
