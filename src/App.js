
import React,{useEffect,useState} from 'react';


import axios from 'axios'
import './App.css';

function App() { 
  const [leads,SetLeads] = useState([]);

  useEffect(()=> {
    axios.get('https://xnap1.onrender.com/Leads')
      .then(res => {
        const leads = res.data;
        console.log(leads)
        SetLeads(leads);
      })
  },[])

  const addone = ()=>
  {

    axios.get('https://xnap1.onrender.com/')
    .then(res => {
      axios.get('https://xnap1.onrender.com/Leads')
      .then(res => {
        const leads = res.data;
        console.log(leads)
        SetLeads(leads);
      })
    })


  }

  const handleDelete = (id) => {
    axios.delete("https://xnap1.onrender.com/Leads/" + id)
      .then(response => {
        // remove the deleted lead from the state
       console.log("here");
        SetLeads(leads.filter(x=>x._id!=id));         
        
      })
      .catch(error => {
        console.log(error);
      });
  }
  


      return (
        <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead>
          <tr>
            <th className="mdl-data-table__cell--non-numeric">Name</th>
            <th className="mdl-data-table__cell--non-numeric">Phone</th>
            <th className="mdl-data-table__cell--non-numeric">Url</th>
            <th className="mdl-data-table__cell--non-numeric">City State</th>
            <th className="mdl-data-table__cell--non-numeric">categories</th>
            <th className="mdl-data-table__cell--non-numeric">Review Count</th>
            <th className="mdl-data-table__cell--non-numeric">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={7}>

              <button 
                className="mdl-button mdl-js-button mdl-button--icon"
                onClick={() => addone()}>
                <i className="material-icons">add</i>
              </button>


            </td>
          </tr>
          {leads.map(lead => (
            <tr key={lead._id}>
              <td className="mdl-data-table__cell--non-numeric">{lead.xname}</td>
              <td className="mdl-data-table__cell--non-numeric">
                <a href={`tel:${lead.xphone}`}>{lead.xphone}</a>
              </td>              
              <td className="mdl-data-table__cell--non-numeric">
                <a href={lead.xurl} target="_blank">{lead.xurl}</a>
            </td>
              <td className="mdl-data-table__cell--non-numeric">{lead.citystate}</td>
              <td className="mdl-data-table__cell--non-numeric">{lead.categories}</td>
              <td className="mdl-data-table__cell--non-numeric">{lead.review_count}</td>
              <td className="mdl-data-table__cell--non-numeric">
              <button 
                className="mdl-button mdl-js-button mdl-button--icon"
                onClick={() => handleDelete(lead._id)}>
                <i className="material-icons">delete</i>
              </button>
          
                
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      );  
}

export default App;
