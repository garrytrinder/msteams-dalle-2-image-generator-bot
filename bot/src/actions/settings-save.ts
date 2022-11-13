import { InvokeResponseFactory, TeamsFxAdaptiveCardActionHandler } from "@microsoft/teamsfx";
import { TurnContext, InvokeResponse } from "botbuilder";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { SettingsCardData, SettingsSaveActionData } from "../helpers/models";
import settingsSaveCard from "../cards/settings-save.card.json";
import { apiKeyState, nState, sizeState } from "..";

export class SettingsSaveHandler implements TeamsFxAdaptiveCardActionHandler {

  triggerVerb = "settings-save";

  async handleActionInvoked(context: TurnContext, actionData: SettingsSaveActionData): Promise<InvokeResponse<unknown>> {
    const { apiKey, size } = actionData;
    const n = parseInt(actionData.n);
    // save the settings to the conversation state
    await apiKeyState.set(context, { apiKey });
    await nState.set(context, { n });
    await sizeState.set(context, { size });
    // render the card
    const settingsCardData: SettingsCardData = { apiKey, n, size };
    const cardJson = AdaptiveCards.declare(settingsSaveCard).render(settingsCardData);
    // return the card
    return InvokeResponseFactory.adaptiveCard(cardJson);
  }

}
