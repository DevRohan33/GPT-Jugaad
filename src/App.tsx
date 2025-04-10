import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Terms from './pages/Terms';
import Chat from './pages/Chat';
import { useChatStore } from './store';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const hasAcceptedTerms = useChatStore((state) => state.user.hasAcceptedTerms);
  
  if (!hasAcceptedTerms) {
    return <Navigate to="/terms" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/terms" element={<Terms />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;