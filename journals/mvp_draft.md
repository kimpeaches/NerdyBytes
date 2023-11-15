# MVP

1. User Account Management
   - New User Sign Up:
     - Users can create a new account.
     - Usernames must be unique, with an error message for duplicates.
   - Previous User Login:
     - Users must provide correct credentials, with error messages for incorrect entries.
   - Account Logout:
     - Users can log out of their accounts.
2. Dashboard Features for Logged-in Users
   - Edit User Information:
     - Users can modify their personal information such as name, and profile picture.
   - Calendar View for Daily Streaks:
     - Users can view a calendar showing their daily activity streaks.
   - Deck Management:
     - Users can view, search, and manage their decks.
   - Profile Customization:
     - Users can change their profile pictures.
3. Chat Functionality
   - Global Access to Chat:
     - Users can access the chat function from any page.
   - Adding Users to Chat:
     - Users can add others by username. Discuss implementation strategies, starting with polling and potentially progressing to websockets.
4. Deck Page and Study Session
   - Initiate Study Session:
     - Users can start a study session from the deck page. (This takes you to the to card drilling to study)
   - Interactive Study Features:
     - A button to show a random card.
     - Display of question, possible answers, input for response, and submit button on the card page.
     - Reveal the correct answer upon submission.
     - Option to restart the study session after completing all cards.
     - View daily study progress and number of cards studied.
     - Create, browse, and manage individual cards.
     - Option to delete decks.
5. Public Decks
   - Viewing and Importing Public Decks:
     - Users can view and import public decks into their profiles.
     - Users’ own public decks are viewable to others.
6. Card Management
   - User can edit cards.
   - User can discard cards.

## Stretch Goals:

- Push notifications for mobile.
- Dark mode implementation.
- Ranking system among friends.
- Deck average grade feature.
- Space repetition system.
- Export feature for decks
