export default function fetchAndConvertImageCode(imgcode) {
  const fetchedImage = imgcode;
  const byteCharacters = atob(fetchedImage);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/png" });

  return URL.createObjectURL(blob);
}
