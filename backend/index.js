const port = 4000;
const { request } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

//Database Connection With MongoDB
mongoose.connect("mongodb+srv://doquocphongvbb:doquocphong431999@phongdovbb.qulfa9l.mongodb.net/e-commerce");

//API Creation
app.get("/", (req, res) => {
    res.send("Express app is running");
})

//Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

// Creating upload endpoint for images
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        img_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})


app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " + port);
    } else {
        console.log("Error: " + error);
    }
})
