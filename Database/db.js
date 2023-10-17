const mongoose = require('mongoose')

const connect = (url) => {
    mongoose.set('strictQuery', false)
    mongoose.connect(url, {})
}

module.exports = connect
