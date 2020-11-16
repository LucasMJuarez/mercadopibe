import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";


dotenv.config()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const uri = "mongodb+srv://lumas89:lumas89@lumas89.y8ptm.mongodb.net/data?retryWrites=true&w=majority"
mongoose.connect(process.env.MONGODB_URL || uri
, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then( console.log('DB is connected'))
.catch(err => console.log(err))
//conectar a mongoose



app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter)
app.get("/", (req, res) => {
  res.send("Server is ready");
});

/* app.use((err, req, res) => {
  res.status(500).send({ message: err.message });
}); */

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
