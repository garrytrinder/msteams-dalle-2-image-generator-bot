import { ConversationBot } from "@microsoft/teamsfx";
import { GenerateCommandHandler } from "../commands/generate";
import { SurpriseCommandHandler } from "../commands/surprise";
import { SettingsCancelHandler } from "../actions/settings-cancel";
import { SettingsSaveHandler } from "../actions/settings-save";
import config from "./config";
import { SettingsCommandHandler } from "../commands/settings";
import { HistoryCommandHandler } from "../commands/history";
import { WelcomeConfigHandler } from "../actions/welcome-config";
import { SettingsRefreshHandler } from "../actions/settings-refresh";

export const commandBot = new ConversationBot({
  adapterConfig: {
    appId: config.botId,
    appPassword: config.botPassword,
  },
  command: {
    enabled: true,
    commands: [
      new GenerateCommandHandler(),
      new HistoryCommandHandler(),
      new SettingsCommandHandler(),
      new SurpriseCommandHandler()
    ],
  }, cardAction: {
    enabled: true,
    actions: [
      new SettingsCancelHandler(),
      new SettingsSaveHandler(),
      new SettingsRefreshHandler(),
      new WelcomeConfigHandler()
    ]
  }
});
