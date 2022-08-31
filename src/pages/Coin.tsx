import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

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

  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(` https://api.coinpaprika.com/v1/coins/${id}`)
      ).json();
      const priceData = await (
        await fetch(` https://api.coinpaprika.com/v1/tickers/${id}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [id]);

  return (
    <Container>
      <Header>
        {/* url 바로 치고 들어오는 비정상 접근 경우 해결 */}
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {!loading ? null : <Loader>loading...</Loader>}
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
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  padding: 20px 0px;
  text-align: center;
  display: block;
`;
