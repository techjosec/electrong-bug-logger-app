import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
	Card, Form, Row, Col, Button,
} from 'react-bootstrap';

const AddLogItem = ( { addLogItem } ) =>
{
	const [text, setText] = useState( `` );
	const [user, setUser] = useState( `` );
	const [priority, setPriority] = useState( `` );

	const onSubmit = ( e ) =>
	{
		e.preventDefault();

		addLogItem( { text, user, priority } );
	};

	return (

		<Card className="mt-5 mb-3">
			<Card.Body>
				<Card.Title className="text-center">Add new Log</Card.Title>
				<Form onSubmit={onSubmit}>

					<Row className="my-3">

						<Col>

							<Form.Control placeholder="Log" value={text} onChange={( e ) => setText( e.target.value )} required />

						</Col>

					</Row>

					<Row>

						<Col>

							<Form.Control placeholder="User" value={user} onChange={( e ) => setUser( e.target.value )} required />

						</Col>

						<Col>

							<Form.Control as="select" value={priority} onChange={( e ) => setPriority( e.target.value )} required>

								<option value="0">Select Priority</option>
								<option value="low">Low</option>
								<option value="moderate">Moderate</option>
								<option value="high">High</option>

							</Form.Control>

						</Col>

					</Row>

					<Row className="my-3">

						<Col>

							<Button type="submit" variant="secondary" block>Add Log</Button>

						</Col>

					</Row>

				</Form>
			</Card.Body>
		</Card>

	);
};

AddLogItem.propTypes = {
	addLogItem: PropTypes.func.isRequired,
};

export default AddLogItem;
