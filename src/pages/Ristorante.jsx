import { useEffect, useState, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '@redux/slices/cartSlice';
import { setSelectedRestaurant, selectSelectedRestaurant } from '@redux/slices/selectedRestaurantIDSlice';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@components/navbar/Navbar';
import BannerRistorante from '@components/BannerRistorante';
import Footer from '@components/footer/Footer';
import CardRestaurantCategory from '@components/card/CardRestaurantCategory';
const FloatingButton = lazy(() => import('@components/button/FloatingButton'))
const ModalArticle = lazy(() => import('@components/modal/ModalArticle'));

function Ristorante() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [initialRender, setInitialRender] = useState(true);
  const selectedRestaurant = useSelector(selectSelectedRestaurant(id));

  const [selectedArticle, setSelectedArticle] = useState({
    name: '',
    price: 0,
    quantity: 0
  });

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      dispatch(setSelectedRestaurant({ id: id }));
    } else {
      window.scrollTo(0, 0);
    }
  }, [dispatch, id, initialRender]);

  if (!selectedRestaurant) {
    navigate('/orders');
    return null;
  }

  // function to open a modal displaying details of a selected article from a restaurant category card
  const openArticleModalFunction = (dishTakenFromCategoryCard) => {
    const newPiatto = {
      restaurantId: selectedRestaurant.id,
      restaurantCategory: selectedRestaurant.category,
      restaurantName: selectedRestaurant.name,
      restaurantAddress: selectedRestaurant.address,
      restaurantImage: selectedRestaurant.image,
      restaurantShipping: selectedRestaurant.shipping,
      products: {
        name: dishTakenFromCategoryCard.name,
        price: dishTakenFromCategoryCard.price,
        quantity: dishTakenFromCategoryCard.quantity
      }
    };
    setSelectedArticle(newPiatto);
    document.getElementById('modal-restaurant-article').showModal();
  };

  const addToCartFunction = (article) => {
    dispatch(addToCart(article));
  };

  const removeFromCartFunction = (articleClicked) => {
    dispatch(removeFromCart(articleClicked));
  };

  return (
    <>
      <Navbar />
      <BannerRistorante ristorante={selectedRestaurant} />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-2xl lg:max-w-5xl gap-1.5 md:gap-0 my-7 md:my-9 lg:my-16'>
        {selectedRestaurant &&
          Object.keys(selectedRestaurant.menu).map((el, index) => (
            <CardRestaurantCategory
              key={'card-restaurant-category_KEY_' + index}
              category={selectedRestaurant.menu[el]}
              onClick={(dishTakenFromCategoryCard) => openArticleModalFunction(dishTakenFromCategoryCard)}
            />
          ))}
      </div>
      <Suspense fallback={null}>
        <FloatingButton scrollThreshold={200} />
        <ModalArticle
          modalId={"modal-restaurant-article"}
          restaurantId={selectedRestaurant.id}
          selectedArticle={selectedArticle}
          addToCartFunction={() => addToCartFunction(selectedArticle)}
          removeFromCartFunction={removeFromCartFunction}
        />
      </Suspense>
      <Footer />
    </>
  )
}

export default Ristorante;
