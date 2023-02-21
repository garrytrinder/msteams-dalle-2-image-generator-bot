import { InvokeResponseFactory, TeamsFxAdaptiveCardActionHandler } from "@microsoft/teamsfx";
import { TurnContext, InvokeResponse, MessageFactory, CardFactory } from "botbuilder";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { SettingsCardData } from "../helpers/models";
import settingsSaveCard from "../cards/settings-save.card.json";
import settingsRefreshCard from "../cards/settings-refresh.card.json";
import settingsCancelCard from "../cards/settings-cancel.card.json";
import { apiKeyState, nState, settings, sizeState } from "..";
import { CreateImageRequestSizeEnum } from "openai";

export class SettingsRefreshHandler implements TeamsFxAdaptiveCardActionHandler {

    triggerVerb = "settings-refresh";

    async handleActionInvoked(context: TurnContext): Promise<InvokeResponse<unknown>> {
        // save the settings to the conversation state
        const { replyToId, action } = await settings.get(context, { replyToId: '', action: '' });

        // current replyToId is the same as the one we saved, we know this is a refresh for a completed card
        if (context.activity.replyToId === replyToId) {
            const { apiKey } = await apiKeyState.get(context, { apiKey: '' });
            const { n } = await nState.get(context, { n: 1 });
            const { size } = await sizeState.get(context, { size: CreateImageRequestSizeEnum._1024x1024 });
            // if the previous card was saved, we need to render the saved card
            if (action === 'save') {
                // create masked api key
                const maskedApiKey = `${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 4)}`;
                // render the card
                const settingsCardData: SettingsCardData = { apiKey: maskedApiKey, n, size };
                const cardJson = AdaptiveCards.declare(settingsSaveCard).render(settingsCardData);
                // return the card
                return InvokeResponseFactory.adaptiveCard(cardJson);
            }
            // if the previous card was cancelled, we need to render the cancel card
            if (action === 'cancel') {
                // render the card
                const cardJson = AdaptiveCards.declare(settingsCancelCard).render();
                // return the card
                return InvokeResponseFactory.adaptiveCard(cardJson);
            }
        } else {
            // return the card to submit
            // get the API key from state
            const { apiKey } = await apiKeyState.get(context, { apiKey: '' });
            // get the number of images to generate from state
            const { n } = await nState.get(context, { n: 1 });
            // get the size of images to generate from state
            const { size } = await sizeState.get(context, { size: CreateImageRequestSizeEnum._1024x1024 });
            // render the card
            const settingsCardData: SettingsCardData = { apiKey, n, size };
            const cardJson = AdaptiveCards.declare(settingsRefreshCard).render(settingsCardData);
            // return the card
            return InvokeResponseFactory.adaptiveCard(cardJson);
        }
    }
}
