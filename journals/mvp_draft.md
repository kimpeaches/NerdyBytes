# MVP Draft

_with Rosheen's feedback_

`Good job! Make sure to prioritize everything after login because this is part of the auth grading. You have alot of MVP goals which is good! Just prioritize what you want to tackle first.
You do not have to finish everything in the MVP to get a 100 on the project, but I think you can accomplish most of it. We should discuss easy and hard implementation for some of your features too like messaging during your official design review.`

1. As a new user, I can login to access my profile. Or sign up to create a account. `Separate numbers/bullet points because the work required is different`
   a. As a new user, your username must be unique, or receive a error message. `good`
   b. As a previous user, you must type in the correct credentials or receive a error message. `good`
   c. As a user, you can logout of your account. `good`
2. As a logged-in user, I can access the dashboard.
   a. Within the dashboard, users can edit user information. `is this the logged in users info?`
   b. Within the dashboard, users can view the calendar to look at their daily streak. `good, but make sure to think about the UI. Maybe come up with a simple and complex one`
   c. Within the dashboard, users can view and search their decks. `good, but separate points`
   d. Within the dashboard, users can access the card decks to navigate to deck page. `good`
   e. Within the dashboard, users can change their profile picture. `good, but might be redundant with a.`
   f. Within the dashboard, users can search through their decks. `repeated in b., please remove it in b.`
3. As a logged-in user, I can access the chat function from any page.
   a. In the chat function, you can add another user by adding them by username. `good, but we should talk about implementation. You should aim to do polling and then look into websockets as a stretch goal`
4. As a logged-in user, from the the deck page, initiate a study session.
   a. On the deck page, there will be a clickable button to show a random card. `good`
   b. On the random card page, you will see the question with possible answers, inputs for your response, and a submit button. `good`
   c. On the random card page, when you click submit it will reveal the correct answer at the top of the page. `good`
   d. On the random card page, after cycling through all the cards, you can restart the study session. `good`
   e. On the deck page, you can view how many cards you have studied for the day. `good`
   f. On the deck page, you can create and browse through your cards. `good`
   g. On the deck page, you can initiate a study session. `what does this mean? is it just a timer?`
   h. On the deck page, you can delete a deck. `good`
5. As a logged-in user, you can see a list of public decks.
   a. On the public deck page, you can import a public deck into your profile to study. `cool feature! would this be other users decks? if so, you would need an export deck feature too. this might also be a stretch goal`
   b. On the public deck page, your public decks will be viewable `good`
6. As a logged-in user, you can edit and discard your cards. `good, but separate numbers because the work is separate`

   ## Stretch goals

   push notifications for mobile `good`
   dark mode `good, easier stretch goal in my opinion`
   ranking system with friends `good, but maybe you can get to this. It's doable, but you have alot in the mvp already`
   deck average grade `same as above`
   space repetition `good`
