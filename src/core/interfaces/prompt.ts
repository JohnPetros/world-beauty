export interface Prompt {
  input(message: string): Promise<string>
  select(message: string, options: string[][]): Promise<string>
}
