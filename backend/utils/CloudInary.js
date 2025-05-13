import cloudinay from "cloudinary";

// configuration
cloudinay.v2.config({
  cloud_name: "dner4wrgh",
  api_key: "618537885117714",
  api_secret: "5FuBTh-9K6JhOwwPTGUK3ku2mE0",
});

// file upload to cloude
export const fileUploadToCloud = async (path) => {
  const data = await cloudinay.v2.uploader.upload(path);
  return data;
};

// file delete form cloud
export const fileDeleteFromCloud = async (publicId) => {
  await cloudinay.v2.uploader.destroy(publicId);
};
