import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useChatStore } from '../store';
import { ScrollText, Check } from 'lucide-react';

export default function Terms() {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();
  const setUser = useChatStore((state) => state.setUser);

  const handleAccept = () => {
    setUser({ hasAcceptedTerms: true });
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full"
      >
        <div className="flex items-center mb-6">
          <ScrollText className="w-8 h-8 text-indigo-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Terms of Service</h1>
        </div>

        <div className="prose prose-indigo mb-6">
          <p className="text-gray-600">
            By using <strong>GPT-Jugaad</strong>, you agree to the following terms:
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Use the platform responsibly and ethically.</li>
            <li>Respect community guidelines and other users.</li>
            <li>No automated scraping, spamming, or abuse of the service.</li>
            <li>Stick to the fair usage policy and daily limits for each model.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 text-indigo-600">Free Tier Usage Limits:</h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li><strong>GPT-4o</strong>: 5 uses/day</li>
            <li><strong>DeepSeek R1 & V3</strong>: 30 uses/day</li>
            <li><strong>GPT-4o Mini & GPT-3.5 Turbo</strong>: 200 uses/day</li>
          </ul>
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="accept"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
          />
          <label htmlFor="accept" className="ml-2 text-gray-700">
            I have read and agree to the terms of service
          </label>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAccept}
          disabled={!accepted}
          className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium ${
            accepted
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          <Check className="w-5 h-5 mr-2" />
          Accept & Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
