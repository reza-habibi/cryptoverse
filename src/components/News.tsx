import React, { useState } from "react";
import moment from "moment";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { INews, ICoins } from "../type";
import Loader from "./Loader";

const { Title, Text } = Typography;
const { Option } = Select;
const demoImage =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }: any) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrencies");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 12,
  });

  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return <Loader />;
  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="select a crypto"
              optionFilterProp="children"
              onChange={(value: string) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option?.children
                  .toLowerCase()
                  .indexOf(input.toLocaleLowerCase()) >= 0
              }
            >
              <Option value={"Cryptocurrencies"}>Cryptocurrencies</Option>
              {data?.data?.coins.map((coin: ICoins) => (
                <Option value={coin.name}>{coin.name}</Option>
              ))}
            </Select>
          </Col>
        )}

        {cryptoNews?.value.map((news: INews, i: number) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card className="news-card" hoverable>
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title level={4} className="news-title">
                    {news.name}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt=""
                    style={{ maxWidth: "200px", maxHeight: "100px" }}
                  />
                </div>
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)} ...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news?.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt="news"
                    />
                    <Text>{news.provider[0]?.name}</Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf("s").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
