import { TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import { apiKeyState, nState, sizeState } from "..";
import { TurnContext, Activity, MessageFactory, CardFactory } from "botbuilder";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import settingsCard from "../cards/settings.card.json";
import { SettingsCardData } from "../helpers/models";
import { CreateImageRequestSizeEnum } from "openai";

export class SettingsCommandHandler implements TeamsFxBotCommandHandler {

  triggerPatterns: TriggerPatterns = "settings";

  async handleCommandReceived(context: TurnContext): Promise<string | void | Partial<Activity>> {
    // get the API key from state
    const { apiKey } = await apiKeyState.get(context, { apiKey: '' });
    // get the number of images to generate from state
    const { n } = await nState.get(context, { n: 1 });
    // get the size of images to generate from state
    const { size } = await sizeState.get(context, { size: CreateImageRequestSizeEnum._1024x1024 });
    // render the card
    const settingsCardData: SettingsCardData = { apiKey, n, size };
    const cardJson = AdaptiveCards.declare(settingsCard).render(settingsCardData);
    // return the card
    await context.sendActivity(MessageFactory.attachment(CardFactory.adaptiveCard(cardJson)));
  }
}
