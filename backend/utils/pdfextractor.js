import pdfreader from 'pdfreader';

const { PdfReader } = pdfreader;

const extractTextFromPDF = (filePath) => {
    return new Promise((resolve, reject) => {
        let text = "";

        new PdfReader().parseFileItems(filePath, (err, item) => {
            if (err) {
                reject(err);
            } else if (!item) {
                resolve(text.trim()); // End of file, return collected text
            } else if (item.text) {
                text += item.text + " "; // Collect text
            }
        });
    });
};

export default extractTextFromPDF;
