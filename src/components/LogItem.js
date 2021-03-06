import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { Button, Badge } from 'react-bootstrap';

const setVariantOfPriority = ( priority ) =>
{
	switch ( priority )
	{
	case `high`:
		return `danger`;

	case `moderate`:
		return `warning`;

	default: return `success`;
	}
};

const LogItem = ( {
	deleteLogItem,
	log: {
		priority,
		text,
		user,
		created,
		_id,
	},
} ) => (
	<tr>

		<td>
			<Badge variant={setVariantOfPriority( priority )} className="p-2">

				{ /** Capitalized first char for the text */ }
				{ `${priority.charAt( 0 ).toUpperCase()}${priority.slice( 1 )}` }

			</Badge>
		</td>
		<td>{text}</td>
		<td>{user}</td>
		<td>
			<Moment format="MMMM Do YYYY, h:mm:ss a">
				{created}
			</Moment>
		</td>
		<td>
			<Button title="remove" variant="danger" size="sm" onClick={() => deleteLogItem( _id )}>x</Button>
		</td>

	</tr>
);

LogItem.propTypes = {
	log           : PropTypes.object.isRequired,
	deleteLogItem : PropTypes.func.isRequired,
};

export default LogItem;
