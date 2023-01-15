
import React,{useEffect,useState} from 'react';


import axios from 'axios'
import './App.css';

function App() { 
  const [leads,SetLeads] = useState([{"_id":"63c37a2096b2892d2bd39386","xname":"new business","xphone":"3475445544","xurl":"http://www.rjgreensealcoating.com"},{"_id":"63c380840fd0d229ea36b544","xname":"new business","xphone":"3475445544","xurl":"https://samaritanhealth.com"},{"_id":"63c380880fd0d229ea36b545","xname":"new business","xphone":"3475445544","xurl":"https://colossetowing.com"},{"_id":"63c3808c0fd0d229ea36b546","xname":"new business","xphone":"3475445544","xurl":"https://www.planetfitness.com"},{"_id":"63c3808c0fd0d229ea36b547","xname":"new business","xphone":"3475445544","xurl":""},{"_id":"63c380900fd0d229ea36b548","xname":"new business","xphone":"3475445544","xurl":"https://www.directv.com"},{"_id":"63c380950fd0d229ea36b549","xname":"new business","xphone":"3475445544","xurl":"http://www.sacketsharborhouseinn.com"},{"_id":"63c380990fd0d229ea36b54a","xname":"new business","xphone":"3475445544","xurl":""},{"_id":"63c381d6d73e0aa011d33c59","xname":"new business","xphone":"3475445544","xurl":"http://www.riccardosmkt.com"},{"_id":"63c381f0b83f5a153abdca73","xname":"new business","xphone":"3475445544","xurl":""},{"_id":"63c381fab83f5a153abdca74","xname":"new business","xphone":"3475445544","xurl":"http://www.elbitascocina.com"},{"_id":"63c38201b83f5a153abdca75","xname":"new business","xphone":"3475445544","xurl":""},{"_id":"63c3838e9af718b58663b102","xname":"new business","xphone":"3475445544","xurl":"http://www.spokestapas.com"},{"_id":"63c383b99af718b58663b103","xname":"new business","xphone":"3475445544","xurl":"http://impactnutrition315.com"},{"_id":"63c384299af718b58663b104","xname":"new business","xphone":"3475445544","xurl":""},{"_id":"63c384329af718b58663b105","xname":"new business","xphone":"3475445544","xurl":"http://westviewlodgeandmarina.com"},{"_id":"63c384399af718b58663b106","xname":"new business","xphone":"3475445544","xurl":""},{"_id":"63c384409af718b58663b107","xname":"new business","xphone":"3475445544","xurl":"http://www.toysrus.ca"},{"_id":"63c384479af718b58663b108","xname":"new business","xphone":"3475445544","xurl":""},{"_id":"63c384519af718b58663b109","xname":"new business","xphone":"3475445544","xurl":""},{"_id":"63c3845b9af718b58663b10a","xname":"new business","xphone":"3475445544","xurl":"http://www.dunkandbright.com"},{"_id":"63c384639af718b58663b10b","xname":"new business","xphone":"3475445544","xurl":"https://www.whiskeycoopny.com"}]);

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
            <th className="mdl-data-table__cell--non-numeric">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4}>

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
              <td className="mdl-data-table__cell--non-numeric">{lead.xphone}</td>
              <td className="mdl-data-table__cell--non-numeric">{lead.xurl}</td>
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
