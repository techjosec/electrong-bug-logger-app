/* eslint-disable no-console */
const mongoose = require( `mongoose` );
const connectionString = `mongodb://127.0.0.1:27017/buglogger`;
const defaultConnectionOptions = {
	useNewUrlParser    : true,
	useCreateIndex     : true,
	useUnifiedTopology : true,
};

const connectDB = async ( ) =>
{
	try
	{
		await mongoose.connect( connectionString, defaultConnectionOptions );
		console.log( `mongodb connected` );
	}
	catch ( error )
	{
		console.error( error );
		process.exit( 1 );
	}
};

module.exports = connectDB;
