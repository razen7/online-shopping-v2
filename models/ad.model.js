const mongoose = require('mongoose');

const adSchema = mongoose.Schema( // update schemaName
    {
        // update fields
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user", // update table name
            required: true,
        },
        interestedBuyers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
        ],
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        category: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "adCategory"
            }
        ],
        closedAt: {
            type: Date,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: { // auto generate created and updated dates
            createdAt: true, updatedAt: true
        }
    }
);


// compiling our schema into a Model
const collectionName = 'ad'; // add collectionName ( table name )
const adModel = mongoose.model(collectionName, adSchema); // update model Name

module.exports = adModel;