'use client';

import CourseCard from './CourseCard';
import { trpc } from '@/utils/trpc';

/**
 * Courses Grid Component
 * Features:
 * - Fetches all courses from tRPC API
 * - Displays courses in a responsive grid
 * - Shows loading and error states
 */
export default function CoursesGrid() {
  // Another tRPC call - notice the type safety!
  // TypeScript knows exactly what data structure you'll get back
  const { data: courses, isLoading, error } = trpc.getCourses.useQuery();

  if (isLoading) {
    return (
      <div className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center text-red-600">
          <p>Error loading courses. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto" id="courses">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Popular Courses
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Learn from industry experts and advance your career with our
          world-class courses
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
