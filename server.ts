import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { createClient } from "webdav";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Nextcloud Upload API
  app.post("/api/nextcloud/upload", async (req, res) => {
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
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
