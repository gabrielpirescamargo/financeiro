import entrada from '../assets/icons/entrada.png';
import saida from '../assets/icons/saida.png';
import saldo from '../assets/icons/saldo.png';
import investimentos from '../assets/icons/investimentos.png';
import { useState } from 'react';

export const PriceTotal = ({ totalValue, title }) => {
  const [visible, setVisible] = useState(true);
  const img = () => {
    switch (title) {
      case 'Saldo':
        return saldo;
        break;
      case 'Entrada':
        return entrada;
        break;
      case 'Saida':
        return saida;
        break;
      case 'Investimentos':
        return investimentos;
        break;
    }
  };

  const color = () => {
    switch (title) {
      case 'Saldo':
        return '#57A0B6';
        break;
      case 'Entrada':
        return '#438946';
        break;
      case 'Saida':
        return '#E95959';
        break;
      case 'Investimentos':
        return '#7C57B6';
        break;
    }
  };
  return (
    <div
      onClick={() => {
        setVisible(!visible);
      }}
      style={{
        userSelect: 'none',
        backgroundColor: '#3A3A3A',
        borderRadius: 20,
        minWidth: 250,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '22%',
        gap: 16,
        padding: '30px',
      }}
    >
      <img src={img()} />
      <div>
        <h4 style={{ color: 'white' }}>{title}</h4>
        <h3
          style={{
            background: color(),
            color: 'white',
            borderRadius: 10,
            padding: '2px 8px',
          }}
        >
          R$ {visible ? totalValue : '******'}
        </h3>
      </div>
    </div>
  );
};
