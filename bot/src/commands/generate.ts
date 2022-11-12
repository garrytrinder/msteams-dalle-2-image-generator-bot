import { CommandMessage, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import { TurnContext, Activity } from "botbuilder";
import { generateImages } from "../helpers/openai";

export class GenerateCommandHandler implements TeamsFxBotCommandHandler {

  triggerPatterns: TriggerPatterns = "generate";

  async handleCommandReceived(context: TurnContext, message: CommandMessage): Promise<string | void | Partial<Activity>> {
    await generateImages(context, message.text);
  }

}
