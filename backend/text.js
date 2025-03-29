import Tesseract from 'tesseract.js';

const imagePath = './output-1.png'; // Replace with the path to your .png file

// Perform OCR on the .png file
Tesseract.recognize(
  imagePath,
  'eng', // Language (you can add more languages by using 'eng+deu' for English and German, for example)
  {
    logger: (m) => console.log(m), // Optional: log progress
  }
).then(({ data: { text } }) => {
  console.log('Extracted Text:', text);
  // You can save the text to a file or process it further here
}).catch((err) => {
  console.error('Error with Tesseract OCR:', err);
});
