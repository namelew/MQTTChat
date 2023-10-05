import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from 'router';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <AppRouter />
    </QueryClientProvider>
  </React.StrictMode>
);
