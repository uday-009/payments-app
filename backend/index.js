const express = require("express");
const cors = require('cors');

const env = require('dotenv');
env.config();

// express
const app = express();

app.use(cors());
//body parser
app.use(express.json());

const connectDB = require("./db");
const mainRouter = require("./routes");



//connect to db
connectDB();

app.use('/app/v1', mainRouter)

app.get("/", (req, res) => {
    return res.send('hello world')
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`))


