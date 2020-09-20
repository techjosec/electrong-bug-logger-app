import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { Container, Table, Alert } from 'react-bootstrap';
import swal from 'sweetalert';

import LogItem from './LogItem';
import AddLogItem from './AddLogItem';

const initialLogsState = [];
const initialAlertState = {
	show    : false,
	variant : `success`,
	message : ``,
};

const App = () =>
{
	const [logs, setLogs] = useState( initialLogsState );
	const [alert, setAlert] = useState( initialAlertState );

	useEffect( () =>
	{
		ipcRenderer.send( `logs:load` );

		ipcRenderer.on( `logs:get`, ( _e, _logs ) =>
		{
			setLogs( JSON.parse( _logs ) );
		} );
	}, [] );

	const showAlert = ( message, variant = `success`, seconds = 3 ) =>
	{
		setAlert( {
			show: true,
			variant,
			message,
		} );

		setTimeout( () =>
		{
			setAlert( initialAlertState );
		}, seconds * 1000 );
	};

	const confirmLogItemDelete = ( _id ) =>
	{
		swal( {
			title      : `Are you sure?`,
			text       : `You are deleting a log item`,
			icon       : `warning`,
			buttons    : true,
			dangerMode : true,
		} )
			.then( ( willDelete ) =>
			{
				if ( willDelete )
				{
					setLogs( logs.filter( ( log ) => log._id !== _id ) );
					showAlert( `Log item removed` );
				}
			} );
	};

	const deleteLogItem = ( _id ) =>
	{
		confirmLogItemDelete( _id );
	};

	const addLogItem = ( item ) =>
	{
		const newItem = {
			...item,
			_id     : Math.floor( Math.random() * 90000 ) + 10000,
			created : new Date(),
		};
		setLogs( [...logs, newItem] );

		showAlert( `Log added` );
	};

	return (

		<Container>
			<h1 className="text-center">Buglogger App</h1>
			<AddLogItem addLogItem={addLogItem} />
			{ alert.show && <Alert variant={alert.variant}>{alert.message}</Alert> }
			<Table>

				<thead>

					<tr>
						<th>Priority</th>
						<th>Text</th>
						<th>User</th>
						<th>Created</th>
						<th> </th>
					</tr>

				</thead>

				<tbody>

					{
						logs.map( ( log ) => (
							<LogItem key={log._id} deleteLogItem={deleteLogItem} log={log} />
						) )
					}

				</tbody>

			</Table>

		</Container>

	);
};

export default App;
