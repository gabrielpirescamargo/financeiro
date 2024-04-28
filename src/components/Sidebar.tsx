import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const tst = window.location.href;
  const isTransaction = window.location.href.includes('transaction');

  const navigate = useNavigate();
  return (
    <div className='sidebar'>
      <div
        style={{
          background: '#00DDA3',
          padding: 20,
          width: '100%',
          height: 80,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        Planejamento
      </div>
      <ul>
        <li>
          <a
            onClick={() => {
              navigate('/');
            }}
            style={{
              cursor: 'pointer',
              color: isTransaction ? '#fff' : '#00DDA3',
            }}
          >
            Meus cartões
          </a>
        </li>
        {/* <li>
          <a
            onClick={() => {
              navigate('/');
            }}
            style={{
              cursor: 'pointer',
              color: isTransaction ? '#fff' : '#00DDA3',
            }}
          >
            Item 2
          </a>
        </li>
        <li>
          <a href='#'>Item 3</a>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
