export const uploadToCloudinary = async file => {
  const formData = new FormData();
  formData.append('file', file);
  console.log('Uploading file:', file);
  formData.append('upload_preset', 'blog_app');
  console.log('Sending to Cloudinary:', file);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dgjdrbiys/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    console.error('Upload failed:', err);
    return null;
  }
};
