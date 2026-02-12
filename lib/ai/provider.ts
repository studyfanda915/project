export interface AIProvider {
  summarize(text: string): Promise<string>;
  translate(text: string, targetLanguage: string): Promise<string>;
  rewrite(text: string): Promise<string>;
  extractKeyPoints(text: string): Promise<string[]>;
}

class MockAIProvider implements AIProvider {
  async summarize(text: string): Promise<string> {
    return `Summary: ${text.slice(0, 160)}...`;
  }

  async translate(text: string, targetLanguage: string): Promise<string> {
    return `[${targetLanguage}] ${text}`;
  }

  async rewrite(text: string): Promise<string> {
    return `Rewritten: ${text}`;
  }

  async extractKeyPoints(text: string): Promise<string[]> {
    return text
      .split('.')
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 5);
  }
}

export const aiProvider: AIProvider = new MockAIProvider();
