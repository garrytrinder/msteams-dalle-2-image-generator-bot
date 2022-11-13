import { CreateImageRequestSizeEnum } from "openai";

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
