import { ConversationBot } from "@microsoft/teamsfx";
import config from "./config";

export const commandBot = new ConversationBot({
  adapterConfig: {
    appId: config.botId,
    appPassword: config.botPassword,
  },
  command: {
    enabled: true,
    commands: [],
  },
});
