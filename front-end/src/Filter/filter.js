import React from 'react';
import addImg from '../assets/add.svg';

const Filter = () => {
  return (
    <div className="container-filters">
      <div className="container-day-week">
        <h1>Dia da Semana</h1>
        <div className="container-chip">
          <ul>
            <li>
              Segunda
              <img src={addImg} alt="Adicionar" />
            </li>
            <li>
              Terça
              <img src={addImg} alt="Adicionar" />
            </li>
            <li>
              Quarta
              <img src={addImg} alt="Adicionar" />
            </li>
            <li>
              Quinta
              <img src={addImg} alt="Adicionar" />
            </li>
            <li>
              Sexta
              <img src={addImg} alt="Adicionar" />
            </li>
            <li>
              Sábado
              <img src={addImg} alt="Adicionar" />
            </li>
            <li>
              Domingo
              <img src={addImg} alt="Adicionar" />
            </li>
          </ul>
        </div>
      </div>
      <div className="container-category">
        <h1>Categorias</h1>
        <div className="container-chip">
          <ul>
            <li>
              Pix
              <img src={addImg} alt="Adicionar" />
            </li>
            <li>
              TED
              <img src={addImg} alt="Adicionar" />
            </li>
            <li>
              Transferência Bancária
              <img src={addImg} alt="Adicionar" />
            </li>
            <li>
              Boleto
              <img src={addImg} alt="Adicionar" />
            </li>
          </ul>
        </div>
      </div>
      <div className="container-value">
        <h1>Valor</h1>
        <div className="inputs-container">
          <div className="input-01-content">
            <label htmlFor="min-value">Min</label>
            <input id="min-value" type="text" />
          </div>
          <div className="input-02-content">
            <label htmlFor="max-value">Max</label>
            <input id="max-value" type="text" />
          </div>
        </div>
      </div>
      <div className="container-btn-filters">
        <button className="btn-clear-filters">Limpar Filtros</button>
        <button className="btn-apply-filters">Aplicar Filtros</button>
      </div>
    </div>
  )
}

export default Filter;