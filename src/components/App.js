import React, { useState } from 'react';
import { Container, Table, Alert } from 'react-bootstrap';
import swal from 'sweetalert';

import LogItem from './LogItem';
import AddLogItem from './AddLogItem';

const actualDate = new Date();
const initialLogsState = [
	{
		_id: 1, text: `This is long one`, priority: `low`, user: `Mabel`, created: actualDate,
	},
	{
		_id: 2, text: `This is long two`, priority: `moderate`, user: `Ariel`, created: actualDate,
	},
	{
		_id: 3, text: `This is long three`, priority: `high`, user: `Jodias`, created: actualDate,
	},
	{
		_id: 4, text: `This is long four`, priority: `moderate`, user: `Lalour`, created: actualDate,
	},
];

const initialAlertState = {
	show    : false,
	variant : `success`,
	message : ``,
};

const App = () =>
{
	const [logs, setLogs] = useState( initialLogsState );
	const [alert, setAlert] = useState( initialAlertState );

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
