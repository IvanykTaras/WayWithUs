import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import SearchParam from "./SearchParam";
import TripList from "./TripList";
import { Sidebar, Menu, SubMenu, MenuItem } from "react-pro-sidebar";
import { IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import { BaseButton } from "@radix-ui/themes/dist/cjs/components/base-button";
import { TripPlan } from "../../interfaces/TripPlan";
import { dataContext, DataEnum } from "../../App";
import { IGoogleUser } from "../../interfaces/IGoogleUser";

const SearchForm: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [trips, setTrips] = useState<TripPlan[]>([]);
  const [users, setUsers] = useState<IGoogleUser[]>([]);
  const context = useContext(dataContext);

  useEffect(() => {
    context[DataEnum.DownloadTrips].set(!context[DataEnum.DownloadTrips].value);
    setUsers(context[DataEnum.Users].value);
    setTrips(context[DataEnum.Trips].value);
  }, []); 

  const filteredTrips = trips.filter(
  (trip) => trip.participants.length < trip.groupType
);


  return (
    <Container fluid>
      <Row>
        {/* <Col xs={12} md={4} lg={3} className="bg-light p-3"> 
          <SearchParam />
        </Col> */}
        <Sidebar style={{padding:"0", borderTop:"1px solid #efefef", position:"sticky", top:"0vh", height:"90vh"}} collapsed={collapsed} collapsedWidth="50px" width="350px">
          <div style={{padding:".75rem"}}>
            <Button variant="outline-dark" onClick={()=>setCollapsed(!collapsed)} style={{width:"100%",padding:".25rem 0"}}><b>{ collapsed ? <IoMdMenu/> : <><IoMdMenu/> Hide</>}</b></Button>
            {!collapsed && <SearchParam trips={trips} setTrips={setTrips}/>}
          </div>
        </Sidebar>
        <Col className="p-3">
          <h2 className="mb-4">All trips {filteredTrips.length}</h2>
          <TripList trips={trips} users={users}/>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchForm;
