import React from 'react';

function ValidationResults({ validatedProducts, allProductsValid, handleUpdate }) {
  return (
    <div>
      <h2>Resultado da validação dos produtos</h2>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Preço Atual</th>
            <th>Novo Preço</th>
            <th>Regra(s) Quebrada(s)</th>
          </tr>
        </thead>
        <tbody>
          {validatedProducts.map((validationResult) => (
            <tr key={validationResult.product.code}>
              <td>{validationResult.product.code}</td>
              <td>{validationResult.product.name}</td>
              <td>{validationResult.product.salesPrice}</td>
              <td>{validationResult.product.newPrice}</td>
              <td>
                {validationResult.rulesBroken.length > 0 ? (
                  <ul>
                    {validationResult.rulesBroken.map((rule) => (
                      <li key={rule}>{rule}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No rules broken</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={handleUpdate} disabled={!allProductsValid}>
        ATUALIZAR
      </button>
    </div>
  );
}

export default ValidationResults;
