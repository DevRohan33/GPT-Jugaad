import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center text-white p-1">
      <div className="h-64 w-64 mb-2">
        <img
          src="/landing.png"
          alt="Landing Visual"
          className="h-full w-full object-contain"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl font-bold mb-2">Welcome to GPT-Jugaad</h1>
        <p className="text-xl mb-4 text-indigo-200">
        Why rent a brain when you can build one?
        </p>
        <p className="text-lg mb-8 text-purple-200">
          Smuggle that premium AI experience... without smuggling anything
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/terms')}
          className="bg-white text-indigo-900 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-indigo-100 transition-colors"
        >
          Get Started
        </motion.button>
      </motion.div>

      <Brain className="absolute bottom-8 right-8 w-12 h-12 text-indigo-400 opacity-50" />
    </div>
  );
}
