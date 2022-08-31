import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
// interface Params {
//   id: string;
// }

interface Location {
  state: {
    name: string;
  };
}

// interface RouteState {
//   name: string;
// }

const Coin = () => {
  // rrd v6 부터 useParams 쓰는 순간 type이 string | undefined 로 되므로 설정할 필요 없음.
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  // const { id } = useParams<Params>();
  const { state } = useLocation() as Location;
  // v5
  // const { state } = useLocation<RouteState>();

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
