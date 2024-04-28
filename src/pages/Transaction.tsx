import Sidebar from '../components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

const Transaction = () => {
  const { transactionId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    api
      .get('/transactions')
      .then((response) => setTransactions(response.data))
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err);
      });

    api
      .get('/cards')
      .then((response) => setCards(response.data))
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err);
      });
  }, []);

  const selectedTransaction = transactions.find(
    (transaction) => transaction?.id == transactionId
  );

  const origin = cards.find((card) => card?.id == selectedTransaction?.origin);
  const transactionImage = origin?.logo;

  return (
    <div>
      {/* <Sidebar /> */}
      <div style={{ marginLeft: 50, marginTop: 32 }}>
        <button onClick={() => navigate(-1)}>Voltar</button>
        <div>
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
                color: 'white',
              }}
            >
              {selectedTransaction?.name?.substr(0, 1)}
            </div>
          )}
          <h3 style={{ color: 'white' }}>{selectedTransaction?.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
