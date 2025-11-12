# EduLearn AI - Getting Started

Welcome to your Next.js + tRPC educational platform! This document will help you get started quickly.

## 📂 What You Have

A fully functional ed-tech website with:
- ✅ Responsive navigation bar
- ✅ Auto-rotating carousel banner
- ✅ Course catalog with cards
- ✅ Footer with links
- ✅ Full type-safe API using tRPC
- ✅ Modern styling with Tailwind CSS

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies

```bash
cd edtech-demo
npm install
```

This will install:
- Next.js (React framework)
- tRPC (API layer)
- TypeScript (type safety)
- Tailwind CSS (styling)
- React Query (data fetching)
- Lucide React (icons)

### Step 2: Run Development Server

```bash
npm run dev
```

Your app will be running at: `http://localhost:3000`

### Step 3: Explore and Modify!

Open the project in your favorite editor and start exploring.

## 📖 Documentation Files

I've created several guides to help you:

1. **README.md** - Complete project documentation
   - Project structure
   - How everything works
   - Detailed setup instructions
   - Customization guide

2. **ARCHITECTURE.md** - Visual architecture guide
   - Flow diagrams
   - How components connect
   - Request/response flow
   - Type safety explanation

3. **QUICK_REFERENCE.md** - Quick reference for common tasks
   - Change colors
   - Add courses/banners
   - Create new endpoints
   - Tailwind CSS cheat sheet
   - Debugging tips

## 🎯 Key Files to Know

### Frontend Components
```
components/
├── Navbar.tsx           → Top navigation bar
├── CarouselBanner.tsx   → Auto-rotating banner (uses tRPC)
├── CoursesGrid.tsx      → Course catalog (uses tRPC)
├── CourseCard.tsx       → Individual course display
└── Footer.tsx           → Bottom footer with links
```

### Backend API
```
server/
├── trpc.ts              → tRPC initialization
└── routers/
    └── _app.ts          → All API endpoints defined here
```

### Next.js Pages
```
app/
├── page.tsx             → Home page (assembles all components)
├── layout.tsx           → Root layout (wraps entire app)
├── globals.css          → Global styles
└── api/trpc/[trpc]/
    └── route.ts         → API route handler
```

### Configuration
```
├── package.json         → Dependencies and scripts
├── tsconfig.json        → TypeScript config
├── tailwind.config.js   → Tailwind CSS config
└── next.config.js       → Next.js config
```

## 🎨 First Customizations to Try

### 1. Change the Site Name

**File:** `components/Navbar.tsx`

```typescript
<span className="text-xl font-bold">Your School Name</span>
```

### 2. Change Color Scheme

**File:** `components/Navbar.tsx`

```typescript
// Change from blue to purple
<nav className="bg-purple-600 text-white">
  // ...
  <button className="px-4 py-2 bg-white text-purple-600">
```

### 3. Add Your Own Course

**File:** `server/routers/_app.ts`

```typescript
const courses = [
  // ... existing courses
  {
    id: '5',
    title: 'Your Course Title',
    description: 'Your course description',
    instructor: 'Your Name',
    price: 49,
    rating: 5.0,
    students: 1000,
    image: '/api/placeholder/400/250',
  },
];
```

### 4. Customize Banner Text

**File:** `server/routers/_app.ts`

```typescript
const banners = [
  {
    id: '1',
    title: 'Your Custom Title',
    subtitle: 'Your custom subtitle',
    imageUrl: '/api/placeholder/1200/400',
  },
];
```

## 🧪 How tRPC Works (Simple Example)

### Backend (Define API)
```typescript
// server/routers/_app.ts
export const appRouter = router({
  // This is your API endpoint
  getCourses: publicProcedure.query(() => {
    return courses; // Return data
  }),
});
```

### Frontend (Use API)
```typescript
// components/CoursesGrid.tsx
'use client';
import { trpc } from '@/utils/trpc';

export default function CoursesGrid() {
  // Call the API with full type safety!
  const { data: courses } = trpc.getCourses.useQuery();
  
  return (
    <div>
      {courses?.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
```

**The Magic:** TypeScript automatically knows:
- What `getCourses` returns
- The exact structure of each `course`
- All properties available on `course`

No manual type definitions needed! 🎉

## 📚 Learning Path

### Day 1: Understand the Structure
1. Read README.md
2. Explore the file structure
3. Run the dev server and see it working
4. Make small changes (colors, text)

### Day 2: Learn tRPC
1. Read ARCHITECTURE.md
2. Understand how data flows
3. Add a new course to the mock data
4. See it appear on the website

### Day 3: Create Your First Endpoint
1. Add a new tRPC endpoint
2. Call it from a component
3. Display the data

### Day 4: Styling Mastery
1. Read Tailwind docs
2. Modify existing components
3. Create a new component with custom styling

### Day 5: Build Something New
1. Add a new page
2. Create an API endpoint for it
3. Style it beautifully

## 🆘 Common Issues

### "npm install" fails
- Make sure you have Node.js 18+ installed
- Try: `rm -rf node_modules package-lock.json && npm install`

### Page shows error
- Check browser console for errors
- Check terminal where `npm run dev` is running
- Common fix: Restart dev server (Ctrl+C, then `npm run dev`)

### Types not working
- Restart your IDE/editor
- Check that all imports are correct
- Make sure TypeScript server is running

### Styling not applying
- Check Tailwind class names are correct
- Make sure `globals.css` is imported in `layout.tsx`
- Restart dev server

## 🎓 What Makes This Special?

1. **Type Safety**: Unlike traditional REST APIs, tRPC gives you autocomplete and type checking for your entire API

2. **Single Codebase**: Frontend and backend types stay in sync automatically

3. **Modern Stack**: Using the latest and greatest tools (Next.js 14, tRPC 10)

4. **Production Ready**: This structure scales from prototype to production

5. **Developer Experience**: Excellent DX with hot reload, autocomplete, and error catching

## 🚀 Next Steps

Once you're comfortable with the basics:

1. **Add Authentication**
   - Integrate NextAuth.js
   - Protect routes and API endpoints

2. **Add a Database**
   - Connect Prisma (PostgreSQL/MySQL)
   - Replace mock data with real queries

3. **Add More Features**
   - User profiles
   - Course enrollment
   - Progress tracking
   - Video player
   - Payment integration

4. **Deploy to Production**
   - Deploy to Vercel (easiest)
   - Or deploy to AWS, DigitalOcean, etc.

## 💡 Pro Tips

1. **Use TypeScript Errors**: When TypeScript shows an error, it's helping you! Read the error message carefully.

2. **Use Console.log**: Add `console.log(data)` to see what data you're getting.

3. **Browser DevTools**: Open Chrome DevTools (F12) to:
   - See network requests
   - Debug JavaScript
   - Inspect elements

4. **Component Driven**: Build one component at a time. Test it. Then move on.

5. **Start Small**: Don't try to build everything at once. Add features incrementally.

## 📞 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [tRPC Docs](https://trpc.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Docs](https://react.dev)

## 🎉 You're Ready!

You now have everything you need to:
- Understand the codebase
- Make modifications
- Add new features
- Build something amazing

Start with small changes, experiment, break things, and learn!

Good luck with your learning journey! 🚀
