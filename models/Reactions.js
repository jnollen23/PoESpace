const {Schema} = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: new Schema.Types.ObjectId(),
        },
        reactionBody:{
            type:String,
            required:true,
            min:[1, 'Must enter text'],
            max:280,
        },
        username:{
            type:String,
            required:true,
        },
        createdAt:{
            type:Date,
            default:Date.now,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        _id:false,
    }
);

reactionSchema.virtual('timestamper').get(function(){
    return moment(this.createdAt).format('MMM Do, YYYY at hh:mm a');
});

module.exports = reactionSchema;