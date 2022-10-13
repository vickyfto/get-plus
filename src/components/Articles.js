import {
  Card,
  Col,
  Row,
  Spin,
  Image,
  Button,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import {
  addArticle,
  getArticles,
  singleArticle,
  deleteArticle,
} from "../services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Articles = () => {
  const [form] = Form.useForm();
  const { Meta } = Card;
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [limit, setLimit] = useState(10);

  const {
    data: articles,
    isLoading,
    isFetching,
  } = useQuery(["articles", limit], () => getArticles(limit), {
    retry: false,
  });

  console.log("articles:", articles);

  const newArticle = useMutation(["addArticle"], addArticle, {
    onSuccess: () => queryClient.invalidateQueries(["articles"]),
    onSettled: () =>
      message.success(
        "i did refetch allArticle and the data has been succesfully add, but it placed to the last index. please see network devtools"
      ),
  });

  const onFinish = (values) => {
    newArticle.mutate(values);
    setIsModalOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { data: editArticle } = useQuery(["todos", selectedId], () =>
    singleArticle(selectedId)
  );

  const deleteMutation = useMutation(deleteArticle, {
    onSuccess: () => queryClient.invalidateQueries(["articles"]),
    onSettled: () => message.success("deleted"),
  });

  const handleEdit = (article) => {
    setSelectedId(article.id);
    alert("i got data (look at the console), need to verify to owner api");
    console.log("editArticle:", editArticle);
  };

  const handleDelete = (article) => {
    deleteMutation.mutate(article.id);
  };

  // React.useEffect(() => {
  //   form.setFieldsValue({
  //     user: editArticle,
  //     comment: editArticle,
  //   });
  // }, [editArticle]);

  return (
    <>
      <Row justify="end" style={{ padding: "10px 0 " }}>
        <Col>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Add Article
          </Button>
        </Col>
      </Row>

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
          {articles?.map((article) => {
            return (
              <Col key={article.createBy} xs={24} sm={12} md={8} lg={8}>
                <Card
                  cover={
                    <Image preview={false} alt="example" src={article.image} />
                  }
                  actions={[
                    <EditOutlined
                      key="edit"
                      onClick={() => handleEdit(article)}
                    />,
                    <DeleteOutlined
                      key="delete"
                      onClick={() => handleDelete(article)}
                    />,
                  ]}
                >
                  <Meta
                    title={article.createBy}
                    description={
                      <div
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          width: "100%",
                          height: "1.5em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {article.content}
                      </div>
                    }
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      <Row justify="center">
        <Col style={{ padding: "30px 0" }}>
          <Button size="large" onClick={() => setLimit(limit + 10)}>
            Show More
          </Button>
        </Col>
      </Row>

      {/* // modal show when trigger add or edit */}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="User"
            name="user"
            rules={[{ required: true, message: "Please input your User!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Comment"
            name="comment"
            rules={[{ required: true, message: "Please input your Comment!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Articles;
