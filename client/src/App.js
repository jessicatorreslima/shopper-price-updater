import React, { useState } from 'react';
import axios from 'axios';

function UploadCSV() {
  const [selectedFile, setSelectedFile] = useState(null);

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
        // Fazer a solicitação HTTP para enviar o arquivo para o backend
        await axios.post('/api/upload', formData);

        // Exibir mensagem de sucesso ou realizar outras ações após o envio do arquivo
        console.log('Arquivo enviado com sucesso');
      } catch (error) {
        // Lidar com erros da solicitação
        console.error('Erro ao enviar o arquivo:', error);
      }
    }
  };

  return (
    <div>
      <h1>Upload de CSV</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default UploadCSV;
