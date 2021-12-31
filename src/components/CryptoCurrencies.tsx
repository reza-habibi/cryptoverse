import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { ICoins } from "../type";
import Loader from "./Loader";

const CryptoCurrencies = ({ simplified }: any) => {
  const count = simplified ? 10 : 100;
  //@ts-ignore
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin: ICoins) =>
      coin.name.toLocaleLowerCase().includes(searchTerms.toLocaleLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerms]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search cryptocurrencies"
            onChange={(e) => setSearchTerms(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency: any) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                // eslint-disable-next-line jsx-a11y/alt-text
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price:{millify(currency.price)}</p>
                <p>Market Cap:{millify(currency.marketCap)}</p>
                <p>Daily Change:{millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CryptoCurrencies;