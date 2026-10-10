## **GAME REV!! - Video Game Reviewing Web App ((IN PROGRESS))**

A full-stack video game reviewing platform built with JavaScript, Node.js, Express and the IGDB API. This is a personal project that combines my passion for video games with my journey into full-stack development. I am building this project step-by-step as a way to teach myself full-stack development.

The goal of GameRev is to create a platform where users can track the games they've played, write reviews, see recommendations from friends, and overall create a platform for all game lovers.

*!! Information below only includes what has already been implemented on the web app !!*

## Tech Stack:
- HTML
- CSS
- JavaScript
- Node.js
- Express
- IGDB API

## Features:
**Home Page**
- Responsive Navigation bar
- Real-time ticking clock
- Clean, well-themed user-interface for future expansion
- Scrollable sections for 'Trending' and 'Trending with friends'

**Games Page**
- Fully Functional search bar connected to IGDB
- Displays game covers and game names based on the user queries
- 'load more' button for larger result sets
- Clickable results navigate user to the individual game pages

**Specific Game Pages**
- Dynamic pages generated when user selects a game
- Additional IGDB data loaded onto page
- Data such as summary, consoles, developer, producer, rating and release date is shown

**Server-side**
- Server.js built with Express and Node.js Handles IGDB authentication using OAuth securely
- Retrieves paginated game data based on search
- sends a POST request to IGDB and returns structured JSON to front-end, with page information
- Handles front-end routing for /home, /games, and /games/:id (id being the specific games id)

## Skills Gained:
- Implementing an API with Authentication (IGDB OAuth)
- Building backend architecture using Node.js + Express
- Basic Full-Stack concepts, connecting a front-end to a back-end
- Creating POST requests with custom IGDB query fields
- Parsed JSON responses for front-end use
- Error Handling for external API issues

## CURRENT NEXT STEPS:
- Add more game information on the individual game pages (e.g: further description, more images)
- Add a 'similar games' section on individual game pages
- Integrate data from IGDB into my own database for caching and faster retrieval
- Improve search result ordering using a library

## Further Future Steps:
- Create a secure account system
- User-generated reviews
- Friends list
- Game Completion tracking
- Personal game library

# How To Test:
1. Download/Clone this repository
2. Open folder in VS code
3. In the terminal type 'npx nodemon server.js'
4. Navigate to the URL stated in the terminal

## Demo:
**Main page**
---
|Navigation and Clock | Trending Games Section|
|---|---|
|<img width="1206" height="888" alt="image" src="https://github.com/user-attachments/assets/a7e87798-7da4-4431-8912-afe1975d5c94" />|<img width="1220" height="892" alt="image" src="https://github.com/user-attachments/assets/ffc25911-6e4a-42b2-bd13-d5096aa81c6c" />
---
**Game Page**
---
<img width="1280" height="688" alt="ezgif-3b028e568a19fc21" src="https://github.com/user-attachments/assets/ebed3d03-882b-4a0b-aa1f-b2f315877acf" />



---
Date Developed: June 2026 - Current Date
