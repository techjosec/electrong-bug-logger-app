const mongoose = require( `mongoose` );

const LogSchema = mongoose.Schema( {

	text     : { type: String, trim: true, required: [true, `Log text is required`] },
	priority : { type: String, default: `Low`, enum: [`Low`, `Moderate`, `High`] },
	user     : { type: String, trim: true, required: [true, `Log user is required`] },
	created  : { type: Date, default: Date.now },

} );

module.exports = mongoose.model( `Log`, LogSchema );
