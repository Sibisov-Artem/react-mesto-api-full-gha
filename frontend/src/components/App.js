import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { api } from '../utils/Api';
import { register, login, checkToken } from '../utils/AuthApi';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRouteElement from './ProtectedRoute';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext'


function App() {  //функциональный компонент App

  const location = useLocation();

  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });

  const [currentUser, setCurrentUser] = useState({ name: '', about: '', _id: '' });

  const [email, setEmail] = useState('');

  const [loggedIn, setLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [successAuthResponse, setSuccessAuthResponse] = useState(false);

  function handleEditProfileClick() { // обработчик открытия попап профиля
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() { // обработчик открытия попап добавления места
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() { // обработчик открытия попап аватарки 
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(props) {
    setSelectedCard(props);
  }

  function handleCheckToken() {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token)
        .then((data) => {
          setEmail(data.email);
          setLoggedIn(true);
          navigate(location.pathname); //чтоб оставаться при обновлении страницы на том же месте где и были
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
      api.getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }

  function handleUpdateUser(inputData) {
    setIsLoading(true);
    api.editUser(inputData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function onUpdateAvatar(inputData) {
    setIsLoading(true);
    api.changeAvatar(inputData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      // обновите стейт cards - удаление карточки через filter (не пропускаем свою карточку)
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleAddPlaceSubmit(inputData) {
    setIsLoading(true);
    api.addNewCard(inputData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        //закрытие попапа только в случае успеха
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleRegistration(inputData) {
    register(inputData)
      .then((data) => {
        setSuccessAuthResponse(true);
        setIsInfoTooltipPopupOpen(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setSuccessAuthResponse(false);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleAuthorization(inputData) {
    login(inputData)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setSuccessAuthResponse(true);
        setIsInfoTooltipPopupOpen(true);
        setLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setSuccessAuthResponse(false);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setIsInfoTooltipPopupOpen(false)
  }

  function onSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  useEffect(() => {
    handleCheckToken();
    if (loggedIn) {
      Promise.all([api.getUser(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCards(cardsData);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }, [])

  useEffect(() => {
    handleCheckToken();
  }, [loggedIn])


  return (
    <AppContext.Provider value={{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>

        <div className="root">

          <div className="page">

            <Header
              email={email}
              onSignOut={onSignOut} />

            <Routes>

              {/* sign-up - регистрация */}
              <Route path='/sign-up' element={<Register onRegistration={handleRegistration} />} />

              {/* sign-in - авторизация, вход, страница входа */}
              <Route path='/sign-in' element={<Login onAuthorization={handleAuthorization} />} />
              <Route path="/" element={<ProtectedRouteElement element={Main} loggedIn={loggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />} />

            </Routes>

            {/* 
            <Main
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            /> */}

            <Footer />

          </div>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ImagePopup
            card={selectedCard}
          />

          <PopupWithForm
            name='confirmation-remove'
            title='Вы уверены?'
            submitText='Да'
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={onUpdateAvatar}
          />

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            successAuthResponse={successAuthResponse}
          />

        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;