# EduLearn AI - Ed-Tech Website

A modern educational technology website built with Next.js and tRPC, featuring a responsive navbar, carousel banner, course cards, and footer.

## 🚀 Tech Stack

- **Next.js 14** - React framework with App Router
- **tRPC** - End-to-end typesafe APIs
- **TypeScript** - Type safety throughout the application
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Data fetching and caching (via tRPC)
- **Lucide React** - Beautiful icon library

## 📁 Project Structure

```
edtech-demo/
├── app/                      # Next.js App Router
│   ├── _trpc/               # tRPC client configuration
│   │   └── Provider.tsx     # tRPC React provider
│   ├── api/trpc/[trpc]/     # tRPC API route handler
│   │   └── route.ts
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── CarouselBanner.tsx  # Auto-rotating banner
│   ├── CourseCard.tsx      # Individual course display
│   ├── CoursesGrid.tsx     # Grid of all courses
│   ├── Footer.tsx          # Footer with links
│   └── Navbar.tsx          # Navigation bar
├── server/                  # Backend/API code
│   ├── routers/
│   │   └── _app.ts         # tRPC router with all endpoints
│   └── trpc.ts             # tRPC initialization
└── utils/
    └── trpc.ts             # tRPC client setup
```

## 🎯 How It Works

### Next.js Architecture

Next.js provides the foundation with:
- **File-based routing**: Files in `app/` automatically become routes
- **Server Components**: By default, components render on the server
- **Client Components**: Marked with `'use client'` for interactivity
- **API Routes**: Built-in backend at `app/api/`

### tRPC Integration

tRPC connects your frontend and backend with **full type safety**:

1. **Define API endpoints** in `server/routers/_app.ts`:
```typescript
export const appRouter = router({
  getCourses: publicProcedure.query(() => {
    return courses; // TypeScript knows this type!
  }),
});
```

2. **Expose via Next.js API** in `app/api/trpc/[trpc]/route.ts`:
```typescript
// Handles all requests to /api/trpc/*
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
  });
```

3. **Call from frontend** with full autocomplete:
```typescript
const { data: courses } = trpc.getCourses.useQuery();
// TypeScript knows the exact shape of 'courses'!
```

### Component Breakdown

**Navbar** (`components/Navbar.tsx`):
- Responsive design with mobile menu
- Brand logo and navigation links
- CTA buttons for Sign In / Get Started

**CarouselBanner** (`components/CarouselBanner.tsx`):
- Auto-rotates every 5 seconds
- Manual navigation with arrows
- Dot indicators for each slide
- **Uses tRPC**: `trpc.getBanners.useQuery()`

**CoursesGrid** (`components/CoursesGrid.tsx`):
- Fetches courses from API
- Responsive grid layout (1-4 columns based on screen size)
- Loading and error states
- **Uses tRPC**: `trpc.getCourses.useQuery()`

**CourseCard** (`components/CourseCard.tsx`):
- Displays individual course info
- Rating, student count, price
- Hover effects for better UX

**Footer** (`components/Footer.tsx`):
- Company information
- Organized link sections
- Contact details

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd edtech-demo
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
npm start
```

## 🔧 How to Modify

### Adding a New API Endpoint

Edit `server/routers/_app.ts`:

```typescript
export const appRouter = router({
  // Existing endpoints...
  
  // Add a new endpoint
  getInstructors: publicProcedure.query(() => {
    return [
      { id: '1', name: 'Andrew Ng', expertise: 'ML' },
      { id: '2', name: 'Fei-Fei Li', expertise: 'CV' },
    ];
  }),
  
  // Add endpoint with input validation
  enrollStudent: publicProcedure
    .input(z.object({
      studentId: z.string(),
      courseId: z.string(),
    }))
    .mutation(({ input }) => {
      // Save to database
      return { success: true };
    }),
});
```

### Using the New Endpoint

In any component:

```typescript
'use client';
import { trpc } from '@/utils/trpc';

export default function Instructors() {
  const { data, isLoading } = trpc.getInstructors.useQuery();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {data?.map(instructor => (
        <div key={instructor.id}>{instructor.name}</div>
      ))}
    </div>
  );
}
```

### Modifying Styles

**Tailwind Classes**: All styling uses Tailwind. Modify classes directly in components:

```typescript
// Change navbar color from blue to purple
<nav className="bg-purple-600 text-white"> // was bg-blue-600
```

**Custom CSS**: Add to `app/globals.css`:

```css
.custom-button {
  @apply px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600;
}
```

### Adding a New Page

Create a new file in `app/`:

```typescript
// app/about/page.tsx
export default function About() {
  return <div>About Us Page</div>;
}
```

Accessible at `http://localhost:3000/about`

### Connecting to a Real Database

Replace mock data in `server/routers/_app.ts`:

```typescript
import { db } from '@/lib/database'; // Your DB client

export const appRouter = router({
  getCourses: publicProcedure.query(async () => {
    const courses = await db.course.findMany();
    return courses;
  }),
});
```

## 🎨 Customization Ideas

1. **Change Color Scheme**: 
   - Replace `blue-600` with any Tailwind color
   - Update `bg-gradient-to-r from-blue-500 to-purple-600`

2. **Add Authentication**:
   - Integrate NextAuth.js
   - Add protected procedures in tRPC
   - Show/hide content based on auth state

3. **Add Search**:
   - Create `searchCourses` tRPC endpoint
   - Add search bar to Navbar
   - Filter courses on backend

4. **Add Shopping Cart**:
   - Use React Context or Zustand for state
   - Create `addToCart` mutation
   - Build checkout page

## 🔑 Key Concepts

### Why tRPC?

**Without tRPC**:
```typescript
// Backend
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// Frontend - NO type safety!
const courses = await fetch('/api/courses').then(r => r.json());
// TypeScript doesn't know what 'courses' contains
```

**With tRPC**:
```typescript
// Backend
getCourses: publicProcedure.query(() => courses),

// Frontend - FULL type safety!
const { data } = trpc.getCourses.useQuery();
// TypeScript knows EXACTLY what 'data' contains
// Autocomplete works everywhere!
```

### Server vs Client Components

- **Server Components** (default): Render on server, no JavaScript sent to client
- **Client Components** (`'use client'`): Interactive, can use hooks like `useState`

Use server components when possible for better performance!

### Queries vs Mutations

- **Query** (`.query()`): Read data (GET requests)
- **Mutation** (`.mutation()`): Modify data (POST/PUT/DELETE)

```typescript
// Query - for reading
const courses = trpc.getCourses.useQuery();

// Mutation - for writing
const enroll = trpc.enrollInCourse.useMutation();
enroll.mutate({ courseId: '1', userEmail: 'user@example.com' });
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🎓 What You've Learned

✅ Setting up Next.js with App Router  
✅ Integrating tRPC for type-safe APIs  
✅ Building responsive components with Tailwind  
✅ Client vs Server components  
✅ File-based routing  
✅ API route handlers  
✅ React Query for data fetching  
✅ TypeScript for type safety  

## 💡 Next Steps

1. Add authentication with NextAuth.js
2. Connect to a real database (PostgreSQL, MongoDB)
3. Implement course enrollment functionality
4. Add user dashboard
5. Create admin panel for course management
6. Add video player for course content
7. Implement progress tracking
8. Add payment integration (Stripe)
