import { createWorker } from 'tesseract.js';

export async function processImage(file: File): Promise<string> {
  try {
    const worker = await createWorker('spa');
    
    // Convert File to image URL
    const imageUrl = URL.createObjectURL(file);
    
    // Recognize text
    const { data: { text } } = await worker.recognize(imageUrl);
    
    // Clean up
    URL.revokeObjectURL(imageUrl);
    await worker.terminate();
    
    return text.trim();
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Failed to process image');
  }
}