import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
	Card, Form, Row, Col, Button, Accordion,
} from 'react-bootstrap';

const AddLogItem = ( { addLogItem } ) =>
{
	const [text, setText] = useState( `` );
	const [user, setUser] = useState( `` );
	const [priority, setPriority] = useState( `` );
	const [accordionState, setAccordionState] = useState( true );

	const onChangeAccordionState = ( newState ) =>
	{
		setAccordionState( newState );
	};

	const onSubmit = ( e ) =>
	{
		e.preventDefault();

		addLogItem( { text, user, priority } );
		setText( `` );
		setUser( `` );
		setPriority( `` );
	};

	return (

		<Accordion>
			<Card className="mt-5 mb-3">

				<Card.Header className="text-right">

					<Accordion.Toggle
						as={Button}
						variant="button"
						eventKey="0"
						className={accordionState ? `btn-success` : `btn-primary`}
						onClick={() => onChangeAccordionState( !accordionState )}
					>
						{ ( accordionState ? `+ Add Log` : `Close` ) }
					</Accordion.Toggle>

				</Card.Header>

				<Accordion.Collapse eventKey="0">
					<Card.Body>
						<Card.Title className="text-center">Add new Log</Card.Title>
						<Form onSubmit={onSubmit}>

							<Row className="my-3">

								<Col>

									<Form.Control name="log" placeholder="Log or issue" value={text} onChange={( e ) => setText( e.target.value )} required />

								</Col>

							</Row>

							<Row>

								<Col>

									<Form.Control name="user" placeholder="User" value={user} onChange={( e ) => setUser( e.target.value )} required />

								</Col>

								<Col>

									<Form.Control name="priority" as="select" value={priority} onChange={( e ) => setPriority( e.target.value )} required>

										<option value="">Select Priority</option>
										<option value="low">Low</option>
										<option value="moderate">Moderate</option>
										<option value="high">High</option>

									</Form.Control>

								</Col>

							</Row>

							<Row className="my-3">

								<Col>

									<Button type="submit" variant="secondary" block>Add</Button>

								</Col>

							</Row>

						</Form>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>

	);
};

AddLogItem.propTypes = {
	addLogItem: PropTypes.func.isRequired,
};

export default AddLogItem;
