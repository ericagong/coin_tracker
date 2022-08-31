import { useParams } from "react-router-dom";

// interface Params {
//   id: string;
// }

const Coin = () => {
  // rrd v6 부터 useParams 쓰는 순간 type이 string | undefined 로 되므로 설정할 필요 없음.
  const { id } = useParams();
  // const { id } = useParams<Params>();
  return <>Coin {id}</>;
};

export default Coin;
