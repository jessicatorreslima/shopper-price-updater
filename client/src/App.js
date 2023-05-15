import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [validatedProducts, setValidatedProducts] = useState([]);
  const [allProductsValid, setAllProductsValid] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('/api/validate', formData);

        console.log('Arquivo enviado com sucesso');

        setValidatedProducts((prevProducts) => [...prevProducts, ...response.data]);

        const allValid = response.data.every((validationResult) => validationResult.isValid);
        setAllProductsValid(allValid);
      } catch (error) {
        console.error('Erro ao enviar o arquivo:', error);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.post('/api/update', {
        products: validatedProducts,
      });

      /* setSelectedFile(null);
      setValidatedProducts([]);
      setAllProductsValid(false); */

      console.log('Preços atualizados com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar os preços:', error);
    }
  };

  return (
    <div>
      <h1>Upload de CSV</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">VALIDAR</button>
      </form>
      {validatedProducts.length > 0 && (
        <div>
          <h2>Produtos Validados</h2>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Preço Atual</th>
                <th>Novo Preço</th>
                <th>Regras Quebradas</th>
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
                      <p>Nenhuma regra quebrada</p>
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
      )}
  </div>
)};
export default App;
