import { TurnContext, Activity, ActivityTypes, MessageFactory, CardFactory } from "botbuilder";
import { Configuration, CreateImageRequest, CreateImageRequestSizeEnum, OpenAIApi } from "openai";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import resultCard from "../cards/result.card.json";
import { apiKeyState, historyState, nState, sizeState } from "..";
import { ResultCardData } from "./models";

// create a new OpenAI client
export const createOpenAIClient =
  (apiKey: string): OpenAIApi => {
    const configuration = new Configuration({
      apiKey,
    });

    return new OpenAIApi(configuration);
  }

// generate images from a prompt
export const generateImages = async (context: TurnContext, prompt: string): Promise<string | void | Partial<Activity>> => {
  const { apiKey } = await apiKeyState.get(context, { apiKey: '' });
  if (!apiKey) { await context.sendActivity("You need to provide an API Key. Use the `settings` command."); return; }
  const { n } = await nState.get(context, { n: 1 });
  const { size } = await sizeState.get(context, { size: CreateImageRequestSizeEnum._1024x1024 });
  const { history } = await historyState.get(context, { history: [] });
  await historyState.set(context, { history: [...history, { timestamp: new Date().toISOString(), prompt }] });
  const openai = createOpenAIClient(apiKey);
  const request: CreateImageRequest = { prompt, n, size }

  context.sendActivities([
    { type: ActivityTypes.Typing },
    { type: 'delay', value: 1000 },
    {
      type: ActivityTypes.Message,
      text: `Generating ${request.n} ${request.n > 1 ? 'images' : 'image'} at ${request.size} ...`
    },
    { type: ActivityTypes.Typing },
  ]);
  // send the request to the OpenAI API
  const response = await openai.createImage(request);
  const { data } = response;
  // render the card
  const resultCardData: ResultCardData = { ...data, prompt };
  const cardJson = AdaptiveCards.declare(resultCard).render(resultCardData);
  // return the card
  await context.sendActivity(MessageFactory.attachment(CardFactory.adaptiveCard(cardJson)));
}

// type for the result card
export interface ResultCardData extends ImagesResponse {
  prompt: string;
}
