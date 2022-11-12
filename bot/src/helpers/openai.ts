import { Configuration, CreateImageRequest, CreateImageRequestSizeEnum, ImagesResponse, OpenAIApi } from "openai";

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

// type for the result card
export interface ResultCardData extends ImagesResponse {
  text: string;
}
