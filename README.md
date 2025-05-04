# Thaheen
## Description
*Thaheen* is an interactive question-generation and gamified learning system to enhance university students' academic performance. The platform aims to solve a common problem that most students face: lack of practice questions in core courses. 
Additionally, it introduces a gamification aspect to the idea by adding events similar to Kahoot!, which could make studying a fun experience. This problem is worth solving as we face it every semester and have found, through a survey and personal interviews, 
that so do other students.

> **UI Design**: https://www.figma.com/design/rZIB6vp0Wnhnrg7UIujsGG/Thaheen.com?node-id=0-1&t=ndxsxZxhVPzdhFBr-1 <br>Please note that this design is optional and acts only as a guide during implemenetation.<br>Completely done by Abdulrahman Ammar and Riyadh Alkhudhayri.

### User Categories

**Admin**: Responsible for managing the platform in terms of users and settings. 
Regulates the website and its services based on his/her knowledge and 
different statistics provided through a custom dashboard.

**Question Master (QM)**: Also known as the “Content Moderator”, he/she is 
responsible for maintaining the quality of the questions, checking feedback 
and ratings, adding questions, and refining existing questions in the database.

**Regular User (RU, e.g. Student)**: Can access all questions on the website 
based on the course and lesson, provide feedback and rate questions, create 
activities, and participate in leaderboards.

**Guest (not a role, just an exclusion of all three primary roles)**: Can create an 
account and browse the website and its questions, but cannot create or join 
activities, interact with questions, and participate in leaderboards.

## Setup and Installation Instructions

### Frontend

1. Go to the front-end folder
```bash
cd frontend
```

2. Install required packages and dependencies
```bash
npm install
```

3. Run the front-end server
```bash
npm start
```

4. Access the website at http://localhost:3000.

### Backend

1. Go to the back-end folder
```bash
cd backend
```

2. Install required packages and dependencies
```bash
npm install
```

3. Run the front-end server
```bash
node server.js
```

4. Check note about PORT in next section.

### Environment Variables
frontend/.env
```env
REACT_APP_API_URL=<the URL of the backend>
```

backend/.env
```env
DB_URI=<mongo database uri>

OPENAI_API_KEY=<key from https://platform.openai.com/ for AI questions>
RESEND_API_KEY=<key from https://resend.com/ for OTPs>

JWT_SECRET=<secret for signing and unsigning JWT tokens>

PORT=<if not mentioned, default is 3000>
```

> Alternatively, you can access our live deployment of the latest commit at https://thaheen.vercel.app.
> We recommend running the project locally as Vercel's backend is extremely slow and times out a lot. For ENV variables, you may contact us for ours or use your own.


## Usage Instructions
All pages should be functional.

### Test Users (DO NOT DELETE THESE):
**Email:** admin@thaheen.com
<br />
**Password:** Thaheen!2025
<br />
**OTP:** Use anything, the system will not send OTPs to test accounts.

**Email:** master@thaheen.com
<br />
**Password:** Thaheen!2025
<br />
**OTP:** Use anything, the system will not send OTPs to test accounts.


**Email:** rgu1@thaheen.com
<br />
**Password:** Thaheen!2025
<br />
**OTP:** Use anything, the system will not send OTPs to test accounts.


**Email:** rgu2@thaheen.com
<br />
**Password:** Thaheen!2025
<br />
**OTP:** Use anything, the system will not send OTPs to test accounts.

### OTP
OTPs arrive from the email address thaheen@uaab.dev so make sure it's unblocked. You may need to check junk or spam folders.

The only chapter with questions to view the design is **SWE316 / Introduction to Design** which can be found at http://localhost:3000/course/1/chapter/1 OR https://thaheen.vercel.app/course/1/chapter/1

## API Documentation
The API contains a lot of routes which manage courses, chapters, questions, users, user progress, authentication, and leaderboard.

### Status codes
200: OK\
201: Resource created\
204: Resource deleted
401: Unauthorized (some routes are restricted to Question Master and Admin)\
404: Not Found\
500: Internal Server Error (this could occur due to rate-limiting from MongoDB Atlas or Vercel)

### Routes
The frontend will almost always send the token in the header `x-auth-token` if available.

/api/admin&ensp;&ensp;restricted to admin only\
&ensp;&ensp;GET /users (get all users)\
&ensp;&ensp;DELETE /users/:userId (delete a user)\
&ensp;&ensp;PUT /users/:userId/role (change a user's role, body `{role: "regular" | "master"}`)\
&ensp;&ensp;GET /statistics (get statistics; number of courses/users/questions)\
&ensp;&ensp;GET /most-active (get most active 4 users based on total points)

/api/auth\
&ensp;&ensp;POST /register (create a user, body `{email, password, firstName, lastName}`)\
&ensp;&ensp;POST /login (login and receive OTP, body `{email, password}`)\
&ensp;&ensp;POST /verify-otp (verify OTP, body `{email, otp}`)\
&ensp;&ensp;GET /status (get user's role)

/api/generate&ensp;&ensp;restricted to QM/admin only\
&ensp;&ensp;POST /:courseId/:chapterId (generates an AI question, body `{relevantInfo}`)

/api/courses&ensp;&ensp;POST/PUT/DELETE restricted to QM/admin only\
&ensp;&ensp;GET / (gets all courses)\
&ensp;&ensp;GET /:id (gets a specific course)\
&ensp;&ensp;POST / (creates a course, body `{code, name}`)\
&ensp;&ensp;POST /:id/chapters (creates a chapter in course, body `{name}`)\
&ensp;&ensp;DELETE /:id/chapters/:chapterId (deletes a chapter)\
&ensp;&ensp;DELETE /:id (deletes a course)\
&ensp;&ensp;POST /:id/chapters/:chapterId/questions (adds a question to chapter, body `{type, question, options, correctOption, explanation, difficulty}`)\
&ensp;&ensp;PUT /:id/chapters/:chapterId/questions/:questionId (updates a question, body `{text, options, correctOption, explanation, difficulty}`)\
&ensp;&ensp;DELETE /:id/chapters/:chapterId/questions/:questionId (deletes a question from a chapter)

/api/leaderboard&ensp;&ensp;requires login\
&ensp;&ensp;GET / (retrieves all leaderboard data)

/api/progress&ensp;&ensp;requires login\
&ensp;&ensp;GET / (gets user progress in all questions)\
&ensp;&ensp;PUT / (sets user progress in all questions, body `{progress}`)


## Team Members

- Mohammed Al Sheqaih
- Abdulrahman Ammar
- Riyadh Alkhudhayri
- Usama Bakkar
- Naif Alenazi
