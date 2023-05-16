// App.js
import React, { useState } from 'react';
import axios from 'axios';
import UploadForm from './components/UploadForm';
import ValidationResults from './components/ValidationResults';
import './styles.css';

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

        console.log('File sent successfully');

        setValidatedProducts((prevProducts) => [...prevProducts, ...response.data]);

        const allValid = response.data.every((validationResult) => validationResult.isValid);
        setAllProductsValid(allValid);
      } catch (error) {
        console.error('Error sending file:', error);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const reqBody = validatedProducts.map((validatedProduct) => validatedProduct.product);
      await axios.post('/api/update', reqBody);

      setSelectedFile(null);
      setValidatedProducts([]);
      setAllProductsValid(false);

      console.log('Prices updated successfully');
    } catch (error) {
      console.error('Error updating prices:', error);
    }
  };

  return (
    <div>
      <h1>Envio de arquivo CSV</h1>
      <UploadForm
        selectedFile={selectedFile}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
      />
      {validatedProducts.length > 0 && (
        <ValidationResults
          validatedProducts={validatedProducts}
          allProductsValid={allProductsValid}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default App;
