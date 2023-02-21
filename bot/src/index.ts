import * as restify from "restify";
import { commandBot } from "./internal/initialize";
import path from "path";
import { DALLE2ImageGeneratorActivityHandler } from "./internal/activityHandler";
import { ConversationState, UserState } from "botbuilder";
import { BlobsStorage } from "botbuilder-azure-blobs";

// initialise the storage for the bot
const storage = new BlobsStorage(
  process.env.BLOB_CONNECTION_STRING,
  process.env.BLOB_CONTAINER_NAME
);

// initialise the conversation state
export const conversationState = new ConversationState(storage);

// initialise the user state
const userState = new UserState(storage);

// create the state accessors
export const apiKeyState = conversationState.createProperty("apiKey");
export const nState = conversationState.createProperty("results");
export const sizeState = conversationState.createProperty("size");
export const settings = conversationState.createProperty("settings");
export const historyState = conversationState.createProperty("hsitory");

const activityHandler = new DALLE2ImageGeneratorActivityHandler(conversationState, userState);

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
