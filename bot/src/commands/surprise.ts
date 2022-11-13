import { TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import { TurnContext, Activity, ActivityTypes } from "botbuilder";
import { getRandomIdea } from "../helpers/ideas";
import { generateImages } from "../helpers/openai";

export class SurpriseCommandHandler implements TeamsFxBotCommandHandler {

  triggerPatterns: TriggerPatterns = "surprise";

  async handleCommandReceived(context: TurnContext): Promise<string | void | Partial<Activity>> {
    await context.sendActivities([
      { type: ActivityTypes.Typing },
      { type: 'delay', value: 1000 },
      { type: ActivityTypes.Message, text: 'Working on it...' },
      { type: ActivityTypes.Typing },
    ]);

    // get a random idea
    const idea: string = getRandomIdea();

    await context.sendActivities([
      { type: 'delay', value: 1000 },
      { type: ActivityTypes.Message, text: `I have an idea!` },
      { type: ActivityTypes.Typing },
      { type: 'delay', value: 1000 },
      { type: ActivityTypes.Message, text: idea }
    ])

    await generateImages(context, idea)
  }

}
