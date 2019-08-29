# LeadAssist
 LeadAssist is an open UI designed for CS:GO team leaders.
 Fully compatible with phone screens, it shows all the necessary real-time statistics of players in the team.
 It may be used to analyse a round or a game.
 
___
## Installation

 1. Download the file ``gamestate_integration_leadassist.cfg``
 2. Place it in your cfg/ folder ``%steam%\steamapps\common\Counter-Strike Global Offensive\csgo\cfg``
 3. Do it for all members of your team
 4. Go to [leadassist.usp-3.fr](https://leadassist.usp-3.fr/)
 5. Launch the game
 6. Search and select your team
 7. Enjoy tryhard

## Developement
 
 1. Install dependencies for the two repositories `npm i && cd client/ && npm 1`
 2. Run server `npm run dev`, it will only be used to access to the API
 3. Run Vue DevServer `cd client/ && npm run serve` to have the website and hotrefresh
 4. Go to the devserver : `http://localhost:8080/`
 
 You can also use `vue ui` command.
 
### Build

 I take care of the build and deployment

___
## Problems

 If you have any problem, please create an issue [here](https://github.com/Mathieu2301/LeadAssist/issues).
 
## Todos

 The project development is in its first part. I would like to use machine learning to make it an economic assistant calculating the best purchasing issues (because the program has access to all the economic data of the team).
