# Architecture Overview

## 🏗️ How Everything Connects

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER (Frontend)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Navbar     │  │   Carousel   │  │ CourseGrid   │         │
│  │  Component   │  │   Component  │  │  Component   │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                  │                  │                  │
│         │  Uses tRPC  ┌────▼────┐  Uses tRPC │                  │
│         └─────────────►│  trpc   │◄───────────┘                  │
│                        │ client  │                               │
│                        └────┬────┘                               │
│                             │                                    │
│                             │ HTTP Request                       │
│                             │ to /api/trpc                       │
└─────────────────────────────┼────────────────────────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │   NETWORK LAYER    │
                    │  (HTTP Protocol)   │
                    └─────────┬──────────┘
                              │
┌─────────────────────────────▼────────────────────────────────────┐
│                      NEXT.JS SERVER                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────┐         │
│  │  app/api/trpc/[trpc]/route.ts                     │         │
│  │  (API Route Handler)                               │         │
│  │                                                     │         │
│  │  Receives HTTP request → Forwards to tRPC Router   │         │
│  └─────────────────────────┬──────────────────────────┘         │
│                            │                                     │
│  ┌─────────────────────────▼──────────────────────────┐         │
│  │  server/routers/_app.ts                            │         │
│  │  (tRPC Router)                                     │         │
│  │                                                     │         │
│  │  ┌──────────────┐  ┌──────────────┐               │         │
│  │  │ getCourses() │  │ getBanners() │               │         │
│  │  │  .query()    │  │  .query()    │               │         │
│  │  └──────┬───────┘  └──────┬───────┘               │         │
│  │         │                  │                        │         │
│  │         │                  │                        │         │
│  │  ┌──────▼──────────────────▼───────┐               │         │
│  │  │      Mock Data / Database       │               │         │
│  │  │  courses[], banners[]           │               │         │
│  │  └─────────────────────────────────┘               │         │
│  └─────────────────────────────────────────────────────┘         │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

## 📊 Request Flow: Step by Step

### Example: Loading Courses

1. **User opens website** → Next.js renders `app/page.tsx`

2. **CoursesGrid component loads**
   ```typescript
   const { data: courses } = trpc.getCourses.useQuery();
   ```

3. **tRPC client makes HTTP request**
   - URL: `POST /api/trpc/getCourses`
   - Automatically includes proper headers

4. **Next.js API route receives request**
   ```typescript
   // app/api/trpc/[trpc]/route.ts
   fetchRequestHandler({ router: appRouter })
   ```

5. **tRPC router handles request**
   ```typescript
   // server/routers/_app.ts
   getCourses: publicProcedure.query(() => courses)
   ```

6. **Data flows back**
   - Server → API Route → Network → tRPC Client → Component
   - TypeScript ensures types match at every step!

7. **Component renders with data**
   ```typescript
   courses?.map(course => <CourseCard course={course} />)
   ```

## 🎯 Type Safety Flow

```
┌─────────────────────────────────────────────────────────┐
│  Define type in backend                                 │
│  ────────────────────────                               │
│  getCourses: publicProcedure.query(() => {             │
│    return courses; // TypeScript knows this type       │
│  })                                                     │
└──────────────┬──────────────────────────────────────────┘
               │
               │ tRPC automatically exports types
               │
┌──────────────▼──────────────────────────────────────────┐
│  export type AppRouter = typeof appRouter;              │
│  (This makes types available to frontend)               │
└──────────────┬──────────────────────────────────────────┘
               │
               │ Types flow to client
               │
┌──────────────▼──────────────────────────────────────────┐
│  Frontend gets full type information                    │
│  ───────────────────────────────────                    │
│  const { data } = trpc.getCourses.useQuery();          │
│  // 'data' has the EXACT type from backend!            │
│  // Autocomplete works everywhere!                     │
└─────────────────────────────────────────────────────────┘
```

## 🧩 Component Hierarchy

```
app/page.tsx (Main Page)
│
├─ Navbar
│  └─ Navigation links, mobile menu
│
├─ CarouselBanner
│  ├─ Fetches: trpc.getBanners.useQuery()
│  └─ Auto-rotating slides with navigation
│
├─ CoursesGrid
│  ├─ Fetches: trpc.getCourses.useQuery()
│  └─ Maps to CourseCard components
│     └─ CourseCard
│        └─ Individual course display
│
└─ Footer
   └─ Company info and links
```

