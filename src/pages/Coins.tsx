import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  const [infos, setInfos] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ()(); function 바로 실행하는 방법
    (async () => {
      const resp = await fetch("https://api.coinpaprika.com/v1/coins");
      // fetch에는 한번 더 await 사용 필요
      const json = await resp.json();
      setInfos(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  const coins = infos.map((coin) => (
    // arrow 등 특수문자 추가
    <Coin key={coin.id}>
      <Link to={`/${coin.id}`}>
        <Img
          src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
          alt={`${coin.symbol.toLowerCase()}_img`}
        />
        {coin.name} &rarr;
      </Link>
    </Coin>
  ));
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

const Coin = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    display: flex;
    transition: color 0.2s ease-in;
    align-items: center;
    padding: 20px; // card 내부 모두 클릭 가능.
  }
  &:hover {
    cursor: pointer;
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;
