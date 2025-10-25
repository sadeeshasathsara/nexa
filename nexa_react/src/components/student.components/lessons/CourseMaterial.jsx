// CourseMaterial.js
import React, { useState, useEffect } from "react";
import { studentApiService } from "../../../apis/student.apis/student.api";

const CourseMaterial = ({ lessonId, courseId }) => {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMaterials();
  }, [lessonId, courseId]);

  const loadMaterials = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("📚 Loading materials for:", { courseId, lessonId });

      // Since we have material data in the lesson, we can use it directly
      // But if you want to fetch from API, you can create an endpoint
      const response = await studentApiService.getLessonContent(
        courseId,
        lessonId
      );

      if (response.data.success) {
        const lesson = response.data.lesson;
        console.log("📄 Lesson materials:", lesson.materials);

        if (lesson.materials && lesson.materials.length > 0) {
          setMaterials(lesson.materials);
          setSelectedMaterial(lesson.materials[0]);
        } else if (lesson.hasMaterial) {
          // If hasMaterial is true but no materials array, create one
          const material = {
            id: lessonId,
            name: "Lesson Materials.pdf",
            type: "pdf",
            size: "2.5 MB",
            url: lesson.materialPdfUrl || "",
          };
          setMaterials([material]);
          setSelectedMaterial(material);
        }
      }
    } catch (error) {
      console.error("❌ Failed to load materials:", error);
      setError("Failed to load course materials");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (material) => {
    console.log("Downloading:", material.name);
    if (material.url) {
      window.open(material.url, "_blank");
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return "📄";
      case "zip":
        return "📦";
      case "doc":
        return "📝";
      default:
        return "📎";
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading materials...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
          <button
            onClick={loadMaterials}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (materials.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No Materials Available
          </h3>
          <p className="text-gray-600">
            There are no course materials for this lesson.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Course Materials
        </h3>
        <p className="text-gray-600">
          Download resources and materials for this lesson
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <h4 className="font-semibold text-gray-800 mb-4">
            Available Materials
          </h4>
          <div className="space-y-2">
            {materials.map((material) => (
              <div
                key={material.id}
                className={`
                  p-4 rounded-lg cursor-pointer transition-all duration-200 border-2
                  ${
                    selectedMaterial?.id === material.id
                      ? "bg-indigo-50 border-indigo-500 shadow-md"
                      : "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-sm"
                  }
                `}
                onClick={() => setSelectedMaterial(material)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getFileIcon(material.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-800 truncate">
                      {material.name}
                    </div>
                    <div className="text-sm text-gray-500">{material.size}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedMaterial && (
            <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center">
                <h4 className="font-semibold text-gray-800">
                  {selectedMaterial.name}
                </h4>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  onClick={() => handleDownload(selectedMaterial)}
                >
                  <span>⬇️</span>
                  Download
                </button>
              </div>

              <div className="p-6">
                {selectedMaterial.type === "pdf" ? (
                  <div
                    className="bg-gray-100 rounded-lg overflow-hidden"
                    style={{ height: "600px" }}
                  >
                    <iframe
                      src={selectedMaterial.url}
                      title={selectedMaterial.name}
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <span className="text-8xl mb-6">
                      {getFileIcon(selectedMaterial.type)}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {selectedMaterial.name}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Size: {selectedMaterial.size}
                    </p>
                    <button
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
                      onClick={() => handleDownload(selectedMaterial)}
                    >
                      <span>⬇️</span>
                      Download File
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseMaterial;
