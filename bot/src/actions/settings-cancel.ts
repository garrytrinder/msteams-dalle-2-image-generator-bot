import { InvokeResponseFactory, TeamsFxAdaptiveCardActionHandler } from "@microsoft/teamsfx";
import { InvokeResponse } from "botbuilder";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import settingsCancelCard from "../cards/settings-cancel.card.json";

export class SettingsCancelHandler implements TeamsFxAdaptiveCardActionHandler {

  triggerVerb = "settings-cancel";

  async handleActionInvoked(): Promise<InvokeResponse<unknown>> {
    // render the card
    const cardJson = AdaptiveCards.declare(settingsCancelCard).render();
    // return the card
    return InvokeResponseFactory.adaptiveCard(cardJson);
  }

}
