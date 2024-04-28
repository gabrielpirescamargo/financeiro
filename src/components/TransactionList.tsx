import { useEffect, useState } from 'react';
import './components.scss';
import TransactionDetail from './TransactionDetail';
import api from '../services/api';
import nubank from '../services/nubank';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';

import error from '../assets/illustrations/404.svg';
import axios from 'axios';
const TransactionList = ({ selectedCard, transactions, setTransactions }) => {
  const [nameInput, setNameInput] = useState('Transação');
  const [modalOpen, setModalOpen] = useState(false);
  const [originInput, setOriginInput] = useState('nubank');
  const [dateInput, setDateInput] = useState(new Date());
  const [statusInput, setStatusInput] = useState('');
  const [typeInput, setTypeInput] = useState('entrada');
  const [valueInput, setValueInput] = useState(0.0);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    let transac = [];
    api
      .get('/transactions')
      .then((response) => {
        setTransactions(response.data);
        transac = response.data;
        console.log(response.data);
      })
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err);
      });

    nubank
      .get(
        '/AJxL5LBNP2GOCR5f_5XO1Pb1_VqJP0I-bg.aHR0cHM6Ly9wcm9kLXMxNi1mYWNhZGUubnViYW5rLmNvbS5ici9hcGkvYWNjb3VudHMvNjFmM2ZlYjctOTZlYi00NGY5LWE5ZDctZWVjNWMwMTEwYjk0L2JpbGxzL3N1bW1hcnk',
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjIwMTUtMTItMDRUMTc6MzY6MjIuNjY0LXU5ZC1ldWN1Ri1zQUFBRlJiaER3aUEifQ.eyJhdWQiOiJvdGhlci5jb250YSIsInN1YiI6IjYxZThhZjhlLTJkODctNDQ0ZS04MGFjLTliYzZjZWE1NWExMiIsImlzcyI6Imh0dHBzOlwvXC93d3cubnViYW5rLmNvbS5iciIsImV4cCI6MTcwNzc4NDg5NCwic2NvcGUiOiJhdXRoXC91c2VyIHVzZXIiLCJqdGkiOiIyMFl1dUZUY3RNZ0FBQUdOZTl6MHpBIiwiYWNsIjpudWxsLCJ2ZXJzaW9uIjoiMiIsImlhdCI6MTcwNzE4MDA5NH0.tS4I6SjT1ryhO7XUFwXdJFEZwxq-y2r3znkNYQ-J6jnpCev0qx9inYvV1zneJYzVOl6rlplB2w1bbdH9SLGLYvsMGsgM18rivp7VfwABjbi9FCyUwv-1kgo59UJuoXqeyhtAwfJZRCPW55HTKCwcIANmRUWDnbqJvZRIdywn-sMaHhxzXGoZMakvnGL8vfQZXsci4ugCXDLvvsjE2o-61e3DVyA52TmoVknJCmncTX72y-jT0Z2j4vGqMUjJpNeekp8y_V73CHbyqgcKaUSKcgKmPbz-S6iSLFd1YdV6hbfcZhBlv88HOeMqT0OLTT-gSvMhozmX22Dk5vdX7BWAqA',
          },
        }
      )
      .then((response) => {
        const res = response.data.bills.map((bill) => {
          return {
            id: bill.id || `${bill.summary.due_date}-nubank`,
            name: 'Fatura nubank',
            origin: 'nubank',
            date: bill.summary.due_date,
            status: bill.state === 'overdue' ? 'Pago' : 'A pagar',
            type: 'saida',
            value: parseFloat(bill.summary.spent_amount) || 0,
            ...bill,
          };
        });

        setTransactions([...transac, ...res]);

        //   {
        //     "id": "6497b307-b5b1-4cf6-9181-b27b9e4f0139",
        //     "state": "overdue",
        //     "summary": {
        //         "due_date": "2023-07-02",
        //         "close_date": "2023-06-25",
        //         "late_interest_rate": "0.171",
        //         "past_balance": 0,
        //         "effective_due_date": "2023-07-03",
        //         "spent_amount": "1120.040598",
        //         "total_balance": 112004,
        //         "interest_rate": "0.161",
        //         "interest": 0,
        //         "total_cumulative": 112004,
        //         "paid": 0,
        //         "minimum_payment": 16800,
        //         "open_date": "2023-05-26"
        //     },

        // }

        api
          .get('/cards')
          .then((response) => {
            setCards(response.data);
          })
          .catch((err) => {
            console.error('ops! ocorreu um erro' + err);
          });
      })
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err);
      });
  }, []);

  const filteredTransactions = selectedCard
    ? transactions.filter(
        (transaction) => transaction?.origin === selectedCard?.id
      )
    : transactions;
  const sortedTransactions = filteredTransactions.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      return 0; // Se alguma das datas for inválida, mantenha a ordem atual
    }

    return dateB - dateA;
  });

  return (
    <div>
      {sortedTransactions.length > 0 && (
        <button
          style={{ width: '100%', marginBottom: 10 }}
          onClick={() => setModalOpen(true)}
        >
          +
        </button>
      )}
      {sortedTransactions.length > 0 &&
        sortedTransactions.map((transaction) => (
          <TransactionDetail transaction={transaction} />
        ))}

      {sortedTransactions.length == 0 && (
        <div
          style={{
            color: 'white',
            display: 'flex',

            userSelect: 'none',
          }}
        >
          <img src={error} width={600} />
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
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
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                }}
                type='text'
                id='name'
                name='name'
              />

              <label htmlFor='name'>Nome</label>
              {cards.map((card) => {
                return (
                  <div
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setOriginInput(card.id);
                    }}
                  >
                    {card.name}
                  </div>
                );
              })}
              <label htmlFor='name'>Nome</label>
              <input
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                type='date'
                id='date'
                name='date'
              />
              <div>
                <input
                  id='entrada'
                  type='radio'
                  style={typeInput === 'entrada' ? { background: 'green' } : {}}
                  onClick={() => setTypeInput('entrada')}
                  checked={typeInput === 'entrada'}
                />
                <label htmlFor='entrada'>Entrada</label>

                <input
                  id='saida'
                  type='radio'
                  style={typeInput === 'saida' ? { background: 'green' } : {}}
                  onClick={() => setTypeInput('saida')}
                  checked={typeInput === 'saida'}
                />
                <label htmlFor='saida'>Saida</label>
              </div>
              {typeInput === 'saida' ? (
                <div>
                  <fieldset>
                    <legend>Qual o status</legend>

                    <input
                      id='pago'
                      type='radio'
                      style={
                        statusInput === 'pago' ? { background: 'green' } : {}
                      }
                      onClick={() => setStatusInput('pago')}
                      checked={statusInput === 'pago'}
                    />
                    <label htmlFor='pago'>Pago</label>

                    <input
                      id='pagar'
                      type='radio'
                      style={
                        statusInput === 'A pagar' ? { background: 'green' } : {}
                      }
                      onClick={() => setStatusInput('A pagar')}
                      checked={statusInput === 'A pagar'}
                    />
                    <label htmlFor='pagar'>A pagar</label>
                  </fieldset>
                </div>
              ) : (
                <div>
                  <fieldset>
                    <legend>Qual o status</legend>

                    <input
                      id='recebido'
                      type='radio'
                      style={
                        statusInput === 'Recebido'
                          ? { background: 'green' }
                          : {}
                      }
                      onClick={() => setStatusInput('Recebido')}
                      checked={statusInput === 'Recebido'}
                    />
                    <label htmlFor='recebido'>Recebido</label>

                    <input
                      id='receber'
                      type='radio'
                      style={
                        statusInput === 'A receber'
                          ? { background: 'green' }
                          : {}
                      }
                      onClick={() => setStatusInput('A receber')}
                      checked={statusInput === 'A receber'}
                    />
                    <label htmlFor='receber'>A receber</label>
                  </fieldset>
                </div>
              )}
              <input
                type='number'
                onChange={(e) => setValueInput(Number(e.target.value))}
                value={valueInput}
              />
            </div>
          </div>

          <button
            type='button'
            onClick={() => {
              const obj = {
                id: uuidv4(),
                name: nameInput,
                origin: originInput,
                date: dateInput,
                status: statusInput,
                type: typeInput,
                value: valueInput,
              };
              setTransactions((prev) => {
                return [...prev, obj];
              });
              axios
                .post('http://localhost:3000/transactions', obj)
                .then((response) => {});
            }}
          >
            Adicionar Cartão
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default TransactionList;
