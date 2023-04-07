const { Schema, model } = require('mongoose');
const reactions = require('./Reactions');
const moment = require('moment');

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: [1, "must have text"],
            max: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref:"users"
        },
        reactions: [reactions],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
);

thoughtsSchema.virtual('timestamper').get(function(){
    return moment(this.createdAt).format('MMM Do, YYYY at hh:mm a');
});

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;