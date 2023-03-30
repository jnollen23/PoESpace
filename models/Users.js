const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,

        },
        toughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thoughts'
        }
        ],
        friends: [
            {
                type:Schema.Types.ObjectId,
                ref:'users',
            },
        ]
    }
);

const Users = model('users', usersSchema);

module.exports = Users;