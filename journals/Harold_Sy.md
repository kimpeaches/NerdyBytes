## Nov 13, 2023

Today, I worked on:

- finish up our end-points which showed the path, and
  CRUD method we were using. We also showed the Shape of
  the input and the shape of the output. I worked on Update
  User and List Dates. We were getting it prepared for a
  presentation tomorrow.

## Nov 14, 2023

Today, I worked on:

- Getting my docker up and running and starting my journal.
  I also did a merge request for a team mate's journal entry
  update. Committed and pushed by journal update.

## Nov 15, 2023

Today, I was out:

- I had to take some time off because I had to take my wife to
  emergency and did not get home until 3 PM on Nov 15, 2023

## Nov 16, 2023

Today, I worked on:

- Our first end-point which is the user sign up. We performed a
  mob programming session on this and got it working by the end
  of the class day. A merge request was made and Kim performed
  the merge request.

## Nov 17, 2023

Today, I worked on:

With the team we did a mob programming session on authorization
which Kim was working on and figured it out after some great
detective work!

## Nov 22, 2023

Today, I grabbed issue 29 to create a backend for show a deck to
work over the break. I finished the end over the break but had some
trouble with getting the correct data to come up because I did not
want to change the model because I was afraid that it may affect
someone's code. Jeff explained everything to me so I changed the
code and there was a pipeline issue with linter that did not like
the import of Options into the code and it not being used so I fixed
it and my backend was merged.

## Nov 27, 2023

Today, I grabbed issue for creating an end point for updating a deck.
will try to be done with this today. hopefully. Also I need to fill out my
journal for merging today. Oh, I finished the end point and sent a merge
request at the end of the day.

## Nov 28, 2023

Today, we tried to checkout how to create a unit test for an end point
but it seemed a little complicated. Grabbed a new issue for create an
end point for list decks. Will try to finish it today by end of day. I
need to study for the practice test!

## Nov 29, 2023

Today, I worked on creating a date table. I completed it but for some
reason it came up in another branch so we just cancelled the merge for it.
Also completed end point for update a deck. Grabbed some work for update
a card.

## Nov 30, 2023

Today, I worked on creating an endpoint to update a card. While running
tests on my card I noticed that when a user was not logged in that we were
getting a 500 server error. I asked about that and the team wanted a better
error than 500 to fix the issue in the front end so I created an issue for it.
Also noticed that when we list all decks that the deck name was comming backend
as "0" and not the name of the deck. Also noticed that when the decks are listed
the card count was not updated. Created an issue for both of these as well.
Grabbed the issue to fix the missing deck name when we get all of the decks.

## Dec 01, 2023

Today, I finally finished fixing the issue with the deck name not coming out when
all decks are listed. Sent a merge request to Jay for that one, # 55-fix-get-all-decks-missing-deck-name.
Grabbed another issue to create an #49-end-point-for-list-dates. Finished list date end point.
Had some interesting issues that really openned my eyes! I was also having an issue with the
fact that we had not created an end point to enter in data into the table for me to checkout
this back-end. Jeff suggested I use SQL to put data into the table so I can run my test. I did not
know how to do that at all so I checked on line and altered some SQL on beekeeper and was able to
get some data in. Really Cool! I tried sending a merge request on this back-end #49 but am still
having trouble with git. I was behind by some commits but I was not seeing this on my screen. I really
took my time to navigate around to see if I can get the correct screen to view but I just could not see
it. Will talk to Jeff about it on Monday so I don't have to hunt around for the correct screen.

## Dec 04, 2023

Today, I created an issue for creating a frontend signup and I assigned it to myself. Still working
on it at the end of the day. Also did two merge requests for Kim and Jeff.

## Dec 05, 2023

Today, I am still working on the createing a frontend signup. Will get help from Jeff and the team
If I can't figure it out.

Ok, got part of the frontend signup working. I am able to get to it from the frontend and enter
a new user and sign up with a password. I even got the password to be verified with a not match
message showing if the password did not match. For some unknown reason I am not getting a token
and this could be because the new user information is not being saved on the backend. Somehow,
after testing for quite a while I got a new user to save but since the page was not logging me
in I ended up changing the code to something that is not saveing the user again and not getting
a token. Jeff is helping me with the issues. Did a merge request for Jeff and Kim today.

## Dec 06, 2023

Today, Jeff and I were going over the signup code for the front end. I was having isssues with
some merge conflicts and for some reason I cannot get into localhost:3000 to test out the code.
Trying to work through the issue. Also did a merge request for Jeff twice today.

## Dec 07, 2023

Created an issue for a backend unit test and assigned it to myself. It is for get all dates.
I worked on this all of today as I was having technical issues with my computer. I attempted
to do a merge request for Jeff but my front end kept coming up with errors. To test to see if
it was my computer or his code he asked another team member, Kim, to test out his code. It
worked on her computer so she completed the merge request. After that my docker started
showing error messages in fastapi. I attempted to drop and rebuild the tables twice and
even uninstalled some programs that I thought might be causing the problems. After a while I
informed the team that I was going to post a help me understand message to get some help.
Jeff told me that I should try shutting down my computer and rebooting everything. I did and
the issue cleared up. I finally finished the unit test and will ask someone to merge it
tomorrow.

## Dec 08, 2023

Today I worked on delete card for card list in the front end. It took a while and I got stuck
on the routing. Jeff wanted to make the routing simpler so while he was showing me how it works
and trouble shooting the code we changed the routing for the backend. Started issue 100 delete
a deck from the front end.

## Dec 09, 2023

Today worked on and completed issue 100 delete a deck from the front end. Jeff did my merge request
and I completed a merge request for him.

## Dec 11, 2023

Today worked on edit a user profile and worked on and completed the Readme.md main page.
