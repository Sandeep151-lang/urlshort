const mongoose = require('mongoose');

const url = `mongodb+srv://sandeep:12345@cluster0.q95vx.mongodb.net/urlShortner?retryWrites=true&w=majority`;

const db = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log(`connection successfull`)
}).catch(() => {
    console.log(`connection error`)
})


module.exports = db;