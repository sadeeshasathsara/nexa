// Updated NonEnrolledCoursesContainer.js
import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "../global.components/cards.components/courseCard.component";
import { studentApiService } from "../../../apis/student.apis/student.api";

const NonEnrolledCoursesContainer = ({ courses = [], onEnroll }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Safe default for courses prop
  const safeCourses = Array.isArray(courses) ? courses : [];

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      return () => container.removeEventListener("scroll", checkScrollButtons);
    }
  }, [safeCourses]); // Re-check when courses change

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await studentApiService.enrollCourse(courseId);
      if (onEnroll) {
        onEnroll(); // Refresh the dashboard
      }
      // You can show a success message here
    } catch (error) {
      console.error("Failed to enroll:", error);
      // You can show an error message here
    }
  };

  // If no courses available, show a message
  if (safeCourses.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Courses Available
            </h3>
            <p className="text-gray-600">
              All courses are currently enrolled or no courses are available.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Explore New Courses
          </h2>
          <p className="text-gray-600">
            Discover courses to expand your skills and knowledge
          </p>
        </div>

        {/* Scrollable Course Cards */}
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          )}

          {/* Course Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {safeCourses.map((course) => (
              <CourseCard
                key={course.id || course._id}
                course={course}
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <button className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-3 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 hover:shadow-md">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default NonEnrolledCoursesContainer;
