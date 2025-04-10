import { ModelInfo } from './types';

export const MODELS: ModelInfo[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4o',
    description: 'Most capable model for complex tasks',
    limit: 5,
    useCase: 'Complex reasoning, polished replies'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek R1/V3',
    description: 'Specialized in code and technical tasks',
    limit: 30,
    useCase: 'Code generation, mid-level logic'
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'Fast and efficient for routine tasks',
    limit: 200,
    useCase: 'Routine chat, fast responses'
  },
  {
    id: 'gpt-4o-min',
    name: 'GPT-4o Mini',
    description: 'Mini version of GPT-4o with fast and capable responses',
    limit: 200,
    useCase: 'Balanced performance with high speed'
  }
];

export const MODEL_MAP = MODELS.reduce((acc, model) => {
  acc[model.id] = model;
  return acc;
}, {} as Record<string, ModelInfo>);
