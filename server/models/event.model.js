const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');


const Event = Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    status: {
        type: String,
        default: "pending"
    },
    requestedDate: {
        type: [String],
        required: true
    },
    approvedDate: {
        type: String,
        default: ''
    },
    activity: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        },
    },
    remarks: {
        type: String,
        default: ''
    },
    vendor: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, {
    timestamps: true
});

Event.plugin(mongoosePaginate);

mongoose.model("event", Event, "event");
