import { CommandMessage, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import { TurnContext, Activity } from "botbuilder";
import { apiKeyState } from "..";
import { getRandomIdea } from "../helpers/ideas";
import { generateImages } from "../helpers/openai";

export class GenerateCommandHandler implements TeamsFxBotCommandHandler {

  triggerPatterns: TriggerPatterns = "generate";

  async handleCommandReceived(context: TurnContext, message: CommandMessage): Promise<string | void | Partial<Activity>> {
    // if there is no text, return a friendly error message
    const text = message.text.split(' ').slice(1).join(' ');
    if (!text) { await context.sendActivity(`You need to provide a detailed description. Try, \`generate ${getRandomIdea()}\`.`); return; }
    // get the API key from state
    const { apiKey } = await apiKeyState.get(context, { apiKey: '' });
    // if there is no API key, return a friendly error message
    if (!apiKey) { await context.sendActivity("You need to provide an API Key. Use the `settings` command."); return; }
    // generate images
    await generateImages(context, message.text);
  }

}
