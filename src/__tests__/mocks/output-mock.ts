import type { Output } from '@/core/interfaces'

export class OutputMock implements Output {
  tables: Record<string, unknown>[][] = []
  lastErrorMessage = ''

  title(message: string): void {
    throw new Error('Method not implemented.')
  }
  success(message: string): void {
    this.lastErrorMessage = message
  }
  error(message: string): void {
    throw new Error('Method not implemented.')
  }
  table(rows: Record<string, unknown>[]): void {
    this.tables.push(rows)
  }
  clear(): void {
    throw new Error('Method not implemented.')
  }
  breakLine(): void {
    throw new Error('Method not implemented.')
  }
  unknownCommand(): void {
    throw new Error('Method not implemented.')
  }
}
