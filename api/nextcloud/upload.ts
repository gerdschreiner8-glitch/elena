import { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from "webdav";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fileName, userName, fileData } = req.body;

  if (!process.env.NEXTCLOUD_URL || !process.env.NEXTCLOUD_USER || !process.env.NEXTCLOUD_PASS) {
    console.error("Nextcloud credentials missing");
    return res.status(500).json({ error: "Nextcloud configuration missing" });
  }

  try {
    const client = createClient(process.env.NEXTCLOUD_URL, {
      username: process.env.NEXTCLOUD_USER,
      password: process.env.NEXTCLOUD_PASS,
    });

    const folderPath = `/${userName}`;
    
    // Check if folder exists, if not create it
    if (!(await client.exists(folderPath))) {
      await client.createDirectory(folderPath);
    }

    // Convert base64 to buffer
    const base64Data = fileData.split(",")[1];
    const buffer = Buffer.from(base64Data, "base64");

    // Upload file
    await client.putFileContents(`${folderPath}/${fileName}`, buffer);

    res.json({ success: true });
  } catch (error) {
    console.error("Nextcloud upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
}
