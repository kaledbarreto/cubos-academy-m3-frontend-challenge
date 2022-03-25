import React from 'react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

import closeBtn from '../assets/closeBtn.svg';

const Modal = props => {
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [data, setData] = useState('');
  const [description, setDescription] = useState('');
  const [payment, setPayment] = useState('credit');


  console.log(props.transactionEditing);

  useEffect(() => {
    if (props.transactions && props.transactions.value !== null) {
      console.log('Passei ');
      setValue(props.transactions.value);
      setCategory(props.transactions.category);
      setData(format(new Date(props.transactions.date), 'yyyy-MM-dd'));
      setDescription(props.transactions.description);
      setPayment(props.transactions.type);
    }
  }, [props.showModal]);

  if (!props.showModal) {
    return null;
  }

  async function handleRegisterTransaction() {
    if (!value || !category || !data || !description) {
      return;

    }

    const semana = { 1: 'segunda', 2: 'terça', 3: 'quarta', 4: 'quinta', 5: 'sexta', 6: 'sábado', 7: 'domingo' }

    props.onClose();

    try {
      const body = {
        date: new Date(data),
        week_day: semana[(new Date(data).getDay()) + 1],
        description: description,
        value: Number(value),
        category: category,
        type: payment
      };

      const response = await fetch('http://localhost:3333/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const responseData = await response.json();

      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
    props.loadTransactions();
  }

  async function handleEditTransaction() {
    console.log('Cheguei');
    props.exibirModalEdit(props.transactions);

    if (!value || !category || !data || !description) {
      return;

    }

    const semana = { 1: 'segunda', 2: 'terça', 3: 'quarta', 4: 'quinta', 5: 'sexta', 6: 'sábado', 7: 'domingo' }

    props.onClose();

    try {
      const body = {
        date: new Date(data),
        week_day: semana[(new Date(data).getDay()) + 1],
        description: description,
        value: Number(value),
        category: category,
        type: payment
      };

      const response = await fetch(`http://localhost:3333/transactions/${props.transactions.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const responseData = await response.json();

      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
    props.loadTransactions();
  }

  function handlePayment() {
    if (payment === 'credit') {
      setPayment('debit');
    } else {
      setPayment('credit');
    }
  }

  return (
    <div className="backdrop" onClick={props.onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-title-close">
          <h3 className="modal-title">{props.title} Registro</h3>
          <img className="close-icon" onClick={props.onClose} src={closeBtn} alt="Close" />
        </div>
        <div className="modal-entrace-exit">
          <button onClick={handlePayment} id={payment === 'credit' ? 'credit-button' : ''} className={payment === 'credit' ? 'credit-modal' : ''}>Entrada</button>
          <button onClick={handlePayment} id={payment === 'debit' ? 'debit-button' : ''} className={payment === 'debit' ? 'debit-modal' : ''}>Saída</button>
        </div>
        <div className="modal-inputs">
          <div className="modal-input">
            <label htmlFor="value">Valor</label>
            <input
              id="value"
              type="text"
              onChange={e => setValue(e.target.value)}
              value={value}
            />
          </div>
          <div className="modal-input">
            <label htmlFor="category">Categoria</label>
            <input
              id="category"
              type="text"
              onChange={e => setCategory(e.target.value)}
              value={category}
            />
          </div>
          <div className="modal-input">
            <label htmlFor="date">Data</label>
            <input
              id="date"
              type="date"
              onChange={e => setData(e.target.value)}
              value={data}
            />
          </div>
          <div className="modal-input">
            <label htmlFor="description">Descrição</label>
            <input
              id="description"
              type="text"
              onChange={e => setDescription(e.target.value)}
              value={description}
            />
          </div>
        </div>
        <button className="btn-insert" onClick={props.transactionEditing ? handleEditTransaction : handleRegisterTransaction}>Confirmar</button>
      </div>
    </div>
  )
}

export default Modal;