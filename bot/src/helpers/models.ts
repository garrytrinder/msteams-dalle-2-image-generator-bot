import { CreateImageRequestSizeEnum, ImagesResponse } from "openai";

export interface SettingsCardData {
  apiKey: string;
  n: number;
  size: CreateImageRequestSizeEnum;
}

export interface SettingsSaveActionData {
  apiKey: string;
  n: string;
  size: CreateImageRequestSizeEnum;
}

export interface ResultCardData extends ImagesResponse {
  prompt: string;
}

export interface ErrorCardData {
  error: string;
}
