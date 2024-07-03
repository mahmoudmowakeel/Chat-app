export default async function fetchAndConvertImage(id) {
  try {
    const response = await fetch(
      `https://academix.runasp.net/api/ChattUsers/GetMessageFile${id}`
    );
    const data = await response.json();
    const fetchedImage = data;
    const byteCharacters = atob(fetchedImage);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}
