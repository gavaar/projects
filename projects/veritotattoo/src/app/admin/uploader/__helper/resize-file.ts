export default function resizeFile(file: File, heightInPx = 120): Promise<{ file: File; uri: string, originalUri: string }> {
  return new Promise((resolve) => {
    const img = document.createElement('img');
    const originalUri = URL.createObjectURL(file)
    img.src = originalUri;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ratio = img.width / img.height;

      canvas.height = heightInPx;
      canvas.width = canvas.height * ratio;

      const context = canvas.getContext("2d");
      context.scale(canvas.width / img.width, canvas.height / img.height);
      context.drawImage(img, 0, 0);
      img.remove();
      resolve({ file, originalUri, uri: canvas.toDataURL('image/jpeg') });
    };
  });
}
