# DALL-E 2 Image Generator Bot for Microsoft Teams

This repository contains a Microsoft Teams personal app which contains a bot that can be used to generate images from scratch based on a text prompt.

The app has been built using Teams Toolkit for Visual Studio Code and uses the Open AI DALL-E 2 Image Generation API to generate images.

<video src="https://user-images.githubusercontent.com/11563347/201701431-e39f6917-b585-424c-bc9c-2fc6f2f05504.mp4" controls="controls" style="max-width: 730px;">
</video>

## Commands

The below table describes the commands available for use in the bot.

| &nbsp; | Description | Command |
| --- | ------ | ---- |
| 🧑‍🎨 | Generate images using a detailed description | `generate <text>` |
| ❓ | Generate images from a randomly selected detailed description | `surprise` |
| 🕒 | View submission history | `history` |
| ⚙️ | Configure bot settings | `settings` |

## Concepts introduced

- Using `TeamsFxBotCommandHandler` class to respond to incoming messages from the chat
- Using `TeamsFxActionHandler` class to respond to Adaptive Card submissions
- Integrate `TeamsActivityHandler` class with a Teams Toolkit generated project
- Send a welcome message on install to start a first run experience
- Save to and retrieve data from conversation state using state accessors
- Use Azurite local emulation of Azure Blob Storage for persisting state
- Send typing indicator from the bot to the chat
- Add time delay when sending messages from the bot to the chat
- Add custom tasks to Teams Toolkit F5 debugging process
