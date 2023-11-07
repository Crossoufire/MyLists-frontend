# React Frontend for MyLists
This react app is the frontend of the [MyLists](https://mylists.info) website. It is a nice and clear interface to list all the series, anime, movies, games and books you've watched/read/played. 
It regroups the functionalities of different site in one. It integrates statistics like: watched time, comments, favorites and more. You can follow people, see their lists and compare it to yours.

This project was bootstrapped with the [Create React App](https://github.com/facebook/create-react-app).

The API backend [mylists-api](https://github.com/facebook/create-react-app) is also on github.

# Installation (Linux)

## Instalation of Node.js
- Download and install Node.JS
  - For a Raspberry Py: [Rasp](https://pimylifeup.com/raspberry-pi-nodejs/) 
  - For Ubuntu/Linux: [Ubuntu](https://deb.nodesource.com/)

## Clone repo and install requirements
- Clone this repo using: `git clone https://github.com/Crossoufire/react-my-lists.git`
- Go into the folder: `cd react-my-lists` 
- Install the requirements using `npm install`

## Create the .env file
- Create a `.env.development` for development:
```
REACT_APP_BASE_API_URL=http://127.0.0.1:5000
REACT_APP_REGISTER_CALLBACK=http://localhost:3000/register_token
REACT_APP_RESET_PASSWORD_CALLBACK=http://localhost:3000/reset_password
```

## Dev mode
To start the app in dev mode: `npm start`
Open [http://localhost:3000](http://localhost:3000) to view it in your browser
