import { CommandMessage, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import { TurnContext, Activity, MessageFactory, CardFactory, ActivityTypes } from "botbuilder";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import resultCard from "../cards/result.card.json";
import { createImageRequest, createOpenAIClient, ResultCardData } from "../helpers/openai";

export class BotCommandHandler implements TeamsFxBotCommandHandler {

  triggerPatterns: TriggerPatterns = /.*/g

  async handleCommandReceived(context: TurnContext, message: CommandMessage): Promise<string | void | Partial<Activity>> {

    const openai = createOpenAIClient(process.env.OPENAI_API_KEY)
    const request = createImageRequest(message.text);

    context.sendActivities([
      { type: ActivityTypes.Typing },
      { type: 'delay', value: 1000 },
      {
        type: ActivityTypes.Message,
        text: `Generating ${request.n} ${request.n > 1 ? 'images' : 'image'} at ${request.size} ...`
      },
      { type: ActivityTypes.Typing },
    ]);

    const response = await openai.createImage(request);
    const { data } = response;

    const resultCardData: ResultCardData = { ...data, text: message.text };

    const cardJson = AdaptiveCards.declare(resultCard).render(resultCardData);
    await context.sendActivity(MessageFactory.attachment(CardFactory.adaptiveCard(cardJson)));
  }

}
