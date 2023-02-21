import { InvokeResponseFactory, TeamsFxAdaptiveCardActionHandler } from "@microsoft/teamsfx";
import { InvokeResponse, TurnContext } from "botbuilder";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import settingsCancelCard from "../cards/settings-cancel.card.json";
import { settings } from "..";

export class SettingsCancelHandler implements TeamsFxAdaptiveCardActionHandler {

  triggerVerb = "settings-cancel";

  async handleActionInvoked(context: TurnContext): Promise<InvokeResponse<unknown>> {
    await settings.set(context, { replyToId: context.activity.replyToId, action: 'cancel' });
    // render the card
    const cardJson = AdaptiveCards.declare(settingsCancelCard).render();
    // return the card
    return InvokeResponseFactory.adaptiveCard(cardJson);
  }

}
