'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Key, XCircle } from 'lucide-react';

type APIPopupProps = {
  message?: string;        
  onClose?: () => void;   
};

export default function APIPopup({ message, onClose }: APIPopupProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
    }
  }, [message]);

  useEffect(() => {
    if (message) return;

    let initialTimeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>
    initialTimeout = setTimeout(() => {
      setShow(true);
    }, Math.floor(Math.random() * 5000) + 10000);
    interval = setInterval(() => {
      setShow((prev) => (prev ? prev : true));
    }, 60000); // 60 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [message]);

  if (!show) return null;
  if (message) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-3 rounded-md shadow-lg flex items-center z-50"
      >
        <XCircle className="w-5 h-5 mr-2" />
        <span>{message}</span>
        <button className="ml-3 text-white text-xl font-bold" onClick={onClose}>
          ×
        </button>
      </motion.div>
    );
  }

  // GitHub API Connect Popup
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', duration: 0.5 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative">
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-semibold"
        >
          ×
        </button>
        <div className="flex flex-col items-center text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
            alt="Happy Robot"
            className="w-20 h-20 mb-4"
          />

          {/* <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <Key className="w-8 h-8 text-indigo-600" />
          </div> */}

          <h3 className="text-2xl font-bold mb-2 text-blue-600">
            Do you need a FREE GPT API?
          </h3>
          <p className="text-gray-600 mb-6">
            You can access GPT-API for free via a verified third-party OAuth application. Just connect your GitHub (read-only).
          </p>

          <div className="w-full space-y-3">
            <a
              href="https://api.chatanywhere.org/v1/oauth/free/render"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 group"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Get Your Api</span>
            </a>
            <button
              onClick={() => setShow(false)}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Skip for now
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
