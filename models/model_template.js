const mongoose = require('mongoose');

const ___Schema = mongoose.Schema( // update schemaName
    {
        // update fields
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        ads: [ // [] -> one to many relation ship  
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Ad" // update table name
            }
        ]
    },
    {
        timestamps: { // auto generate created and updated dates
            createdAt: true, updatedAt: true
        }
    }
);


// compiling our schema into a Model
const collectionName = '___'; // add collectionName ( table name )
const ___Model = mongoose.model(collectionName, ___Schema); // update model Name

module.exports = ___Model;