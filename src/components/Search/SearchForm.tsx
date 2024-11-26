import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchParam from "./SearchParam";
import TripList from "./TripList";

const SearchForm: React.FC = () => {
  return (
    <Container fluid className="mt-4">
       <h1 className="text-black fw-bold mb-4 d-flex justify-content-center align-items-center">Find your best trip</h1>
      <Row>
        <Col xs={12} md={4} lg={3} className="bg-light p-3">
          <SearchParam />
        </Col>
        <Col xs={12} md={8} lg={9} className="p-3">
          <h2 className="mb-4">All trips</h2>
          <TripList />
        </Col>
      </Row>
    </Container>
  );
};

export default SearchForm;
