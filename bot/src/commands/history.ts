import { TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import { TurnContext, Activity, MessageFactory, CardFactory } from "botbuilder";
import { historyState } from "..";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import historyCard from "../cards/history.card.json";

export class HistoryCommandHandler implements TeamsFxBotCommandHandler {

  triggerPatterns: TriggerPatterns = "history";

  async handleCommandReceived(context: TurnContext): Promise<string | void | Partial<Activity>> {
    // get the history from state
    const { history } = await historyState.get(context, { history: [] });
    // render the card
    const cardJson = AdaptiveCards.declare(historyCard).render(history);
    // return the card
    await context.sendActivity(MessageFactory.attachment(CardFactory.adaptiveCard(cardJson)));
  }

}
