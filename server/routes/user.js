// for user related routes
const jwt = require("jsonwebtoken");
const { getDb } = require("../connection");
const router = require("express").Router();
const authCode = "bhhs";
const mongodb = require("mongodb");

router.post("/users/signup", async (req, res) => {
    // * accessing mongodb
    try {
        const db = getDb();
        // finding a user with an email
        const userExist = await db
            .collection("users")
            .find({ email: req.body.email })
            .next();
        // ! duplicate email error ((422) = validation error))
        if (userExist) {
            res.status(422).json("[info]:email already exists");
            return;
        }

        // authentication code validation
        if (authCode !== req.body.authCode) {
            res.status(422).json("[info]:wrong authentication code");
            return;
        }

        // credential creation
        const mongoRes = await db.collection("users").insertOne(req.body);
        req.body._id = mongoRes.insertedId;
        // token creation via JWT
        let token = jwt.sign({ userId: mongoRes.insertedId }, "asdFWT1");
        res.json({
            token,
            user: req.body,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json("[info]:something went wrong :(");
        return;
    }
});

router.post("/users/login", async (req, res) => {
    try {
        const db = getDb();
        // finding a user with an email
        const user = await db
            .collection("users")
            .find({ email: req.body.email, password: req.body.password })
            .next();
        // ! duplicate email error ((422) = validation error))
        if (!user) {
            res.status(422).json("[info]:wrong email and/or password");
            return;
        }

        // jwt token creation
        let token = jwt.sign({ userId: user._id }, "asdFWT1");
        res.json({
            token,
            user,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json("[info]:something went wrong :(");
        return;
    }
});
// keeping the user logged in (stop them from getting logged out constantly)
router.get("/users/profile", async (req, res) => {
    try {
        const db = getDb();
        // fe sends token using Authorization Header (like in insomnia)
        const token = req.get("Authorization");
        // token is verified
        const tokenData = jwt.verify(token, "asdFWT1");
        // using the userId stored in the token we get the actual user from the db.
        const user = await db
            .collection("users")
            // finding the user with userId/ convert it from a string to an object
            .find({ _id: new mongodb.ObjectId(tokenData.userId) })
            .next();
        // sending the users profile back to the fe in JSON
        res.json(user);
    } catch (err) {
        res.status(500).json("[info]: token not valid, auhtnetication failed.");
    }
});

module.exports = router;
