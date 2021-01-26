# What is timetabler

**Timetabeler** is a basic discord bot which I made in just under one day so dont expect any of the code to be neat. It is designed to help my and some friends out with all of the crazyness arround online learning, it essential is a node-cron schedular which will notify you  when your next lesson is arround one minuete in advance.

## Overview

**FYI:** I will not be providing any LTS to this project it is just a quick fix to amke my life and some other peoples lives easier. However if for some reason you want to run it and give it a go I will provide some briefe instructions on how to run the program.

 1. You will neeed a bot token which if you do not know how to obtain you can look [here](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token).
 2. Once you have your bot token copied please navigate to the config file and paste it inbetween the config bit. It will look something a little like this. 
 > token:  'your-token-here',
 3. Once your bot token is in place make sure that you have node installed, if you dont you can find an installer [here](https://nodejs.org/en/download/package-manager/).
 4. Once you have all that installed run
 > npm i dateformat discord.js better-sqlite3 node-cron
5. Then all you should have to do is ``node .``

And yea thats about it any other questions email me :D
