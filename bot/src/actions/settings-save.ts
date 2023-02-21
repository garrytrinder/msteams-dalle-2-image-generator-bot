import { InvokeResponseFactory, TeamsFxAdaptiveCardActionHandler } from "@microsoft/teamsfx";
import { TurnContext, InvokeResponse } from "botbuilder";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { SettingsCardData, SettingsSaveActionData } from "../helpers/models";
import settingsSaveCard from "../cards/settings-save.card.json";
import { apiKeyState, nState, settings, sizeState } from "..";

export class SettingsSaveHandler implements TeamsFxAdaptiveCardActionHandler {

  triggerVerb = "settings-save";

  async handleActionInvoked(context: TurnContext, actionData: SettingsSaveActionData): Promise<InvokeResponse<unknown>> {
    const { apiKey, size } = actionData;
    const n = parseInt(actionData.n);
    // save the settings to the conversation state
    await apiKeyState.set(context, { apiKey });
    await nState.set(context, { n });
    await sizeState.set(context, { size });
    await settings.set(context, { replyToId: context.activity.replyToId, action: 'save' });
    // create masked api key
    const maskedApiKey = `${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 4)}`;
    // render the card
    const settingsCardData: SettingsCardData = { apiKey: maskedApiKey, n, size };
    const cardJson = AdaptiveCards.declare(settingsSaveCard).render(settingsCardData);
    // return the card
    return InvokeResponseFactory.adaptiveCard(cardJson);
  }

}
