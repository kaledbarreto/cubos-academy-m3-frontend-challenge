import React from 'react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import lapis from '../assets/lapis.svg';
import lixeira from '../assets/lixeira.svg';
import ConfirmModal from '../Modal/confirmModal';
import ptBR from 'date-fns/locale/pt-BR';

const TableLine = props => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const transaction = props.transaction;

  function transacao(transaction) {
    const type = transaction.type;
    if (type === 'credit') {
      return <h1 className="credit">R$ {transaction.value}</h1>;
    }
    return <h1 className="debit">- R$ {transaction.value}</h1>;
  }

  async function handleDeleteTransaction(transactionId) {
    setShowConfirmModal(false);
    try {
      await fetch(`http://localhost:3333/transactions/${transactionId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(error);
    }

    await props.loadTransactions();
  }

  return (
    <div key={transaction.id} className="line-items">
      <h1 id="date-crud">{format(new Date(transaction.date), 'dd/MM/yyyy')} </h1>
      <h1>{
        format(new Date(transaction.date), 'EEEE', { locale: ptBR }).replace('-feira', '')
          .charAt(0).toUpperCase()
        + format(new Date(transaction.date), 'EEEE', { locale: ptBR }).replace('-feira', '').slice(1)
      }</h1>
      <h1>{transaction.description}</h1>
      <h1>{transaction.category}</h1>
      {transacao(transaction)}
      <div className="crud-btn">
        <img className="edit-icon" src={lapis} alt="Editar" onClick={() => props.exibirModalEdit(transaction)} />
        <img className="delete-icon" alt="Excluir" src={lixeira} onClick={() => setShowConfirmModal(true)} />
      </div>
      <ConfirmModal
        onClose={() => setShowConfirmModal(false)}
        showConfirmModal={showConfirmModal}
        handleDeleteTransaction={handleDeleteTransaction}
        transactionId={transaction.id}
      />
    </div>
  );
}

export default TableLine;