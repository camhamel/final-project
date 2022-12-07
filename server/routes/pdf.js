const { getDb } = require("../connection");
const router = require("express").Router();
const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");

// Storing a pdf
router.post("/pdf", async (req, res) => {
    try {
        // * imported from user.js ("/profile")
        const db = getDb();
        // fe sends token using Authorization header (like in insomnia)
        const token = req.get("Authorization");
        // token is verified
        const tokenData = jwt.verify(token, "asdFWT1");
        // -------------------------
        console.log(req.body);
        // Storing PDF in DB
        const mongoRes = await db.collection("pdfs").insertOne({
            url: req.body.url,
            type: req.body.type,
            folderId: new mongodb.ObjectId(req.body.folderId),
            name: req.body.name,
        });
        req.body._id = mongoRes.insertedId;
        res.json(req.body);
    } catch (err) {
        res.status(500).json("[info]: token not valid, auhtnetication failed.");
    }
});

// * Getting PDF's of a specific folder
router.get("/pdf/:folderId", async (req, res) => {
    try {
        const db = getDb();
        const token = req.get("Authorization");
        const tokenData = jwt.verify(token, "asdFWT1");
        // -------------------------
        const pdfs = await db
            .collection("pdfs")
            .find({
                folderId: new mongodb.ObjectId(req.params.folderId),
            })
            .toArray();
        res.json(pdfs);
    } catch (err) {
        res.status(500).json("[info]: token not valid, auhtnetication failed.");
    }
});

// * Adding PDF name (patch)
router.patch("/pdf/:pdfId", async (req, res) => {
    try {
        const db = getDb();
        const token = req.get("Authorization");
        const tokenData = jwt.verify(token, "asdFWT1");
        // -------------------------
        console.log(req.body);
        const mongoRes = await db.collection("pdfs").updateOne(
            {
                _id: new mongodb.ObjectId(req.params.pdfId),
            },
            {
                $set: {
                    name: req.body.name,
                },
            }
        );

        res.json(mongoRes);
    } catch (err) {
        // res.status(500).json("[info]: token not valid, auhtnetication failed.");
        res.status(500).json(err.message);
    }
});

router.get("/pdf/search/:docType", async (req, res) => {
    try {
        // * imported from user.js ("/profile")
        const db = getDb();
        const token = req.get("Authorization");
        const tokenData = jwt.verify(token, "asdFWT1");
        // -------------------------
        const pdfs = await db
            .collection("pdfs")
            .find({
                type: req.params.docType,
            })
            .toArray();
        res.json(pdfs);
    } catch (err) {
        res.status(500).json(err.messa);
    }
});

router.get("/pdf/search/name/:searchName", async (req, res) => {
    console.log(req.params.searchName);
    try {
        const db = getDb();
        const token = req.get("Authorization");
        const tokenData = jwt.verify(token, "asdFWT1");
        let pdfs = await db.collection("pdfs").find({}).toArray();
        pdfs = pdfs.filter((pdf) =>
            pdf.name.toLowerCase().includes(req.params.searchName.toLowerCase())
        );
        res.json(pdfs);
    } catch (err) {
        res.status(500).json(err.messa);
    }
});

module.exports = router;

// PDF STRUCTURE
// _id
// link (link of the pdf provided by cloudinary)
// folderId (id of the folder to which this pdf belongs)
