import {
  useParams,
  useLocation,
  Link,
  Outlet,
  useMatch,
} from "react-router-dom";
// import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import { fetchCoinInfo, fetchCoinPrice } from "../shared/api";
import CoinLayout from "../components/CoinLayout";

// interface Params {
//   id: string;
// }

interface ILocation {
  state: {
    name: string;
  };
}

// interface RouteState {
//   name: string;
// }

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  description: string;
  message: string;
  open_source: boolean;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  // object는 ts에게 더 설명해줘야함.
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Coin = () => {
  // const { id } = useParams<Params>();
  // rrd v6 부터 useParams 쓰는 순간 type이 string | undefined 로 되므로 설정할 필요 없음.
  const { id } = useParams();

  // v5
  // const { state } = useLocation<RouteState>();
  const { state } = useLocation() as ILocation;

  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<IInfoData>();
  // const [priceInfo, setPriceInfo] = useState<IPriceData>();
  const priceMatch = useMatch("/:id/price");
  const chartMatch = useMatch("/:id/chart");

  // without react-query
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(` https://api.coinpaprika.com/v1/coins/${id}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(` https://api.coinpaprika.com/v1/tickers/${id}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [id]);

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    [["info", id]],
    () => fetchCoinInfo(id)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(
    [["price", id]],
    () => fetchCoinPrice(id),
    {
      refetchInterval: 10000, // 10s마다 refetch
    }
  );
  const loading = infoLoading || priceLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        {/* url 바로 치고 들어오는 비정상 접근 경우 해결 */}
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {!loading ? (
        <>
          <CoinLayout info={infoData} priceInfo={priceData} />
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${id}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${id}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet context={{ id: id }} />
          <>
            {/* v6 - outlet 사용 없이 바로 적기 */}
            {/* <Routes>
            <Route path='price' element={<Price />} />
            <Route path='chart' element={<Chart />} />
          </Routes> */}
            {/* v5
					<Switch>
            <Route path={`/${id}/price`}>
              <Price />
            </Route>
            <Route path={`/${id}/chart`}>
              <Chart />
            </Route>
          </Switch> */}
          </>
        </>
      ) : (
        <Loader>loading...</Loader>
      )}
    </Container>
  );
};

export default Coin;

const Container = styled.div`
  padding: 30px 20px;
  max-width: 480px;
  // center
  margin: 0 auto;
`;

const Header = styled.div`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  color: ${(props) => props.theme.accentColor};
  padding-bottom: 30px;
`;

const Loader = styled.span`
  padding: 20px 0px;
  text-align: center;
  display: block;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
