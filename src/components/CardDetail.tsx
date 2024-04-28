const CardDetail = ({ card, setSelectedCard, selectedCard, clickable }) => {
  const isSelected = selectedCard?.name === card.name;

  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => {
        if (!clickable) {
          return;
        }
        if (isSelected) {
          setSelectedCard(null);
        } else {
          setSelectedCard(card);
        }
      }}
      className='card'
    >
      <h3
        className='cardname'
        style={{
          color: 'white',
          position: 'relative',
          height: 'auto',
          fontSize: 16,
          background: 'rgba(0,0,0,0.3)',
          width: 'max-content',
          borderRadius: 10,
          padding: 5,

          zIndex: 1,
          top: 140,
          marginLeft: 20,
        }}
      >
        {card.name}
      </h3>
      <img
        style={{
          border: isSelected ? `3px solid ${card.color}` : '',
          borderRadius: 16,
        }}
        width={'100%'}
        className='cardimg'
        src={card?.image}
      />
    </div>
  );
};

export default CardDetail;
