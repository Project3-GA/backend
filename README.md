# Image Board

## Description:

A community-based app where users can post and organize ideas about goals or interests. Users can also tag images and collections to share their interests.

## Deployment:

hatcrew-be.herokuapp.com/api/

## Technology Used:

MONGOOSE, MONGODB, MONGODB ATLAS

## Requirements:

npm i
mongoose
mongodb
express
cors

## Unsolved Problems

- Need to set up so certain actions are only permitted when user ID matches author ID (Delete IMGs & tags).
- Allow all users to add tags to images but ONLY image authors can delete tags (Currently, while other users can NOT delete, it gives error messages).
- EDIT: Resolved, got user ID from the token in backend and set up the user ID/author ID checks for tags and images. ✅

## Resources:

1. Create react App with : https://github.com/facebook/create-react-appneed
1. Setup so that users can’t be searched by email or password  
   https://stackoverflow.com/questions/12096262/how-to-protect-the-password-field-in-mongoose-mongodb-so-it-wont-return-in-a-qu

# Future Plans

## MVP

- Database is setup ✅
- Server can get all images, get single, add new, update and delete images ✅
- Users can sign up and login which will be saved to the database ✅
- Signup requests will send back authentication token that matches user ✅
- Tokens are stored in local storage ✅
- Login requests will send authentication token to user to access other pages ✅
- Access attempts without authentication token will be redirected to login signup page ✅
- Website displays navigation bar with access to home bar, login screen, and the gallery ✅
- Deploy database ✅

## Bronze:

- Set up API file for crud commands for code legibility ✅
- Attached author property to card on create ✅
- Make sure new created tags do not overwrite old tags ✅
-

## Silver:

1. Setup to allow user ID to be checked against author ID ✅
1. Setup collection of user created images to be displayed.

## Gold:

1. Voting system (to store votes by Unique user IDs)
