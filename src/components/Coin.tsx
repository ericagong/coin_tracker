import styled from "styled-components";
import { Link } from "react-router-dom";

interface IProps {
  id: string;
  name: string;
  symbol: string;
}

const Coin = ({ id, name, symbol }: IProps) => {
  return (
    <Container>
      {/* rrd v5 */}
      {/* <Link to={{ pathname: `/${coin.id}`, state: { name: name } }} ></Link> */}
      <Link to={`/${id}`} state={{ name: name }}>
        <Img
          src={`https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}`}
          alt={`${symbol.toLowerCase()}_img`}
        />
        {name} &rarr;
      </Link>
    </Container>
  );
};

export default Coin;

const Container = styled.li`
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
