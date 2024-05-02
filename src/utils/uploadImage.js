export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "heet_upload");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/inam/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    console.log(response);
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.log(error);
    return null;
  }
};
