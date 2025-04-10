export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  model?: string;
  timestamp: number;
}

export interface UserQuota {
  gpt4: number;
  deepseek: number;
  gpt3: number;
}

export interface UserState {
  isAuthenticated: boolean;
  hasAcceptedTerms: boolean;
  quotas: UserQuota;
  githubConnected: boolean;
}

export type ModelType = 'gpt-4' | 'deepseek' | 'gpt-3.5-turbo' | 'gpt-free';

export interface ModelInfo {
  id: ModelType;
  name: string;
  description: string;
  limit: number;
  useCase: string;
}