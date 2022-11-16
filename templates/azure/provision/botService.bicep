@secure()
param provisionParameters object
param botEndpoint string

var botAadAppClientId = provisionParameters.botAadAppClientId
var botServiceName = provisionParameters.botServiceName
var botServiceSku = provisionParameters.botServiceSku
var botDisplayName = provisionParameters.botDisplayName

// Register your web service as a bot with the Bot Framework
resource azureBot 'Microsoft.BotService/botServices@2021-03-01' = {
  kind: 'azurebot'
  location: 'global'
  name: botServiceName
  properties: {
    displayName: botDisplayName
    endpoint: uri(botEndpoint, '/api/messages')
    msaAppId: botAadAppClientId
  }
  sku: {
    name: botServiceSku // You can follow https://aka.ms/teamsfx-bicep-add-param-tutorial to add botServiceSku property to provisionParameters to override the default value "F0".
  }
}

// Connect the bot service to Microsoft Teams
resource botServiceMsTeamsChannel 'Microsoft.BotService/botServices/channels@2021-03-01' = {
  parent: azureBot
  location: 'global'
  name: 'MsTeamsChannel'
  properties: {
    channelName: 'MsTeamsChannel'
  }
}
