import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Redis from "redis";
import requestID from "express-request-id";

const clientRedis = Redis.createClient();
await clientRedis.connect();

const app = express();
app.use(cors());
app.use(requestID());
app.use(bodyParser.json());

app.post("/", async (req, res) => {
    await clientRedis.SET(req.id, JSON.stringify(req.body));
    const responseBody = { RequestId: req.id, Amount: req.body.amount };
    res.send(JSON.stringify(responseBody));
});

app.listen(8080, () => {
    console.log("Server is running on 8080");
});
