import { InvokeResponseFactory, TeamsFxAdaptiveCardActionHandler } from "@microsoft/teamsfx";
import { TurnContext, InvokeResponse } from "botbuilder";
import { CreateImageRequestSizeEnum } from "openai";
import { apiKeyState, nState, sizeState } from "..";
import { SettingsCardData } from "../helpers/models";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import settingsCard from "../cards/settings.card.json";

export class WelcomeConfigHandler implements TeamsFxAdaptiveCardActionHandler {

  triggerVerb = "welcome-config";

  async handleActionInvoked(context: TurnContext): Promise<InvokeResponse<unknown>> {
    // get the settings from the conversation state
    const { apiKey } = await apiKeyState.get(context, { apiKey: '' });
    const { n } = await nState.get(context, { n: 1 });
    const { size } = await sizeState.get(context, { size: CreateImageRequestSizeEnum._1024x1024 });
    // render the card
    const settingsCardData: SettingsCardData = { apiKey, n, size };
    const cardJson = AdaptiveCards.declare(settingsCard).render(settingsCardData);
    // return the card
    return InvokeResponseFactory.adaptiveCard(cardJson);
  }

}
