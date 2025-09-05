'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function QuickSetupPage() {
  const [status, setStatus] = useState('setting-up');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Auto-setup on page load
    setupResume();
  }, []);

  const setupResume = async () => {
    try {
      const response = await fetch('/api/admin/resume', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          googleDriveUrl: 'https://drive.google.com/file/d/1v6Vn94K63Hm9uK7xeushhHIwXB23KAn5/view?usp=sharing'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to setup resume');
      }

      setStatus('success');
    } catch (err) {
      console.error('Setup error:', err);
      setError(err.message || 'Failed to setup resume');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
          
          {status === 'setting-up' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h1 className="text-xl font-semibold text-gray-900 mb-2">Setting up your resume...</h1>
              <p className="text-gray-600">Please wait a moment</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="text-green-600 mx-auto mb-4" size={48} />
              <h1 className="text-xl font-semibold text-gray-900 mb-2">✅ Resume Setup Complete!</h1>
              <p className="text-gray-600 mb-6">
                Your Google Drive resume has been successfully saved and is now active on your portfolio.
              </p>
              <div className="space-y-3">
                <a
                  href="/"
                  className="block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Portfolio
                </a>
                <a
                  href="/api/resume/download"
                  className="block bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Test Download
                </a>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <AlertCircle className="text-red-600 mx-auto mb-4" size={48} />
              <h1 className="text-xl font-semibold text-gray-900 mb-2">Setup Failed</h1>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={setupResume}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}