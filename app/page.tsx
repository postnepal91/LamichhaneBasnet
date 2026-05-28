import { readFileSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

// Serve index.html as the homepage
export default function Home() {
  // This won't work on edge - we use the route below
  return null;
}

export async function generateMetadata() {
  return {
    title: 'लमिछाने बस्नेत | इतिहास, कुलपूजा र सांस्कृतिक विरासत',
  };
}
