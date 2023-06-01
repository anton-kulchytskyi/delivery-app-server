require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const shopsRouter = require('./routes/shops')
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/shops', shopsRouter);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('connection to database'));

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
