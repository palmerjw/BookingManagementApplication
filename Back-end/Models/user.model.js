const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema
({
    username:
    {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password:
    {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
	firstName:
	{
		type: String,
		required: true,
		unique: false,
		trim: true		
	},
	lastName:
	{
		type: String,
		required: true,
		unique: false,
		trim: true
	},
	email:
	{
		type: String,
		required: true,
		unique: true,
		trim: true,
		minlength: 5
	},
},
{
    timestamps: true,
    });

const User = mongoose.model("User", userSchema);

module.exports = User;
