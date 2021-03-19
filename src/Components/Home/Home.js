import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Home.css';
import fakeData from '../../FakeData/FakeData';
import { Link } from 'react-router-dom';
const Home = () => {
    const vehicles = fakeData;
    const [showPlace, setShowPlace] = useState(vehicles[0]);
    return (
    <section id="home" className="text-white" >
    <Container >
    <Row >
    <Col lg={14}>
        <Row>
        {
        vehicles.map(vehicle =>
        <Col className="placeName" sm={5} key={vehicle.name}>
            <div onClick={() => setShowPlace(vehicle)} className="small mt-5 text-white text-center d-block bg-transparent">
                <Link to={"/destination/" + showPlace.name} ><img src={vehicle.photo} alt="" className="photo" /></Link>
                
                {vehicle.name}
            </div>
        </Col>)
        }
        </Row>
    </Col>
    
    </Row>
    </Container>
    </section>
    );
};

export default Home;