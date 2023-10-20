import express, { response } from 'express'
import bodyParser from 'body-parser'
import { userRouter } from './routes/actionsRouting.js';
import { db } from './models/index.js';
import 'dotenv/config'

const app = express();
const port = process.env.PORT;

app.set('view engine', "ejs");
app.use(express.json());
app.use(bodyParser.json())

app.use('/actions', userRouter);

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Synced");
    })
    .catch((err) => {
        console.log("Failed sync " + err.message);
    })

app.use(function (req, res, next){
    res.status(404).send("Not Found")
})
app.listen(port, () => {
    console.log();
});

