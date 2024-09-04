import type { Input } from '@/core/interfaces'

export class InputMock implements Input {
  text(message: string): Promise<string> {
    throw new Error('Method not implemented.')
  }

  number(message: string): Promise<number> {
    throw new Error('Method not implemented.')
  }

  select(message: string, options: string[][]): Promise<string> {
    throw new Error('Method not implemented.')
  }
}
