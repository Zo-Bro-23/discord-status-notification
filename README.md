# discord-status-notification

Get Discord notifications for when your friends are online!

![image](https://user-images.githubusercontent.com/62234360/225551303-6a671407-847b-4b01-b2d6-a7da703fc7b5.png)
![image](https://user-images.githubusercontent.com/62234360/225551415-7f8fd077-d687-4c74-bfc5-e93d11d5669b.png)

## Setup
- [Create a Discord bot](https://discordjs.guide/preparations/setting-up-a-bot-application.html#what-is-a-token-anyway) and [add it](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#creating-and-using-your-invite-link) to a server with all your friends.

- Create a `.env` file and edit the following parameters:

  - Your Discord bot token as `token`.
  - Your server ID as `guild`.
  - Your own Discord ID as `notificationUser`. You will receive status updates as Discord DMs.
  - Users to monitor can be added with environment variables titled `user1`, `user2`, `user3`, etc. The value should be the user's Discord ID (see [here](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) for more).
  - Use `legacy='true'` to get plaintext messages instead of the new Discord embed.

  ![image](https://user-images.githubusercontent.com/62234360/225538160-eaf1ccf1-dd59-4c31-a429-f5412c9b786b.png)

## Running
- Install dependencies with `npm install`.
- Start the application with `node index.js`.
> **Note**
> It is recommended to use a batch file or bash script to run the application on startup.