## 🔄 Data Flow Patterns

### Pattern 1: Simple Query (No Input)

```
Component                    Backend
────────                    ────────
trpc.getCourses.useQuery()  
         │                  
         └──────HTTP────────► getCourses: publicProcedure.query()
                                     │
         ┌──────JSON─────────────────┘
         │                  
    ┌────▼─────┐            
    │  courses │            
    │   data   │            
    └──────────┘            
```

### Pattern 2: Query with Input

```
Component                           Backend
────────                           ────────
trpc.getCourseById.useQuery({id:'1'})
         │                  
         └──────HTTP + {id:'1'}─────► getCourseById: publicProcedure
                                        .input(z.object({id:z.string()}))
                                        .query(({input}) => ...)
         ┌──────JSON─────────────────────┘
         │                  
    ┌────▼──────┐            
    │  course   │            
    │   data    │            
    └───────────┘            
```

### Pattern 3: Mutation (Write Data)

```
Component                           Backend
────────                           ────────
const enroll = trpc.enrollInCourse.useMutation()
enroll.mutate({courseId:'1', email:'...'})
         │                  
         └──────HTTP + data─────────► enrollInCourse: publicProcedure
                                        .input(z.object({...}))
                                        .mutation(({input}) => {
                                          // Save to database
         ┌──────Success JSON──────────────  return {success:true}
         │                                 })
    ┌────▼─────┐            
    │ {success:│            
    │   true}  │            
    └──────────┘            
```

## 🎨 Styling Flow (Tailwind CSS)

```
Component File (*.tsx)
│
├─ className="bg-blue-600 text-white p-4"
│  │
│  │ Tailwind processes these classes
│  │
│  ▼
│  Generated CSS:
│  .bg-blue-600 { background-color: #2563eb; }
│  .text-white { color: #ffffff; }
│  .p-4 { padding: 1rem; }
│
└─ Final CSS bundled into app/globals.css
```

## 🚀 Build & Deploy Flow

```
Development (npm run dev)
│
├─ Next.js Dev Server starts
├─ Fast Refresh enabled
├─ TypeScript compilation on-the-fly
└─ Tailwind JIT compilation

Production (npm run build)
│
├─ TypeScript compilation
├─ Next.js optimizations
│  ├─ Code splitting
│  ├─ Image optimization
│  └─ Static page generation
├─ Tailwind purges unused CSS
│
└─ Creates optimized .next/ folder

Production Server (npm start)
│
└─ Serves optimized build
```

## 💡 Key Advantages

### Why This Stack?

1. **Type Safety**: One definition, types everywhere
   - Define API response once in backend
   - Frontend automatically knows the shape
   - No manual type definitions needed

2. **Developer Experience**:
   - Autocomplete everywhere
   - Refactor with confidence
   - Catch errors at compile time

3. **Performance**:
   - Server Components by default
   - Automatic code splitting
   - Optimized bundle sizes

4. **Maintainability**:
   - Collocated API logic
   - Clear separation of concerns
   - Easy to understand flow

## 🔍 Comparison with Traditional REST

### Traditional REST API

```typescript
// Backend (separate server)
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// Frontend - Manual typing needed
interface Course {
  id: string;
  title: string;
  // ... must manually keep in sync
}

const response = await fetch('/api/courses');
const courses: Course[] = await response.json();
// ❌ No guarantee the shape matches!
```

### With tRPC

```typescript
// Backend
getCourses: publicProcedure.query(() => courses),

// Frontend - Types flow automatically
const { data: courses } = trpc.getCourses.useQuery();
// ✅ TypeScript KNOWS the exact shape!
// ✅ Autocomplete works!
// ✅ Refactoring is safe!
```

## 📝 Summary

This architecture gives you:

✅ Full-stack type safety
✅ Excellent developer experience
✅ Fast, modern web app
✅ Easy to maintain and extend
✅ Production-ready foundation

The key insight: **tRPC creates a bridge** between your frontend and backend, making them feel like one unified codebase while maintaining proper separation.
