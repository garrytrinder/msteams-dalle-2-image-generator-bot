import { ConversationBot } from "@microsoft/teamsfx";
import { GenerateCommandHandler } from "../commands/generate";
import { SurpriseCommandHandler } from "../commands/surprise";
import { SettingsCancelHandler } from "../actions/settings-cancel";
import { SettingsSaveHandler } from "../actions/settings-save";
import config from "./config";
import { SettingsCommandHandler } from "../commands/settings";

export const commandBot = new ConversationBot({
  adapterConfig: {
    appId: config.botId,
    appPassword: config.botPassword,
  },
  command: {
    enabled: true,
    commands: [
      new GenerateCommandHandler(),
      new SurpriseCommandHandler(),
      new SettingsCommandHandler()
    ],
  }, cardAction: {
    enabled: true,
    actions: [
      new SettingsSaveHandler(),
      new SettingsCancelHandler()
    ]
  }
});
