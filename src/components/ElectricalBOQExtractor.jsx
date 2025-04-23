import React, { useState } from 'react';

export default function ElectricalBOQExtractor() {
  const [client, setClient] = useState('ARAMCO');
  const [layoutFile, setLayoutFile] = useState(null);
  const [specFile, setSpecFile] = useState(null);
  const [boqData, setBoqData] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [estimatorName, setEstimatorName] = useState('');
  const [estimationDate, setEstimationDate] = useState('');

  const handleFileUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) setter(file);
  };

  const generateBOQ = () => {
    if (!projectName || !estimatorName || !estimationDate) {
      alert("Please fill in Project Name, Estimator Name, and Estimation Date.");
      return;
    }
    setBoqData([
      { item: "MV Panel", quantity: 8, unit: "Nos" },
      { item: "LV Panel", quantity: 12, unit: "Nos" },
      { item: "Power Cables", quantity: 3200, unit: "m" },
      { item: "Lighting Fixtures", quantity: 450, unit: "Nos" }
    ]);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h2>Electrical BOQ Extractor</h2>
      <input placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
      <input placeholder="Estimator Name" value={estimatorName} onChange={(e) => setEstimatorName(e.target.value)} />
      <input type="date" value={estimationDate} onChange={(e) => setEstimationDate(e.target.value)} />
      <select value={client} onChange={(e) => setClient(e.target.value)}>
        <option value="ARAMCO">ARAMCO</option>
        <option value="SABIC">SABIC</option>
        <option value="SEC">SEC</option>
        <option value="MAADEN">MAADEN</option>
        <option value="SWCC">SWCC</option>
      </select>
      <input type="file" accept=".pdf,image/*" onChange={(e) => handleFileUpload(e, setLayoutFile)} />
      <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, setSpecFile)} />
      <button onClick={generateBOQ}>Generate Electrical BOQ</button>

      {boqData && (
        <div>
          <h3>Generated BOQ</h3>
          <p>Project: {projectName}</p>
          <p>Estimator: {estimatorName}</p>
          <p>Date: {estimationDate}</p>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {boqData.map((row, index) => (
                <tr key={index}>
                  <td>{row.item}</td>
                  <td>{row.quantity}</td>
                  <td>{row.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}