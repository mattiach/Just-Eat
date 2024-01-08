import { useParams } from 'react-router-dom';

// components
import Navbar from '../components/navbar/Navbar';
import BannerRistorante from '../components/banner/BannerRistorante';

function Ristorante() {
  let { id } = useParams();
  return (
    <>
      <Navbar />
      <BannerRistorante />
    </>
  );
}

export default Ristorante;
