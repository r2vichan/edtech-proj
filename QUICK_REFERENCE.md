# Quick Reference Guide

## 🚀 Common Modifications

### Change Colors

**Navbar Color:**
```typescript
// components/Navbar.tsx
<nav className="bg-purple-600 text-white"> // Change from bg-blue-600
```

**Button Colors:**
```typescript
<button className="bg-green-600 hover:bg-green-700"> // Change any button
```

**Gradient Colors:**
```typescript
<div className="bg-gradient-to-r from-red-500 to-orange-600">
```

### Add a New Course

Edit `server/routers/_app.ts`, add to the `courses` array:

```typescript
{
  id: '5',
  title: 'Your New Course',
  description: 'Course description here',
  instructor: 'Instructor Name',
  price: 39,
  rating: 4.8,
  students: 50000,
  image: '/api/placeholder/400/250',
}
```

### Add a New Banner Slide

Edit `server/routers/_app.ts`, add to the `banners` array:

```typescript
{
  id: '4',
  title: 'Your New Banner',
  subtitle: 'Banner subtitle',
  imageUrl: '/api/placeholder/1200/400',
}
```

### Change Carousel Auto-Rotate Speed

Edit `components/CarouselBanner.tsx`:

```typescript
const timer = setInterval(() => {
  setCurrentSlide((prev) => (prev + 1) % banners.length);
}, 5000); // Change 5000 to any milliseconds (e.g., 3000 = 3 seconds)
```

### Add More Navigation Links

Edit `components/Navbar.tsx`:

```typescript
<div className="hidden md:flex items-center space-x-8">
  <a href="#courses">Courses</a>
  <a href="#about">About</a>
  <a href="#pricing">Pricing</a>
  <a href="#contact">Contact</a>
  <a href="#blog">Blog</a> {/* NEW LINK */}
</div>
```

### Change Footer Links

Edit `components/Footer.tsx` and modify any section:

```typescript
<div>
  <h3 className="text-white font-semibold mb-4">Resources</h3>
  <ul className="space-y-2 text-sm">
    <li><a href="#docs">Documentation</a></li>
    <li><a href="#api">API</a></li>
    {/* Add more links */}
  </ul>
</div>
```

### Change Course Grid Layout

Edit `components/CoursesGrid.tsx`:

```typescript
// Show 2 columns on mobile, 3 on tablet, 5 on desktop
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
```

### Add Loading Spinner

Replace loading text with a spinner:

```typescript
{isLoading && (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
)}
```

## 🔧 tRPC Cheat Sheet

### Create a Query (Read Data)

```typescript
// In server/routers/_app.ts
getPopularCourses: publicProcedure.query(() => {
  return courses.filter(c => c.students > 100000);
}),

// Use in component
const { data } = trpc.getPopularCourses.useQuery();
```

### Create a Query with Input

```typescript
// Backend
getCourseById: publicProcedure
  .input(z.object({ id: z.string() }))
  .query(({ input }) => {
    return courses.find(c => c.id === input.id);
  }),

// Frontend
const { data } = trpc.getCourseById.useQuery({ id: '1' });
```

### Create a Mutation (Write Data)

```typescript
// Backend
createCourse: publicProcedure
  .input(z.object({
    title: z.string(),
    price: z.number(),
  }))
  .mutation(({ input }) => {
    // Save to database
    return { success: true };
  }),

// Frontend
const createMutation = trpc.createCourse.useMutation();

const handleSubmit = () => {
  createMutation.mutate({
    title: 'New Course',
    price: 49,
  });
};
```

## 🎨 Tailwind CSS Quick Reference

### Spacing
- `p-4` = padding
- `m-4` = margin
- `px-4` = horizontal padding
- `py-4` = vertical padding
- `space-x-4` = space between children

### Colors
- `bg-blue-600` = background
- `text-blue-600` = text color
- `border-blue-600` = border color

### Sizing
- `w-full` = width 100%
- `h-64` = height 16rem
- `max-w-7xl` = max width

### Flexbox
- `flex` = display flex
- `items-center` = align items center
- `justify-between` = space between

### Grid
- `grid` = display grid
- `grid-cols-3` = 3 columns
- `gap-4` = gap between items

### Responsive
- `md:` = medium screens (768px+)
- `lg:` = large screens (1024px+)
- `xl:` = extra large screens (1280px+)

Example: `hidden md:flex` = hidden on mobile, flex on desktop

### Hover Effects
- `hover:bg-blue-700` = change background on hover
- `hover:scale-105` = grow slightly on hover
- `transition` = smooth transitions

## 🐛 Debugging Tips

### Check if tRPC is working:

```typescript
// Add console.log in your query
getCourses: publicProcedure.query(() => {
  console.log('getCourses called!');
  return courses;
}),
```

### Check what data you're getting:

```typescript
const { data, isLoading, error } = trpc.getCourses.useQuery();

console.log('Data:', data);
console.log('Loading:', isLoading);
console.log('Error:', error);
```

### Common Errors

**"Cannot use client component..."**
- Solution: Add `'use client'` at top of file

**"trpc is not defined"**
- Solution: Make sure you imported: `import { trpc } from '@/utils/trpc'`

**Styling not working**
- Solution: Make sure Tailwind classes are spelled correctly

## 📦 File Template Examples

### New Component

```typescript
'use client';

export default function MyComponent() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">My Component</h2>
    </div>
  );
}
```

### New tRPC Endpoint

```typescript
// In server/routers/_app.ts
myNewEndpoint: publicProcedure
  .input(z.object({ 
    param: z.string() 
  }))
  .query(({ input }) => {
    // Your logic here
    return { result: 'success' };
  }),
```

### Using the Endpoint

```typescript
'use client';
import { trpc } from '@/utils/trpc';

export default function MyComponent() {
  const { data } = trpc.myNewEndpoint.useQuery({ param: 'test' });
  
  return <div>{data?.result}</div>;
}
```
