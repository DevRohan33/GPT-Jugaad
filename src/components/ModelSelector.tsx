import React from "react";
import { useChatStore } from "../store";
import { MODELS } from "../constants";
import { ModelType } from '../types';


const ModelSelector: React.FC = () => {
  const selectedModel = useChatStore((state) => state.selectedModel);
  const setSelectedModel = useChatStore((state) => state.setSelectedModel);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Model
      </label>
      <div className="relative">
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value as ModelType)} // ✅ FIXED here
          className="w-full appearance-none bg-white border border-gray-300 rounded-xl py-3 pl-4 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {MODELS.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name} – {model.useCase}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;
