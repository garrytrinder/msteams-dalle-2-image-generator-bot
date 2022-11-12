import { TaskModuleRequest, TaskModuleResponse, TeamsActivityHandler, TurnContext } from 'botbuilder'

export class DALLE2ImageGeneratorActivityHandler extends TeamsActivityHandler {

  protected handleTeamsTaskModuleFetch(_context: TurnContext, _taskModuleRequest: TaskModuleRequest): Promise<TaskModuleResponse> {
    const { url, text } = _taskModuleRequest.data.data;
    const response: TaskModuleResponse = {
      task: {
        type: 'continue',
        value: {
          url: `${process.env.SITE_ENDPOINT}/image.html?imgUrl=${encodeURIComponent(url)}&height=1024&width=1024&text=${text}`,
          height: 512,
          width: 512,
          title: text
        }
      }
    }
    return Promise.resolve(response)
  }
}
