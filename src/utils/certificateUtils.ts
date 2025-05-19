
import html2canvas from 'html2canvas';

export const generateCertificateImage = async (element: HTMLElement): Promise<string> => {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });
    
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error generating certificate:', error);
    throw new Error('Failed to generate certificate image');
  }
};
