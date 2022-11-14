import { TurnContext, Activity, ActivityTypes, MessageFactory, CardFactory } from "botbuilder";
import { Configuration, CreateImageRequest, CreateImageRequestSizeEnum, OpenAIApi } from "openai";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import resultCard from "../cards/result.card.json";
import { apiKeyState, historyState, nState, sizeState } from "..";
import { ErrorCardData, ResultCardData } from "./models";
import errorCard from "../cards/error.card.json";

export const createOpenAIClient =
  (apiKey: string): OpenAIApi => {
    const configuration = new Configuration({
      apiKey,
    });

    return new OpenAIApi(configuration);
  }

export const generateImages = async (context: TurnContext, prompt: string): Promise<string | void | Partial<Activity>> => {
  // get the API key from state
  const { apiKey } = await apiKeyState.get(context, { apiKey: '' });
  // if there is no API key, return a friendly error message
  if (!apiKey) { await context.sendActivity("You need to provide an API Key. Use the `settings` command."); return; }
  // get the number of images to generate from state
  const { n } = await nState.get(context, { n: 1 });
  // get the size of images to generate from state
  const { size } = await sizeState.get(context, { size: CreateImageRequestSizeEnum._1024x1024 });
  // get the history from state
  const { history } = await historyState.get(context, { history: [] });
  // save the prompt to history
  await historyState.set(context, { history: [...history, { timestamp: new Date().toISOString(), prompt }] });
  // create a new OpenAI client
  const openai = createOpenAIClient(apiKey);
  // create a new request
  const request: CreateImageRequest = { prompt, n, size }
  // send a typing activity and confirmation to the user
  await context.sendActivities([
    { type: ActivityTypes.Typing },
    { type: 'delay', value: 1000 },
    {
      type: ActivityTypes.Message,
      text: `Generating ${request.n} ${request.n > 1 ? 'images' : 'image'} at ${request.size} ...`
    },
    { type: ActivityTypes.Typing },
  ]);

  try {
    // send the request to the OpenAI API
    const response = await openai.createImage(request);
    const { data } = response;
    // render the card
    const resultCardData: ResultCardData = { ...data, prompt };
    const cardJson = AdaptiveCards.declare(resultCard).render(resultCardData);
    // return the card
    await context.sendActivity(MessageFactory.attachment(CardFactory.adaptiveCard(cardJson)));
  } catch (err) {
    const errorCardData: ErrorCardData = { error: err.message };
    const errorCardJson = AdaptiveCards.declare(errorCard).render(errorCardData);
    await context.sendActivity(MessageFactory.attachment(CardFactory.adaptiveCard(errorCardJson)));
  }
}
