import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error(
    "Missing Cloudinary configuration. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
  );
}

cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

export async function uploadAvatar(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const dataUrl = `data:${file.type};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(dataUrl, {
    folder: "board-game-tracker/avatars",
    transformation: [
      { width: 200, height: 200, crop: "fill", gravity: "face" },
    ],
  });

  return result.secure_url;
}
