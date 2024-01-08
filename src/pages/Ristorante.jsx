import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedRestaurant, selectSelectedRestaurant } from '../redux/slices/selectedRestaurantIDSlice';

// components
import Navbar from '../components/navbar/Navbar';
import BannerRistorante from '../components/banner/BannerRistorante';

function Ristorante() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // imposta su redux l'ID del ristorante selezionato per ricavarne le informazioni relative
  useEffect(() => { dispatch(setSelectedRestaurant({ id: id })); }, [dispatch, id]);

  // restituisce l'oggetto completo del ristorante selezionato tramite id
  const selectedRestaurant = useSelector(selectSelectedRestaurant(id));
  console.log('selectedRestaurant ➡️', selectedRestaurant)

  return (
    <>
      <Navbar />
      <div className='flex justify-start flex-wrap gap-5'>
        {Object.keys(selectedRestaurant.menu).map((categoryKey) => {
          const category = selectedRestaurant.menu[categoryKey];
          return (
            <div key={categoryKey} className='bg-slate-100 p-4 w-72'>
              <h2>{category.categoryTitle}</h2>
              <ul>
                {
                  category.dishes.map((piatto, index) => (
                    <li key={index}>
                      {piatto.name} - {piatto.price}€
                    </li>
                  ))
                }
              </ul>
            </div>
          );
        })}
      </div>
      <BannerRistorante />
    </>
  );
}

export default Ristorante;