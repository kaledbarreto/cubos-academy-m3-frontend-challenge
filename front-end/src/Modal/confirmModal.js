import React from 'react';

const ConfirmModal = props => {
  if (!props.showConfirmModal) {
    return null;
  }

  return (
    <div className="container-confirm-delete">
      <h1>Apagar Item?</h1>
      <div className="btn-actions-confirm-delete">
        <button className="btn-actions-confirm" onClick={() => props.handleDeleteTransaction(props.transactionId)}>Sim</button>
        <button className="btn-actions-delete" onClick={props.onClose}>Não</button>
      </div>
    </div>
  );
}

export default ConfirmModal;