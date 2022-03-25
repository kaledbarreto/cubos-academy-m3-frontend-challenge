import { useState, useEffect } from 'react';
import Modal from './Modal/modal';
import TableLine from './TableLine/tableLine';
import Filter from './Filter/filter';
import logoDindin from '../src/assets/logoDindin.svg';
import filtroImg from '../src/assets/filtro.svg';
import setaFiltro from '../src/assets/setaFiltro.svg';

function App() {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [entrada, setEntrada] = useState(0);
  const [saida, setSaida] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [transactionEdit, setTransactionEdit] = useState();
  const [transactionEditing, setTransactionEditing] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    try {
      const response = await fetch('http://localhost:3333/transactions', {
        method: 'GET',
      });
      const data = await response.json();

      setTransactionsData(data);
      data.forEach((transaction => {
        setCategoryFilter(...transaction.category);
        console.log(categoryFilter);
        if (transaction.type === 'credit') {
          setEntrada(prev => prev + Number(transaction.value));
        } else {
          setSaida(prev => prev + Number(transaction.value));
        }
      }))
    } catch (error) {
      console.log(error);
    }
  }

  function exibirModalEdit(transaction) {
    console.log(transaction);
    setTransactionEdit(transaction);
    setShowModalEdit(true);
  }

  function handleShowFilter() {
    if (showFilter === true) {
      return setShowFilter(false);
    } else {
      return setShowFilter(true);
    }
  }

  return (
    <div className="App">
      <div className="container-header">
        <img src={logoDindin} alt="Logo Dindin" />
        <h1>Dindin</h1>
      </div>
      <div className="container-main">
        <div className="content-main">
          <div className="open-filters-button">
            <button onClick={handleShowFilter}>
              <img src={filtroImg} alt="Filtro" />
              Filtrar
            </button>
          </div>
          <div className="container-split">
            <div className="container-filter-table">
              {showFilter && <Filter
                loadTransactions={loadTransactions}
              />}
              <div className="table">
                <div className="table-head">
                  <h1 id="date">Data <img src={setaFiltro} alt="Seta Filtro" /></h1>
                  <h1 id="week-day">Dia da Semana <img src={setaFiltro} alt="Seta Filtro" /></h1>
                  <h1>Descrição</h1>
                  <h1>Categoria</h1>
                  <h1>Valor <img src={setaFiltro} alt="Seta Filtro" /></h1>
                </div>
                <div className="table-body">
                  <div className="table-line">
                    {transactionsData.map((transaction) => (
                      <TableLine
                        transaction={transaction}
                        setShowModalEdit={setShowModalEdit}
                        loadTransactions={loadTransactions}
                        exibirModalEdit={exibirModalEdit}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="container-side">
              <div className="container-resume">
                <h1>Resumo</h1>
                <div className="entrance">
                  <span>Entrada:</span>
                  <h3>R$ {entrada}</h3>
                </div>
                <div className="exit">
                  <span>Saída:</span>
                  <h3>- R$ {saida}</h3>
                </div>
                <div className="balance">
                  <span>Saldo:</span>
                  <h3>{entrada - saida < 0 && '-'} R$ {Math.abs(entrada - saida)}</h3>
                </div>
              </div>
              <button className="btn-add" onClick={() => setShowModalAdd(true)}>Adicionar Registro</button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title='Adicionar'
        onClose={() => setShowModalAdd(false)}
        showModal={showModalAdd}
        loadTransactions={loadTransactions}
        transactions={undefined}
      />
      <Modal
        title='Editar'
        onClose={() => setShowModalEdit(false)}
        showModal={showModalEdit}
        loadTransactions={loadTransactions}
        transactions={transactionEdit}
        exibirModalEdit={exibirModalEdit}
        setTransactionEditing={setTransactionEditing}
        transactionEditing={true}
      />
    </div>
  );
}

export default App;
