import React from 'react';

function UploadForm({ selectedFile, handleFileChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="fileInput">Select CSV file:</label>
      <input id="fileInput" type="file" accept=".csv" onChange={handleFileChange} />
      <button type="submit">VALIDAR</button>
    </form>
  );
}

export default UploadForm;
