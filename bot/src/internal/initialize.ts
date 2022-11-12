import { ConversationBot } from "@microsoft/teamsfx";
import { BotCommandHandler } from "../commands/bot";
import config from "./config";

export const commandBot = new ConversationBot({
  adapterConfig: {
    appId: config.botId,
    appPassword: config.botPassword,
  },
  command: {
    enabled: true,
    commands: [new BotCommandHandler()],
  }
});
