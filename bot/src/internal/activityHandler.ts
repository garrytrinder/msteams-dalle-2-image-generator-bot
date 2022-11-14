import { ActivityTypes, ConversationState, TaskModuleRequest, TaskModuleResponse, TeamsActivityHandler, TurnContext, UserState, CardFactory, MessageFactory } from 'botbuilder';
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import welcomeCard from "../cards/welcome.card.json";

export class DALLE2ImageGeneratorActivityHandler extends TeamsActivityHandler {
  protected conversationState: ConversationState;
  protected userState: UserState;

  constructor(conversationState: ConversationState, userState: UserState) {
    super();
    this.conversationState = conversationState;
    this.userState = userState;
  }

  protected handleTeamsTaskModuleFetch(_context: TurnContext, _taskModuleRequest: TaskModuleRequest): Promise<TaskModuleResponse> {
    const { url, prompt } = _taskModuleRequest.data.data;
    const response: TaskModuleResponse = {
      task: {
        type: 'continue',
        value: {
          url: `${process.env.SITE_ENDPOINT}/image.html?imgUrl=${encodeURIComponent(url)}&prompt=${prompt}`,
          height: 512,
          width: 512,
          title: prompt
        }
      }
    }
    return Promise.resolve(response)
  }

  async onInstallationUpdateAddActivity(context: TurnContext) {
    await context.sendActivities([
      { type: ActivityTypes.Typing },
      { type: 'delay', value: 1000 },
      { type: ActivityTypes.Message, text: '👋 Hi there!' }
    ]);

    const cardJson = AdaptiveCards.declare(welcomeCard).render();
    // return the card
    await context.sendActivity(MessageFactory.attachment(CardFactory.adaptiveCard(cardJson)));
  }

  async run(context: TurnContext) {
    await super.run(context);

    // Save any state changes.
    await this.conversationState.saveChanges(context, false);
    await this.userState.saveChanges(context, false);
  }

}
