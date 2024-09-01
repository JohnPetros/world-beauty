import { input, select } from '@inquirer/prompts'

import type { Prompt } from '../core/interfaces'

export class InquirerPrompt implements Prompt {
  async input(message: string): Promise<string> {
    return await input({ message })
  }

  async select(message: string, options: string[][]): Promise<string> {
    const answer = await select({
      message,
      choices: options.map((option) => ({
        name: option[0],
        value: option[1] ?? option[0],
      })),
    })

    return answer
  }
}
