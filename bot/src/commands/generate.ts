import { CommandMessage, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import { TurnContext, Activity } from "botbuilder";
import { apiKeyState } from "..";
import { generateImages } from "../helpers/openai";

export class GenerateCommandHandler implements TeamsFxBotCommandHandler {

  triggerPatterns: TriggerPatterns = "generate";

  async handleCommandReceived(context: TurnContext, message: CommandMessage): Promise<string | void | Partial<Activity>> {
    // get the API key from state
    const { apiKey } = await apiKeyState.get(context, { apiKey: '' });
    // if there is no API key, return a friendly error message
    if (!apiKey) { await context.sendActivity("You need to provide an API Key. Use the `settings` command."); return; }
    // generate images
    await generateImages(context, message.text);
  }

}
