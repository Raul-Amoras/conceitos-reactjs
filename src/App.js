import React, {useState, useEffect} from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setrepository] = useState([]);
  
  useEffect(()=>{
    api.get('/repositories').then(response => {
      setrepository(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('/repositories',{
      title: "Desafio ReactJS",
      url: "https://github.com/josepholiveira",
      techs: ['React', 'Node.js']
    })

    const repository = response.data;
    setrepository([...repositories,repository]);
  }

  async function handleRemoveRepository(id) {
   await api.delete(`/repositories/${id}`);

   setrepository(repositories.filter(
     repository => repository.id != id
   ));
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>
          {repository.title} 
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>
    
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
