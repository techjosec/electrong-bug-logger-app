import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { Button, Badge } from 'react-bootstrap';

const setVariantOfProirity = ( priority ) =>
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
			<Badge variant={setVariantOfProirity( priority )} className="p-2">

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
			<Button title="remove" variant="danger" size="sm">x</Button>
		</td>

	</tr>
);

LogItem.propTypes = {
	log: PropTypes.object.isRequired,
};

export default LogItem;
