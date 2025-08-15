import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config"
import * as mongoose from "mongoose";
import UserRoute from "./routes/UserRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(
    () => console.log('Connected to MongoDB'),
    err => console.log(err)
)

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/my/user", UserRoute);

app.get('/test', async (req: Request, res: Response) => {
    res.send('Test endpoint');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});