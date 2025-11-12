import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

// Mock data - in a real app, this would come from a database
const courses = [
  {
    id: '1',
    title: 'Machine Learning Specialization',
    description: 'Master the fundamentals of machine learning and deep learning',
    instructor: 'Andrew Ng',
    price: 49,
    rating: 4.9,
    students: 150000,
    image: '/api/placeholder/400/250',
  },
  {
    id: '2',
    title: 'Deep Learning Specialization',
    description: 'Build and train neural networks with TensorFlow',
    instructor: 'Andrew Ng',
    price: 49,
    rating: 4.8,
    students: 120000,
    image: '/api/placeholder/400/250',
  },
  {
    id: '3',
    title: 'AI for Everyone',
    description: 'Learn AI concepts without coding',
    instructor: 'Andrew Ng',
    price: 29,
    rating: 4.7,
    students: 200000,
    image: '/api/placeholder/400/250',
  },
  {
    id: '4',
    title: 'Natural Language Processing',
    description: 'Build NLP applications with sequence models',
    instructor: 'Younes Bensouda Mourri',
    price: 49,
    rating: 4.6,
    students: 80000,
    image: '/api/placeholder/400/250',
  },
];

const banners = [
  {
    id: '1',
    title: 'Learn AI from Industry Experts',
    subtitle: 'Join millions of learners building AI skills',
    imageUrl: '/api/placeholder/1200/400',
  },
  {
    id: '2',
    title: 'Advance Your Career in Machine Learning',
    subtitle: 'Get hands-on experience with real-world projects',
    imageUrl: '/api/placeholder/1200/400',
  },
  {
    id: '3',
    title: 'Master Deep Learning',
    subtitle: 'From basics to advanced neural networks',
    imageUrl: '/api/placeholder/1200/400',
  },
];

/**
 * This is your main tRPC router
 * All your API endpoints are defined here
 */
export const appRouter = router({
  // Endpoint to get all courses
  getCourses: publicProcedure.query(() => {
    return courses;
  }),

  // Endpoint to get a single course by ID
  getCourseById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const course = courses.find((c) => c.id === input.id);
      if (!course) throw new Error('Course not found');
      return course;
    }),

  // Endpoint to get banner carousel data
  getBanners: publicProcedure.query(() => {
    return banners;
  }),

  // Example mutation endpoint - could be used for enrolling in a course
  enrollInCourse: publicProcedure
    .input(
      z.object({
        courseId: z.string(),
        userEmail: z.string().email(),
      })
    )
    .mutation(({ input }) => {
      // In a real app, you'd save this to a database
      console.log(`Enrolling ${input.userEmail} in course ${input.courseId}`);
      return {
        success: true,
        message: 'Successfully enrolled!',
      };
    }),
});

// Export type definition of API
export type AppRouter = typeof appRouter;
