import './components.scss';
import api from '../services/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TransactionDetail = ({ transaction }) => {
  const [cards, setCards] = useState([]);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BRL',
  });
  const formattedDate = new Date(transaction.date).toLocaleDateString('pt-BR');
  // const formattedDate = `${getDate.getDay()}/${getDate.getUTCMonth()}/${getDate.getFullYear()}`;

  useEffect(() => {
    api
      .get('/cards')
      .then((response) => setCards(response.data))
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err);
      });
  }, []);
  const origin = cards.find((card) => card.id == transaction.origin);
  const transactionImage = origin?.logo;
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        color: 'white',
        background: '#2E2E2E',
        padding: 20,

        marginBottom: 10,
        borderRadius: 10,
        cursor: 'pointer',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onClick={() => {
        navigate(`/transaction/${transaction?.id}`);
      }}
    >
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        {transactionImage ? (
          <img
            width={40}
            height={40}
            style={{ borderRadius: 10 }}
            src={transactionImage}
          />
        ) : (
          <div
            style={{
              width: 40,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: origin?.color,
              borderRadius: 10,
              height: 40,
            }}
          >
            {transaction?.origin?.substr(0, 1).toUpperCase()}
          </div>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 20,
          }}
        >
          <h4>
            {transaction.name} - {formattedDate}
          </h4>
          <span style={{ color: '#cdcdcd' }}>{transaction.status}</span>
        </div>
      </div>
      <span
        style={{ color: transaction.type == 'entrada' ? 'lightgreen' : 'red' }}
      >
        {transaction.type == 'entrada' ? '' : '-'}
        {formatter.format(transaction.value)}
      </span>
    </div>
  );
};

export default TransactionDetail;
