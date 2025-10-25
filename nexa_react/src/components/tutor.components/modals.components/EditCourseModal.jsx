import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
const EditCourseModal = ({ isOpen, course, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    imageFile: null,
    imagePreview: "",
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
        category: course.category || "",
        imageFile: null,
        imagePreview: course.image, // This should be the full backend URL
      });
    }
  }, [course]);

  if (!isOpen || !course) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormData({
        ...formData,
        imageFile: file, // Store the actual file
        imagePreview: preview, // Store preview for display only
      });
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description) {
      return;
    }

    // Send the actual file if a new one was selected, otherwise send null
    onSubmit({
      ...course,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      imageFile: formData.imageFile, // Send the file object, not the preview
      // Don't send imagePreview to backend
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Edit Course</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter course title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter course description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Programming, Design, Business"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="edit-course-image-upload"
              />
              <label
                htmlFor="edit-course-image-upload"
                className="cursor-pointer"
              >
                {formData.imagePreview ? (
                  <div>
                    <img
                      src={formData.imagePreview}
                      alt="Course preview"
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                    <p className="text-sm text-gray-600">
                      {formData.imageFile
                        ? `New image: ${formData.imageFile.name}`
                        : "Current image - click to change"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Click to change image
                    </p>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 font-medium">
                      Click to upload course image
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {!formData.imageFile && "Leave unchanged to keep current image"}
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!formData.title || !formData.description}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourseModal;
