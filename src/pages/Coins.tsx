import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import { fetchCoins } from "../shared/api";
import Coin from "../components/Coin";

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  /* without react-qeury
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
	*/

  // useQuery hook은 fetcherFunc를 부르고,
  // 해당 함수 진행중 여부에 따라 isLoading 값을 부여
  // 함수 종료되면 data에 함수 리턴값 넣어줌
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);

  // const coins = info.map((coin) => <Coin key={coin.id} {...coin} />);
  const coins = data
    ?.slice(0, 100)
    .map((coin) => <Coin key={coin.id} {...coin} />);
  return (
    <>
      <Container>
        {/* change head of document */}
        <Helmet>
          <title>Coins</title>
        </Helmet>
        <Header>
          <Title>Coins</Title>
        </Header>
        {!isLoading ? (
          <CoinList>{coins}</CoinList>
        ) : (
          <Loader>loading...</Loader>
        )}
        {/* {!loading ? <CoinList>{coins}</CoinList> : <Loader>loading...</Loader>} */}
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
  font-weight: 500;
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
