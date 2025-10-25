import React, { useState } from "react";
import { X, Video, FileText, Upload } from "lucide-react";

const AddLessonModal = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  courseId,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoFile: null,
    materialFile: null,
    videoPreview: "",
    materialPreview: "",
  });

  if (!isOpen) return null;

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormData({
        ...formData,
        videoFile: file,
        videoPreview: preview,
      });
    }
  };

  const handleMaterialUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        materialFile: file,
        materialPreview: file.name,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title) {
      alert("Please enter a lesson title");
      return;
    }

    // Send actual file objects to backend INCLUDING courseId
    const lessonData = {
      title: formData.title,
      description: formData.description,
      videoFile: formData.videoFile,
      materialFile: formData.materialFile,
      courseId: courseId, // Include the course ID
    };

    console.log("Submitting lesson data:", lessonData); // Debug log

    onSubmit(lessonData);

    // Reset form after submission
    setFormData({
      title: "",
      description: "",
      videoFile: null,
      materialFile: null,
      videoPreview: "",
      materialPreview: "",
    });
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      title: "",
      description: "",
      videoFile: null,
      materialFile: null,
      videoPreview: "",
      materialPreview: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Add New Lesson</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter lesson title"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter lesson description"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Video className="w-4 h-4" />
                Upload Video
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                  id="video-upload"
                  disabled={loading}
                />
                <label htmlFor="video-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  {formData.videoFile ? (
                    <div>
                      <p className="text-sm font-medium text-green-600">
                        {formData.videoFile.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(formData.videoFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600">
                        Click to upload video
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        MP4, AVI, MOV (Max 500MB)
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Upload Course Material (PDF)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleMaterialUpload}
                  className="hidden"
                  id="material-upload"
                  disabled={loading}
                />
                <label htmlFor="material-upload" className="cursor-pointer">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  {formData.materialFile ? (
                    <div>
                      <p className="text-sm font-medium text-green-600">
                        {formData.materialFile.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(formData.materialFile.size / 1024 / 1024).toFixed(2)}{" "}
                        MB
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600">
                        Click to upload PDF
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PDF files only (Max 50MB)
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!formData.title || loading}
              >
                {loading ? "Adding Lesson..." : "Add Lesson"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLessonModal;
