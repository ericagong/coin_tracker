import { useEffect, useState } from "react";
import styled from "styled-components";

import Coin from "../components/Coin";

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const [info, setInfo] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ()(); function 바로 실행하는 방법
    (async () => {
      const resp = await fetch("https://api.coinpaprika.com/v1/coins");
      // fetch에는 한번 더 await 사용 필요
      const json = await resp.json();
      setInfo(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  const coins = info.map((coin) => <Coin key={coin.id} {...coin} />);
  return (
    <>
      <Container>
        <Header>
          <Title>Coins</Title>
        </Header>
        {!loading ? <CoinList>{coins}</CoinList> : <Loader>loading...</Loader>}
      </Container>
    </>
  );
};

export default Coins;

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

const CoinList = styled.ul`
  padding: 20px 0px;
`;
