import { TurnContext, Activity, ActivityTypes, MessageFactory, CardFactory } from "botbuilder";
import { Configuration, CreateImageRequest, CreateImageRequestSizeEnum, ImagesResponse, OpenAIApi } from "openai";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import resultCard from "../cards/result.card.json";

// create a new OpenAI client
export const createOpenAIClient =
  (apiKey: string): OpenAIApi => {
    const configuration = new Configuration({
      apiKey,
    });

    return new OpenAIApi(configuration);
  }

// create a request for the OpenAI API
export const createImageRequest =
  (
    prompt: string,
    n: number = 1,
    size: CreateImageRequestSizeEnum = CreateImageRequestSizeEnum._1024x1024
  ): CreateImageRequest => {
    return {
      prompt,
      n,
      size
    }
  }

// generate images from a prompt
export const generateImages = async (context: TurnContext, text: string): Promise<string | void | Partial<Activity>> => {
  const openai = createOpenAIClient(process.env.OPENAI_API_KEY)
  const request = createImageRequest(text);

  context.sendActivities([
    { type: ActivityTypes.Typing },
    { type: 'delay', value: 1000 },
    {
      type: ActivityTypes.Message,
      text: `Generating ${request.n} ${request.n > 1 ? 'images' : 'image'} at ${request.size} ...`
    },
    { type: ActivityTypes.Typing },
  ]);

  const response = await openai.createImage(request);
  const { data } = response;

  const resultCardData: ResultCardData = { ...data, text };

  const cardJson = AdaptiveCards.declare(resultCard).render(resultCardData);
  await context.sendActivity(MessageFactory.attachment(CardFactory.adaptiveCard(cardJson)));
}

// type for the result card
export interface ResultCardData extends ImagesResponse {
  text: string;
}
