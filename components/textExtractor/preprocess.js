// import { thresholdFilter } from './filters'; // Add the missing import statement

function preprocessImage(canvas) {
    const ctx = canvas.getContext('2d');
    const image = ctx.getImageData(0,0,canvas.width, canvas.height);
    // blurARGB(image.data, canvas, 1);
    // dilate(image.data, canvas);
    invertColors(image.data);
    thresholdFilter(image.data, 0.5);
    return image;
 }
 function invertColors(pixels) {
    for (var i = 0; i < pixels.length; i+= 4) {
      pixels[i] = pixels[i] ^ 255; // Invert Red
      pixels[i+1] = pixels[i+1] ^ 255; // Invert Green
      pixels[i+2] = pixels[i+2] ^ 255; // Invert Blue
    }
  }
 function thresholdFilter(pixels, level) {
    if (level === undefined) {
    level = 0.5;
    }
    const thresh = Math.floor(level * 255);
    for (let i = 0; i < pixels.length; i += 4) {
    const red = pixels[i];
    const green = pixels[i + 1];
    const blue = pixels[i + 2];
    
    const gray = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    let value;
    if (gray >= thresh) {
        value = 255;
    } else {
        value = 0;
    }
    pixels[i] = pixels[i + 1] = pixels[i + 2] = value;
    }
  }
 
 export default preprocessImage