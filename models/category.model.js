const mongoose = require('mongoose');

const adCategorySchema = mongoose.Schema( // update schemaName
    {
        // update fields
        name: {
            type: String,
            required: true,
            unique: true,
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
const collectionName = 'ad_category'; // add collectionName ( table name )
const adCategoryModel = mongoose.model(collectionName, adCategorySchema); // update model Name

module.exports = adCategoryModel;