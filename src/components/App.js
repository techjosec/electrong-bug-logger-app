import React, { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import LogItem from './LogItem';
import AddLogItem from './AddLogItem';

const actualDate = new Date();
const initialLogs = [
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

const App = () =>
{
	const [logs, setLogs] = useState( initialLogs );

	const addLogItem = ( item ) =>
	{
		const newItem = {
			...item,
			_id     : Math.floor( Math.random() * 90000 ) + 10000,
			created : new Date(),
		};
		setLogs( [...logs, newItem] );
	};

	return (

		<Container>
			<AddLogItem addLogItem={addLogItem} />
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
						logs.map( ( log ) => ( <LogItem key={log._id} log={log} /> ) )
					}

				</tbody>

			</Table>

		</Container>

	);
};

export default App;
