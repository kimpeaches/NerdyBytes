# Nerdy-Bytes

---

- Jeff Balagosa
- Kim Reyes
- Jay Parfenchuck
- Harold Sy

Nerdy-Bytes - Unlock your potential one card at a time

## Design

---

- [API design]()
- [Data model]()
- [GHI]()
- [Integrations]()

## Intended market

---

Our main target base are students, teachers, anyone that wants to learn something.

## Functionality

---

- Visitors to the site can create custom made flash cards for what ever they are trying to
  learn.
- Users are able to create an account to access the functionality of the website
  - users can login and logout for security purposes to keep their accounts private
  - users can edit their profile customizing it they way they want
- Users are able to create a deck of cards to study a particular subject
  - decks can be named, you can edit, delete, share, view, or set deck to private
  - decks keep track of the amount of cards they hold.
- Users are able to create a card for each deck
  - cards have questions, answers, and optional answers.
  - cards can be edited, deleted, and viewed.
- Users can chat with other users
  - users can have chat rooms where they can message other users.

## Project Initialization

---

To utilize this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run docker volume create postgres-data
4. Run docker compose build
5. Run docker compose up
