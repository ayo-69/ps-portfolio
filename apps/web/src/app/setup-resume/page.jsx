import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function SetupResumePage() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const setupResume = async () => {
    setStatus('setting-up');
    setError(null);

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

      if (!response.ok) {
        throw new Error('Failed to setup resume');
      }

      setStatus('success');
    } catch (err) {
      console.error('Setup error:', err);
      setError('Failed to setup resume');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Resume Setup</h1>
          <p className="text-gray-600">One-click setup for your Google Drive resume</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {status === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-600" size={24} />
                <div>
                  <span className="text-green-800 font-semibold">Resume Setup Complete!</span>
                  <p className="text-green-700 text-sm mt-1">
                    Your resume is now active. Go to your portfolio to test the download button.
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-red-600" size={20} />
                <span className="text-red-800">{error}</span>
              </div>
            </div>
          )}

          {status !== 'success' && (
            <>
              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  Click the button below to automatically setup your resume from the Google Drive link you provided.
                </p>
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-600 font-mono break-all">
                    https://drive.google.com/file/d/1v6Vn94K63Hm9uK7xeushhHIwXB23KAn5/view?usp=sharing
                  </p>
                </div>
              </div>

              <button
                onClick={setupResume}
                disabled={status === 'setting-up'}
                className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {status === 'setting-up' ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Setting up resume...
                  </>
                ) : (
                  'Setup Resume Now'
                )}
              </button>
            </>
          )}

          {status === 'success' && (
            <div className="text-center">
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Portfolio
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}