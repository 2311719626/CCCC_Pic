const mongoose = require('mongoose')

async function mongoConnect() {
    try {
        await mongoose.connect(process.env.DB)
        console.log('mongodb connect successful!')
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    mongoConnect
}


