import { useState } from 'react';
import CardList from '../components/CardList';
import TransactionList from '../components/TransactionList';
import Sidebar from '../components/Sidebar';
import { PriceTotal } from '../components/PriceTotal';
import me from '../../src/assets/me.png';
import mainpage from '../assets/icons/mainpage.png';

import investpage from '../assets/icons/investpage.png';

const Home = () => {
  const meses = [
    { name: 'Selecione um mes', month: 0 },
    { name: 'Janeiro', month: 1 },
    { name: 'Fevereiro', month: 2 },
    { name: 'Marco', month: 3 },
    { name: 'Abril', month: 4 },
    { name: 'Maio', month: 5 },
    { name: 'Junho', month: 6 },
    { name: 'Julho', month: 7 },
    { name: 'Agosto', month: 8 },
    { name: 'Setembro', month: 9 },
    { name: 'Outubro', month: 10 },
    { name: 'Novembro', month: 11 },
    { name: 'Dezembro', month: 12 },
  ];

  const [mainView, setMainView] = useState(true);

  const anos = ['Selecione um ano', '2024', '2023', '2022'];
  const totalInvestido = parseFloat('8500.50').toFixed(2);
  const [selectedCard, setSelectedCard] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    meses[new Date().getMonth()]
  );
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  console.log(transactions);
  const filteredTransactions = selectedCard
    ? transactions?.filter(
        (transaction) => transaction?.origin === selectedCard?.id
      )
    : transactions;
  const filterByMonth =
    filteredTransactions && selectedMonth?.month
      ? filteredTransactions?.filter(
          (transaction) =>
            new Date(transaction?.date).getMonth() === selectedMonth.month
        )
      : filteredTransactions;

  const filterByYear =
    filterByMonth &&
    selectedYear.length > 0 &&
    selectedYear !== 'Selecione um ano'
      ? filterByMonth?.filter(
          (transaction) =>
            new Date(transaction?.date).getFullYear() ===
            parseFloat(selectedYear)
        )
      : filterByMonth;

  const totalValue = filterByYear
    .reduce((accumulator, currentValue) => {
      return currentValue.type === 'saida'
        ? parseFloat(accumulator) - parseFloat(currentValue.value)
        : parseFloat(accumulator) + parseFloat(currentValue.value);
    }, 0)
    .toFixed(2);

  const totalIncome = filterByYear
    .filter((obj) => obj.type === 'entrada')
    .reduce((accumulator, currentValue) => {
      return currentValue.type === 'saida'
        ? parseFloat(accumulator) - parseFloat(currentValue.value)
        : parseFloat(accumulator) + parseFloat(currentValue.value);
    }, 0)
    .toFixed(2);
  const totalOutcome = filterByYear
    .filter((obj) => obj.type === 'saida')
    .reduce((accumulator, currentValue) => {
      return currentValue.type === 'saida'
        ? parseFloat(accumulator) - parseFloat(currentValue.value)
        : parseFloat(accumulator) + parseFloat(currentValue.value);
    }, 0)
    .toFixed(2);
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}
      >
        <div>
          <div
            style={{
              userSelect: 'none',
              background: '#5f6ac3',
              paddingLeft: 50,
              paddingTop: 50,
              paddingBottom: 20,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <img
                width={64}
                style={{ borderRadius: '50%', marginRight: 10 }}
                src={me}
              ></img>
              <h1 style={{ color: 'white' }}>Bem vindo de volta, Gabriel!</h1>
            </div>
            <div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 16,
                  flexWrap: 'wrap',
                }}
              >
                <select
                  style={{
                    cursor: 'pointer',
                    width: 200,
                    background: 'white',
                    border: 'none',
                    height: 30,
                    padding: 0,
                  }}
                  value={selectedYear}
                  onChange={(e) => {
                    if (selectedYear === e.target.value) {
                      setSelectedYear({});
                    } else {
                      setSelectedYear(e.target.value);
                    }
                  }}
                >
                  {anos.map((ano) => (
                    <option
                      style={{
                        color: 'white',
                        cursor: 'pointer',
                        backgroundColor:
                          selectedYear === ano ? 'green' : 'blue',
                        padding: 16,
                        borderRadius: 18,
                      }}
                    >
                      {ano}
                    </option>
                  ))}
                </select>
                <select
                  style={{
                    cursor: 'pointer',
                    width: 200,
                    background: 'white',
                    border: 'none',
                    height: 30,
                    padding: 0,
                  }}
                  value={selectedMonth.month}
                  onChange={(e) => {
                    console.log(e.target.value);
                    if (selectedMonth.month === Number(e.target.value)) {
                      setSelectedMonth({});
                    } else {
                      setSelectedMonth(
                        meses?.find(
                          (mes) => mes.month === Number(e.target.value)
                        )
                      );
                    }
                  }}
                >
                  {meses.map((mes) => (
                    <option
                      style={{
                        color: 'white',
                        cursor: 'pointer',
                        backgroundColor:
                          selectedMonth.month === mes.month ? 'green' : 'blue',
                        padding: 16,
                        borderRadius: 18,
                      }}
                      value={mes.month}
                    >
                      {mes.name}
                    </option>
                  ))}
                </select>
                <button
                  style={{ padding: 6, cursor: 'pointer' }}
                  onClick={() => {
                    setMainView(!mainView);
                  }}
                >
                  <img src={mainView ? investpage : mainpage} width={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            userSelect: 'none',
            paddingLeft: 50,
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
          }}
        >
          <div
            style={{
              width: ' 100%',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <PriceTotal totalValue={totalValue} title='Saldo' />
            <PriceTotal totalValue={totalIncome} title='Entrada' />{' '}
            <PriceTotal totalValue={totalOutcome} title='Saida' />
            <PriceTotal totalValue={totalInvestido} title='Investimentos' />
          </div>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ overflowY: 'auto', height: '60vh', width: '75%' }}>
              {mainView ? (
                <TransactionList
                  selectedCard={selectedCard}
                  transactions={filterByYear}
                  setTransactions={setTransactions}
                />
              ) : (
                <>grafico</>
              )}
            </div>
            <div style={{ overflowY: 'auto', height: '100vh', width: 320 }}>
              <CardList
                setSelectedCard={setSelectedCard}
                selectedCard={selectedCard}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
