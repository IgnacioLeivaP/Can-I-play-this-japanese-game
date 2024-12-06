import { createWorker } from 'tesseract.js';

export async function processImage(file: File): Promise<string> {
  try {
    // Crear worker con soporte para japonés y español
    const worker = await createWorker({
      logger: m => console.debug(m)
    });

    // Cargar los idiomas necesarios
    await worker.loadLanguage('jpn+eng');
    await worker.initialize('jpn+eng');
    
    // Configurar parámetros para mejorar el reconocimiento
    await worker.setParameters({
      tessedit_pageseg_mode: '1', // Modo de segmentación automática
      preserve_interword_spaces: '1',
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろわをんァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロワヲンヴヵヶ一丁七万丈三上下不与丑且世丘丙両並中丸',
    });
    
    // Convert File to image URL
    const imageUrl = URL.createObjectURL(file);
    
    // Pre-procesar la imagen si es necesario
    const processedImage = await preprocessImage(imageUrl);
    
    // Recognize text
    const { data: { text } } = await worker.recognize(processedImage);
    
    // Clean up
    URL.revokeObjectURL(imageUrl);
    await worker.terminate();
    
    return text.trim();
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Failed to process image');
  }
}

async function preprocessImage(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Ajustar tamaño del canvas
      canvas.width = img.width;
      canvas.height = img.height;

      // Dibujar imagen original
      ctx.drawImage(img, 0, 0);

      // Aplicar mejoras para OCR
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Convertir a escala de grises y aumentar contraste
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const adjusted = avg > 127 ? 255 : 0; // Binarización
        data[i] = adjusted;     // R
        data[i + 1] = adjusted; // G
        data[i + 2] = adjusted; // B
      }

      ctx.putImageData(imageData, 0, 0);

      // Convertir canvas a URL de datos
      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageUrl;
  });
}