import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import CardDetail from './CardDetail';
import './components.scss';
import { cardSkin } from '../data/card';

const CardList = ({ setSelectedCard, selectedCard }) => {
  const [cards, setCards] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Estados separados para cada campo do formulário.
  const [name, setName] = useState('Nome');
  const [color, setColor] = useState('#FFA350');
  const [image, setImage] = useState(null);

  const cardShape = cardSkin(color);

  const formData = {
    name,
    color,
    image: cardShape || 'erro',
    id: name.toLocaleLowerCase(),
  };
  useEffect(() => {
    axios
      .get('http://localhost:3000/cards')
      .then((response) => setCards(response.data))
      .catch((err) => {
        console.error('Ops! Ocorreu um erro: ' + err);
      });
  }, []);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleAddCard = () => {
    axios
      .post('http://localhost:3000/cards', formData)
      .then((response) => {
        setCards([...cards, response.data]);
        setName('Name');
        setColor('#FFA350');
        setImage(cardShape);
        handleCloseModal();
      })
      .catch(() => {
        alert(`Cartão ${formData.name} ja existe!`);
      });
  };

  return (
    <div className='cardlist'>
      <button className='buttonAdd' onClick={handleOpenModal}>
        +
      </button>
      {cards?.map((card) => (
        <CardDetail
          key={card.id}
          card={card}
          clickable={true}
          setSelectedCard={setSelectedCard}
          selectedCard={selectedCard}
        />
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel='Adicionar Cartão'
      >
        <h2>Adicionar Cartão</h2>
        <form style={{ height: '90%' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              gap: 16,

              marginTop: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <label htmlFor='name'>Nome</label>
              <input
                type='text'
                id='name'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <label htmlFor='color'>Cor</label>
              <select
                id='color'
                name='color'
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value='#FFA350'>Inter</option>
                <option value='#A031FF'>Nubank</option>
                <option value='#8AC5FF'>Magalu</option>
                <option value='#FF4343'>Renner</option>
                <option value='#CD3737'>Vermelho</option>
                <option value='#1C6B00'>Verde</option>
                <option value='#4260FF'>Azul</option>
                <option value='#FFE500'>Amarelo</option>
                <option value='#646464'>Cinza</option>
                <option value='#FFFFFF'>Branco</option>
                <option value='#AC42FF'>Roxo</option>
                <option value='#CC3891'>Rosa</option>
              </select>
            </div>
          </div>

          <div style={{ height: 'calc(100% - 100px)' }}>
            <CardDetail card={formData} clickable={false} />
          </div>

          <button type='button' onClick={handleAddCard}>
            Adicionar Cartão
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CardList;
