import { useState, useCallback } from 'react';
import { Upload, Download, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import useUpload from '@/utils/useUpload';

export default function ResumeAdminPage() {
  const [upload, { loading }] = useUpload();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [error, setError] = useState(null);
  const [currentResume, setCurrentResume] = useState(null);

  // Check if resume exists on page load
  const checkExistingResume = useCallback(async () => {
    try {
      const response = await fetch('/api/resume/check');
      if (response.ok) {
        const data = await response.json();
        setCurrentResume(data.exists ? data : null);
      }
    } catch (err) {
      console.error('Error checking resume:', err);
    }
  }, []);

  // Load existing resume info on mount
  useState(() => {
    checkExistingResume();
  }, [checkExistingResume]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        setSelectedFile(file);
        setError(null);
      } else {
        setError('Please select a PDF file');
        setSelectedFile(null);
      }
    }
  };

  const handleUpload = useCallback(async () => {
    if (!selectedFile) return;

    setError(null);
    setUploadStatus('uploading');

    try {
      // First upload the file
      const { url, error: uploadError } = await upload({ file: selectedFile });
      
      if (uploadError) {
        setError(uploadError);
        setUploadStatus('error');
        return;
      }

      // Then save the resume info to our backend
      const saveResponse = await fetch('/api/admin/resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          filename: selectedFile.name,
          originalName: selectedFile.name,
        }),
      });

      if (!saveResponse.ok) {
        throw new Error('Failed to save resume information');
      }

      setUploadStatus('success');
      setSelectedFile(null);
      checkExistingResume(); // Refresh current resume info
      
      // Clear success message after 3 seconds
      setTimeout(() => setUploadStatus(null), 3000);

    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload resume');
      setUploadStatus('error');
    }
  }, [selectedFile, upload, checkExistingResume]);

  const handleRemoveResume = async () => {
    try {
      const response = await fetch('/api/admin/resume', {
        method: 'DELETE',
      });

      if (response.ok) {
        setCurrentResume(null);
        setUploadStatus('removed');
        setTimeout(() => setUploadStatus(null), 3000);
      } else {
        setError('Failed to remove resume');
      }
    } catch (err) {
      setError('Failed to remove resume');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Resume Management</h1>
          <p className="text-gray-600">Upload and manage your resume for the portfolio website</p>
        </div>

        {/* Current Resume Status */}
        {currentResume && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="text-green-600" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900">Current Resume</h3>
                  <p className="text-sm text-gray-600">{currentResume.filename}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href="/api/resume/download"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download size={16} />
                  Preview
                </a>
                <button
                  onClick={handleRemoveResume}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {currentResume ? 'Replace Resume' : 'Upload Resume'}
          </h2>

          {/* File Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select PDF Resume
            </label>
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500 mt-1">PDF files only, max 10MB</p>
          </div>

          {/* Selected File Info */}
          {selectedFile && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <FileText className="text-gray-600" size={20} />
                <div>
                  <p className="font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-600">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Status Messages */}
          {uploadStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-600" size={20} />
                <span className="text-green-800">Resume uploaded successfully!</span>
              </div>
            </div>
          )}

          {uploadStatus === 'removed' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-blue-600" size={20} />
                <span className="text-blue-800">Resume removed successfully!</span>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-red-600" size={20} />
                <span className="text-red-800">{error}</span>
              </div>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!selectedFile || loading || uploadStatus === 'uploading'}
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {loading || uploadStatus === 'uploading' ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload size={20} />
                {currentResume ? 'Replace Resume' : 'Upload Resume'}
              </>
            )}
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Once uploaded, visitors can download your resume from the "Download Resume" button on your portfolio.
          </p>
        </div>
      </div>
    </div>
  );
}