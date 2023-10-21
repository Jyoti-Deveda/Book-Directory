const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 1000 * 60 * 110
    })
    .then(() => {
        console.log("DB connection successfull")
    })
    .catch((err) => {
        console.log("Issue in DB connection")
        console.log(err)
        process.exit();
    })
}

module.exports = dbConnect;