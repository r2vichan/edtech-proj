"use client";

import { Star, Users } from "lucide-react";

/**
 * Course Card Component
 * Displays a single course with:
 * - Course image
 * - Title and description
 * - Instructor name
 * - Rating and student count
 * - Price
 */
interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    instructor: string;
    price: number;
    rating: number;
    students: number;
    image: string;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Course Image */}
      <div className="h-48 bg-gradient-to-r from-green-400 to-yellow-500 flex items-center justify-center">
        <div className="text-white text-4xl font-bold">
          {course.title.charAt(0)}
        </div>
      </div>

      {/* Course Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {course.description}
        </p>
        <p className="text-sm text-gray-500 mb-4">by {course.instructor}</p>

        {/* Rating and Students */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {course.rating}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <Users className="h-4 w-4" />
            <span className="text-sm">{course.students.toLocaleString()}</span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ${course.price}
          </span>
          <button className="px-4 py-2 bg-yellow-600 text-black rounded-lg hover:bg-blue-700 transition font-medium">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
