import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    // Get the public directory path
    const publicDir = path.join(process.cwd(), 'public');
    const imagesDir = path.join(publicDir, 'images');
    
    // Read all files in the images directory
    const files = await fs.readdir(imagesDir);
    
    // Filter to include only image files (common image extensions)
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'].includes(ext);
    });
    
    return NextResponse.json(imageFiles);
  } catch (error) {
    console.error('Error reading image directory:', error);
    return NextResponse.json({ error: 'Failed to load images' }, { status: 500 });
  }
}