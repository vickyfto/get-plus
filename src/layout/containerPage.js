import { Col, Row } from "antd";
import React from "react";

const ContainerPage = ({ children }) => {
  return (
    <Row justify="center" style={{ marginTop: "20px" }}>
      <Col
        xs={22}
        md={22}
        sm={22}
        lg={20}
        // style={{ border: "1px solid black" }}
      >
        {children}
      </Col>
    </Row>
  );
};

export default ContainerPage;
