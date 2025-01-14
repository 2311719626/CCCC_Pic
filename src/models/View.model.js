const mongoose = require('mongoose')
const {Schema} = mongoose

const viewSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        default: undefined
    }
},
{
    timestamps: true
})

const View = mongoose.model('View', viewSchema)

module.exports = {
    View
}
