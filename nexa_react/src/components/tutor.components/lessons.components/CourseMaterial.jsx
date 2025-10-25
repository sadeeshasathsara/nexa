import React from "react";
import { FileText, Download, ExternalLink } from "lucide-react";

const CourseMaterial = ({ materialUrl }) => {
  // Function to handle PDF download
  const handleDownload = () => {
    if (materialUrl) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = materialUrl;
      link.download = materialUrl.split("/").pop() || "course-material.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Function to handle PDF viewing in new tab
  const handleView = () => {
    if (materialUrl) {
      window.open(materialUrl, "_blank");
    }
  };

  // Extract filename from URL for display
  const getFileName = () => {
    if (!materialUrl) return "";
    const urlParts = materialUrl.split("/");
    return urlParts[urlParts.length - 1] || "course-material.pdf";
  };

  return (
    <div className="max-w-4xl mx-auto">
      {materialUrl ? (
        <div className="space-y-6">
          {/* File Info Card */}
          <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {getFileName()}
                  </h3>
                  <p className="text-sm text-gray-600">Course Material PDF</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleView}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>

          {/* PDF Preview Section */}
          <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
            <div className="bg-gray-100 p-3 border-b border-gray-300 flex justify-between items-center">
              <p className="text-sm text-gray-600">PDF Preview</p>
              <button
                onClick={handleView}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Open in new tab →
              </button>
            </div>
            <div className="aspect-[8.5/11] bg-gray-50">
              {materialUrl ? (
                <iframe
                  src={materialUrl}
                  className="w-full h-full border-0"
                  title="PDF Preview"
                  style={{ minHeight: "500px" }}
                >
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">
                        Your browser doesn't support PDF preview
                      </p>
                      <button
                        onClick={handleDownload}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Download PDF
                      </button>
                    </div>
                  </div>
                </iframe>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">
                      No PDF available for preview
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Quick Actions</h4>
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 text-blue-700 hover:text-blue-900 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={handleView}
                className="flex items-center gap-2 text-blue-700 hover:text-blue-900 text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Open in new window
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">
            No course material uploaded yet
          </p>
          <p className="text-gray-400">
            Course materials will appear here once added
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseMaterial;
