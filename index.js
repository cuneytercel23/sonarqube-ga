const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// File Upload Middleware
app.use(
  fileUpload({
    limits: { fileSize: 250 * 1024 * 1024 }, // 250 MB dosya sınırı
    createParentPath: true,
    defCharset: "utf8",
    defParamCharset: "utf8",
  })
);

// Upload Endpoint
app.post("/upload", (req, res) => {
  console.log(req.files);

  if (!req.files || !req.files.file) {
    return res.status(400).send("No file uploaded.");
  }

  const uploadedFile = req.files.file;
  const uploadPath = path.join(__dirname, "uploads", uploadedFile.name);

  // Save file
  uploadedFile.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
    res.send("File uploaded successfully!");
  });
});

// Create uploads directory if it doesn't exist
const fs = require("fs");
if (!fs.existsSync(path.join(__dirname, "uploads"))) {
  fs.mkdirSync(path.join(__dirname, "uploads"));
}

// Start Server
app.listen(3030, () => {
  console.log("Server is running on http://localhost:3030");
});
