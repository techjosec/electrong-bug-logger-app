/* eslint-disable no-console */
const path = require( `path` );
const url = require( `url` );
const {
	app, BrowserWindow, ipcMain, Menu,
} = require( `electron` );
const Log = require( `./models/Log` );
const connectDB = require( `./config/db` );
connectDB();

let mainWindow;

let isDev = false;
const isMac = process.platform === `darwin`;

if (
	process.env.NODE_ENV !== undefined
	&& process.env.NODE_ENV === `development`
)
{
	isDev = true;
}

/** Sends all logs items to mainWindow */
const sendLogs = async () =>
{
	try
	{
		const logs = await Log.find( {} ).sort( { created: 1 } );
		mainWindow.webContents.send( `logs:get`, JSON.stringify( logs ) );
	}
	catch ( err )
	{
		console.error( err );
		process.exit( 1 );
	}
};
ipcMain.on( `logs:load`, sendLogs );

/** Add a new log item into DB */
const addLog = async ( log ) =>
{
	try
	{
		await Log.create( log );
		await sendLogs();
	}
	catch ( error )
	{
		console.error( error );
	}
};
ipcMain.on( `logs:add`, ( _e, log ) => addLog( log ) );

/** Delete a log item by the _id value */
const deleteLog = async ( _id ) =>
{
	await Log.findOneAndDelete( { _id } );
	await sendLogs();
};
ipcMain.on( `logs:delete`, ( _e, _id ) => deleteLog( _id ) );

const clearLogs = async () =>
{
	await Log.deleteMany( {} );
	mainWindow.webContents.send( `logs:clear` );
};

function createMainWindow()
{
	mainWindow = new BrowserWindow( {
		width          : isDev ? 1400 : 1100,
		height         : 800,
		show           : false,
		icon           : `${__dirname}/assets/icon.png`,
		webPreferences : {
			nodeIntegration: true,
		},
	} );

	let indexPath;

	if ( isDev && process.argv.indexOf( `--noDevServer` ) === -1 )
	{
		indexPath = url.format( {
			protocol : `http:`,
			host     : `localhost:8080`,
			pathname : `index.html`,
			slashes  : true,
		} );
	}
	else
	{
		indexPath = url.format( {
			protocol : `file:`,
			pathname : path.join( __dirname, `dist`, `index.html` ),
			slashes  : true,
		} );
	}

	mainWindow.loadURL( indexPath );

	// Don't show until we are ready and loaded
	mainWindow.once( `ready-to-show`, () =>
	{
		mainWindow.show();

		// Open devtools if dev
		if ( isDev )
		{
			const {
				default: installExtension,
				REACT_DEVELOPER_TOOLS,
			// eslint-disable-next-line global-require
			} = require( `electron-devtools-installer` );

			// eslint-disable-next-line no-console
			installExtension( REACT_DEVELOPER_TOOLS ).catch( ( err ) => console.log( `Error loading React DevTools: `, err ) );
			mainWindow.webContents.openDevTools();
		}
	} );

	mainWindow.on( `closed`, () =>
	{
		mainWindow = null;
	} );
}

const menu = [
	...( isMac ? [{ role: `appMenu` }] : [] ),
	{
		role: `fileMenu`,
	},
	{
		role: `editMenu`,
	},
	{
		label   : `Logs`,
		submenu : [
			{
				label : `Clear Logs`,
				click : () => clearLogs(),
			},
		],
	},
	...( isDev ? [

		{
			label   : `Developer`,
			submenu : [
            	{ role: `reload` },
            	{ role: `forcereload` },
            	{ role: `separator` },
            	{ role: `toggledevtools` },
			],
		},

	] : [] ),

];

app.on( `ready`, () =>
{
	createMainWindow();
	const mainMenu = Menu.buildFromTemplate( menu );
	Menu.setApplicationMenu( mainMenu );
} );

app.on( `window-all-closed`, () =>
{
	if ( process.platform !== `darwin` )
	{
		app.quit();
	}
} );

app.on( `activate`, () =>
{
	if ( mainWindow === null )
	{
		createMainWindow();
	}
} );

// Stop error
app.allowRendererProcessReuse = true;
