// store.ts
import { create } from 'zustand';
import { Message, UserState, ModelType } from './types';

interface ChatStore {
  messages: Message[];
  addMessage: (message: Message) => void;
  user: UserState;
  setUser: (user: Partial<UserState>) => void;
  selectedModel: ModelType;
  setSelectedModel: (model: ModelType) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  user: {
    isAuthenticated: false,
    hasAcceptedTerms: false,
    quotas: {
      gpt4: 5,
      deepseek: 30,
      gpt3: 200,
    },
    githubConnected: false,
  },
  setUser: (updates) =>
    set((state) => ({ user: { ...state.user, ...updates } })),
  selectedModel: 'gpt-free', // default
  setSelectedModel: (model) => set({ selectedModel: model }),
}));
