// <a href=''> 를 사용하는 것은 페이지를 새로고침해버리기 때문에, 정보가 날아갈 수 있음. 사용해선 안됨!
// Link는 페이지 새로고침 하지 않음.
import { Link } from "react-router-dom";
import styled from "styled-components";

const Coins = () => {
  const infos = [
    {
      id: "btc-bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      rank: 1,
      is_new: false,
      is_active: true,
      type: "coin",
    },
    {
      id: "eth-ethereum",
      name: "Ethereum",
      symbol: "ETH",
      rank: 2,
      is_new: false,
      is_active: true,
      type: "coin",
    },
    {
      id: "hex-hex",
      name: "HEX",
      symbol: "HEX",
      rank: 3,
      is_new: false,
      is_active: true,
      type: "token",
    },
  ];

  const coins = infos.map((coin) => (
    // arrow 등 특수문자 추가
    <Coin key={coin.id}>
      <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
    </Coin>
  ));
  return (
    <>
      <Container>
        <Header>
          <Title>Coins</Title>
        </Header>
        <CoinList>{coins}</CoinList>
      </Container>
    </>
  );
};

export default Coins;

const Container = styled.div`
  padding: 10px 20px;
`;

const Header = styled.div``;

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${(props) => props.theme.accentColor};
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
    transition: color 0.2s ease-in;
    display: block; // card 끝까지 늘려 클릭 가능하게 조정.
    padding: 20px; // card 내부 모두 클릭 가능.
  }
  &:hover {
    cursor: pointer;
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
