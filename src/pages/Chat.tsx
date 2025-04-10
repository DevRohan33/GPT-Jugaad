'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useChatStore } from '../store';
import { cn } from '../lib/utils';
import APIPopup from '../components/APiPopup';

const UI_MODELS = ['gpt-3.5-turbo', 'gpt-4.0', 'deepseek', 'gpt-4o-min'];
const API_MODEL_MAP: Record<string, string> = {
  'gpt-3.5-turbo': 'gpt-3.5-turbo',
  'gpt-4.0': 'gpt-4',
  'deepseek': 'deepseek-chat',
  'gpt-4o-min': 'gpt-3.5-turbo', // free version fallback
};

export default function Chat() {
  const [input, setInput] = useState('');
  const [popup, setPopup] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    messages,
    addMessage,
    selectedModel,
    setSelectedModel,
    user,
  } = useChatStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      const timestamp = Date.now();
      addMessage({ id: `${timestamp}`, role: 'assistant', content: 'Hi', timestamp });
      addMessage({ id: `${timestamp + 1}`, role: 'assistant', content: 'How are you?', timestamp });
      addMessage({ id: `${timestamp + 2}`, role: 'assistant', content: 'How can I assist you?', timestamp });
      initialized.current = true;
    }
  }, []);
  

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input,
      timestamp: Date.now(),
    };

    addMessage(userMessage);
    setInput('');
    inputRef.current?.focus();
    setLoading(true);

    const API_URL = 'https://api.chatanywhere.org/v1/chat/completions';
    const API_KEY = 'sk-ofYwnncANUdTycndwDV1icpHeeJfutQkGCjiRxLrXN2pfjV0';
    const apiModel = API_MODEL_MAP[selectedModel];

    try {
      const chatGPTResponse = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: apiModel,
          messages: [...messages, { role: 'user', content: input }].map(({ role, content }) => ({ role, content })),
        }),
      });

      const responseData = await chatGPTResponse.json();

      if (!chatGPTResponse.ok) {
        throw new Error(responseData?.error?.message || '⚠️ Something went wrong with the API.');
      }

      const assistantContent = responseData.choices?.[0]?.message?.content || '⚠️ No response received.';
      const assistantMessage = {
        id: Date.now().toString() + '-assistant',
        role: 'assistant' as const,
        content: assistantContent,
        timestamp: Date.now(),
      };

      addMessage(assistantMessage);
    } catch (error: any) {
      setPopup(`⚠️ ${error.message || 'Failed to fetch from API. Try again later.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4 dark:bg-black dark:text-white">
      <div className="text-xl font-bold text-center mb-4">🤖 GPT-Jugaad</div>

      {/* Model Selector */}
      <div className="flex justify-center mb-4">
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value as any)}
          className="px-3 py-2 rounded-md border dark:bg-gray-800 dark:border-gray-600"
        >
          {UI_MODELS.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4" ref={chatContainerRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && <span className="text-2xl">🤖</span>}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'px-4 py-2 rounded-xl whitespace-pre-wrap break-words',
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
              )}
              style={{
                maxWidth: '80%',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {msg.content}
            </motion.div>
            {msg.role === 'user' && <span className="text-2xl">🧑</span>}
          </div>
        ))}

        {/* Typing Indicator */}
        {loading && (
          <div className="flex items-start gap-2 justify-start">
            <span className="text-2xl">🤖</span>
            <div className="px-4 py-2 rounded-xl bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white max-w-[80%]">
              <div className="flex space-x-1 text-xl">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-150">.</span>
                <span className="animate-bounce delay-300">.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="mt-4 flex items-center gap-2">
        <Input
          ref={inputRef}
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
        />
        <Button onClick={handleSubmit}>Send</Button>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-600 dark:text-gray-400">
        Created by Rohan Parveag •{' '}
        <a
          href="https://github.com/DevRohan33"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
        >
          Visit My GitHub
        </a>
      </footer>

      {/* API Popup Message */}
      <APIPopup key={popup} message={popup} onClose={() => setPopup('')} />
    </div>
  );
}
