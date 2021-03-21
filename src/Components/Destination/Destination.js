import React, { useState } from 'react';
import { Button, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import fakeData from '../../FakeData/FakeData';
import SimpleMap from './Map';

const Destination = () => {
    const {placeName} = useParams();
    const destination = fakeData.find(place => place.name === placeName);
    const {location,lat, lng} = fakeData.find(place => place.name === placeName);

    // Differences of days
    const [stay, setStay] = useState({from:0, to:0});
    const fromDay = new Date(stay.from);
    const toDay = new Date(stay.to);
    const diff = toDay - fromDay;
    const totalDays = (((diff/1000)/3600)/24);
    const disable = totalDays < 1;
    
    return (
    <section className="destination text-white">
    <Container>
    <Row className="align-items-center">

    <Col lg={5} className="mb-5 mb-lg-0">

        <Form className="text-dark" >
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text className="bg-warning">Destination</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl required className="bg-white" aria-label="destination" readOnly value={destination.journey} />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text className="bg-warning">From</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl required name="from" type="date" onChange={(e) => {
                    const newFrom = {...stay};
                    newFrom.from = e.target.value;
                    setStay(newFrom)
                    }} />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text className="bg-warning">To</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl required name="to" type="date" onChange={(e) => {
                    const newTo = {...stay};
                    newTo.to = e.target.value;
                    setStay(newTo)
                    }} />
            </InputGroup>

            <Button variant="primary" type="submit" className=" btn-block">Search</Button>
            <br/>
            
            <Link className="link" to={`/going/${location}`}>
            <Button disabled={disable} variant="success" type="submit" className="btn-large btn-block">                                  
                {
                disable ?
                'You cannot hire for less then 1 day' :
                `Hire For ${totalDays} Days`
                }
            </Button>
            </Link>
        </Form>
    </Col>
    <Col md={6} className="my-6">
        <SimpleMap name={location} lat={lat} lng={lng} />
    </Col>
    
    </Row>
    </Container>
    </section>
    )
};

export default Destination;