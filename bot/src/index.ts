import * as restify from "restify";
import { commandBot } from "./internal/initialize";
import path from "path";
import { DALLE2ImageGeneratorActivityHandler } from "./internal/activityHandler";

const activityHandler = new DALLE2ImageGeneratorActivityHandler()

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(`\nBot Started, ${server.name} listening to ${server.url}`);
});

server.post("/api/messages", async (req, res) => {
  await commandBot.adapter.process(req, res, (context) => activityHandler.run(context))
});

server.get(
  '/*.html',
  restify.plugins.serveStatic({
    directory: path.join(__dirname, 'public')
  })
)
