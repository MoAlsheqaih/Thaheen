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

> As of milestone 4, only the front-end has been implemented.

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
> Alternatively, you can access our live deployment of the latest commit at https://thaheen.vercel.app.

## Usage Instructions
1. All pages should be front-end functional, however, since there is no back-end and login functionality at the moment, these pages cannot be accessed from the website without manually entering the URLs:
<br>
**User Dasboard:** http://localhost:3000/user OR https://thaheen.vercel.app/user
<br>
**Admin Dashboard:** http://localhost:3000/admin OR https://thaheen.vercel.app/admin

2. In order to view the OTP verification modal, use these fake credentials:
<br>
**Email:** user@example.com
<br>
**Password:** 123456

3. The only chapter with questions to view the design is **SWE316 / Introduction to Design** which can be found at http://localhost:3000/course/1/chapter/1 OR https://thaheen.vercel.app/course/1/chapter/1

## Team Members

- Mohammed Al Sheqaih
- Abdulrahman Ammar
- Riyadh Alkhudhayri
- Usama Bakkar
- Naif Alenazi
