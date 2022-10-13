import { useQuery } from "@tanstack/react-query";
import { Col, Image, Row, Spin } from "antd";
import React from "react";
import { getBanners } from "../services";

const Home = () => {
  const { data: banners, isLoading } = useQuery(["banners"], getBanners);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Row
          //   [horizontal, vertical]
          gutter={[
            { xs: 0, sm: 16, md: 24, lg: 20 },
            { xs: 10, sm: 16, md: 24, lg: 20 },
          ]}
        >
          {banners?.map((banner, i) => {
            return (
              <>
                <Col key={i} xs={24} sm={12} md={8} lg={8}>
                  <Image
                    style={{ borderRadius: "5px" }}
                    preview={false}
                    src={banner.images}
                  />
                </Col>
              </>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default Home;
