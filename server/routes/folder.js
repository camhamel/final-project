const { getDb } = require("../connection");
const router = require("express").Router();
const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");

// route for creating a folder

router.post("/folders", async (req, res) => {
    try {
        // * imported from user.js ("/profile")
        const db = getDb();
        const token = req.get("Authorization");
        const tokenData = jwt.verify(token, "asdFWT1");
        const mongoRes = await db.collection("folders").insertOne({
            name: req.body.name,
            userId: new mongodb.ObjectId(tokenData.userId),
        });
        const folder = {
            _id: mongoRes.insertedId,
            name: req.body.name,
            userId: tokenData.userId,
        };
        res.json(folder);
    } catch (err) {
        res.status(500).json("[info]: token not valid, auhtnetication failed.");
    }
});

// Getting a specific users' files

router.get("/folders", async (req, res) => {
    try {
        const db = getDb();
        const token = req.get("Authorization");
        const tokenData = jwt.verify(token, "asdFWT1");
        const folders = await db
            .collection("folders")
            .find({ userId: new mongodb.ObjectId(tokenData.userId) })
            .toArray();
        res.json(folders);
    } catch (err) {
        res.status(500).json("[info]: token not valid, auhtnetication failed.");
    }
});

module.exports = router;

// ---------------------------
// * Structure of the folder
// ---------------------------
// _id (id of the folder assigned by mongodb)
// name
// userId (id of the user who created the folder, to know who the owner is)
// ------------------------------------------
// NB pdfs will be in a new collection
