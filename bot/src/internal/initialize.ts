import { ConversationBot } from "@microsoft/teamsfx";
import { GenerateCommandHandler } from "../commands/generate";
import { SurpriseCommandHandler } from "../commands/surprise";
import config from "./config";

export const commandBot = new ConversationBot({
  adapterConfig: {
    appId: config.botId,
    appPassword: config.botPassword,
  },
  command: {
    enabled: true,
    commands: [
      new GenerateCommandHandler(),
      new SurpriseCommandHandler()
    ],
  }
});
