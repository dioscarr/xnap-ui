import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
// Variable overrides first


// Then import Bootstrap



import axios from "axios";
import "./App.css";

import $ from 'jquery';
// import 'datatables.net-bs5/css/dataTables.bootstrap5.css';
import 'datatables.net';

function App() {
  const [leads, SetLeads] = useState([]);
  const [selectedState, setSelectedState] = useState("NY");
  const [selectedCity, setSelectedCity] = useState("");

  const [data, setData] = useState([]);
  const [parentAliases, setParentAliases] = useState([]);
  const [selectedCategory, setChildAliases] = useState([]);
  const [selectedParent, setSelectedParent] = useState("");
  const [selectcat,setSelectedCat] = useState("");
  const [performane,setPerformance]= useState("");
  const JobCompleted = []
  const StartJob = async()=>{
      debugger;
      const c = parentAliases.filter(cat=>cat === "lawyers").map((cat, i) => {
       const b = data
        .filter((item) => item.parent_aliases[0] === cat)
        .map((item1) => {

         // State.getStatesOfCountry("US").map((state) =>
         // {
           const a = City.getCitiesOfState("US",selectedState).map((city) =>
          //  City.getCitiesOfState("US", state.isoCode).map((city) =>
            {

             // const cs = `${city.name} ${state.isoCode}`;
              const cs = `${city.name} ${selectedState}`;
              const catid = `${item1.alias}`;

              return `https://xnap1.onrender.com/BusinessSearch?location=${cs}&category=${catid}`;

              //  });
            });
            return a;
          });
          return b
        });
        console.log(c);
        var d = 0;
       for(var i=0;i<c.length -1; i++)
       {
        //  var s = c[i][d].length;
         // var refreshId = setInterval(async function() {
          //  d=d+1;

          
          // await callUrls(c[Math.floor(Math.random() * 20)][Math.floor(Math.random() * 20)])
          debugger;
         // axios.get("http://localhost:3001/Leads?skip=0&limit=2000").then((res) => {
           // await axios.post("http://localhost:3001/addtoqueue",{
           await axios.post("https://xnap1.onrender.com/addtoqueue",{
                data:c[i][d]
              }).then(data=>console.log(data)).catch(e=>console.log(e))
              

          //  if ( d> s) {
          //    clearInterval(refreshId);
           }
        //  }, 1000);


          //const response = await axios.get(`https://xnap1.onrender.com/BusinessSearch?location=${cs}&category=${catid}`)
        //}
  }


async function callUrls(urls) {
  const batchSize = 20; // Number of requests per batch
  const delay = 3000; // Delay between batches in milliseconds
  const requests = []; // Array to store requests
  let i = 0;
  while (i < urls.length) {
    requests.push(axios.get(urls[i]));
    if (requests.length === batchSize || i === urls.length - 1) {
      try {
        // Wait for all requests in the batch to resolve
        const results = await Promise.all(requests);
        results.forEach(result => console.log(result.data));
        // Clear the array of requests
        requests.length = 0;
        // Wait for the delay before making the next batch of requests
        await new Promise(resolve => setTimeout(resolve, delay));
      } catch (err) {
        console.error(err);
      }
    }
    i++;
  }
}

  useEffect(()=>{

    console.log(JobCompleted);
  },[JobCompleted])
  useEffect(() => {
   try {
      axios
      // .get("https://xnap1.onrender.com/yelpcats")
        .get("https://xnap1.onrender.com/yelpcats")
        .then((response) => {
          setPerformance(response.data.response_time);
          setParentAliases(response.data.map((item) => item.parent_aliases[0]));
        })
        .catch((err) => console.log(err));
      axios
      .get("https://xnap1.onrender.com/yelpcats")

        .then((response) => {
          setData(response.data);
          setParentAliases(response.data.map((item) => item.parent_aliases[0]));
        })
        .catch((err) => console.log(err));

        axios.get("https://xnap1.onrender.com/Leads?skip=0&limit=2000").then((res) => {
        const leads = res.data;
        console.log(leads);
        SetLeads(leads?.sort()?.reverse());
      });
  } catch (error) {
    console.log(error.message);
  }
  }, []);

  useEffect(() => {

    if (selectedParent) {

      setChildAliases(
        data
          .filter((item) => item.parent_aliases[0] === selectedParent)
          .map((item) => { return {alises:item.alias,title:item.title}})
      );
    } else {
      setChildAliases([]);
    }
  }, [selectedParent, data]);

  const states = State.getStatesOfCountry("US").map((state) => (
    <option key={state.id} value={state.isoCode}>
      {state.name}
    </option>
  ));
  const cities = City.getCitiesOfState("US", selectedState).map((city) => (
    <option key={city.id} value={city.name}>
      {city.name}
    </option>
  ));
  const addone = () => {


  StartJob();

    //   axios.get(`https://xnap1.onrender.com/BusinessSearch?location=${selectedCity} ${selectedState}&category=${selectcat}`).then((res) => {
    // //axios.get(`http://localhost:3001/BusinessSearch?location=${selectedCity} ${selectedState}&category=${selectcat}`).then((res) => {

    // console.log(res.data);
    // alert(JSON.stringify(res.data));

    // //axios.get("https://xnap1.onrender.com/Leads").then((res) => {
    // axios.get("http://localhost:3001/Leads?skip=0&limit=2000").then((res) => {
    //     const leads = res.data;
    //     console.log(leads);
    //     SetLeads(leads?.sort()?.reverse());
    //   });
    // });
  };

  const handleDelete = (id) => {
    axios
      .delete("https://xnap1.onrender.com/Leads/" + id)
      .then((response) => {
        // remove the deleted lead from the state
        console.log("here");
        SetLeads(leads.filter((x) => x._id != id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    debugger;
   if(leads.length>0 && ( ! $.fn.DataTable.isDataTable( '#example' )))
   {
    $('#example').DataTable({
      dom: 'Bfrtip',
      buttons: [
          'colvis',
          'excel',
          'print'
      ],
      "language": {
        "search": '<i class="fas fa-search"></i>',
        "lengthMenu": '_MENU_',
        "paginate": {
          "previous": '<i class="fas fa-angle-left"></i>',
          "next": '<i class="fas fa-angle-right"></i>'
        }
      },
      "columnDefs": [{
        "targets": 'no-sort',
        "orderable": false,
      }]
    });
      }
  },[leads])
  return (
    <div>
<div>
              <select
                // className="mdl-textfield__input"
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="">Select State</option>
                {states}
              </select>

              <select
                //className="mdl-textfield__input"
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
              >
                <option value="">Select City</option>
                {cities}
              </select>

              <select
                //className="mdl-textfield__input"
                value={selectedParent}
                onChange={(e) => setSelectedParent(e.target.value)}
              >
                <option value="" disabled>
                  Select Parent Alias
                </option>
                {parentAliases.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
              //</div>className="mdl-textfield__input"
               onChange={(e)=>setSelectedCat(e.target.value)}>
                <option value="" disabled>
                  Select Child Alias
                </option>
                {selectedCategory.map((item, i) => (
                  <option key={i} value={item.alises}>
                    {item.title}
                  </option>
                ))}
              </select>

            <button
              //className="mdl-button mdl-js-button mdl-button--icon"
              onClick={() => addone()}
            >
              <i //</button>className="material-icons"
              >search</i>
            </button>
            </div>
<table id="example" className="table  " style={{width:'100%'}}
//className="mdl-data-table mdl-js-data-table mdl-shadow--2dp"
>
  <thead>

        <tr>
          <th //</tr>className="mdl-data-table__cell--non-numeric"

          >Name</th>
          <th //</table>className="mdl-data-table__cell--non-numeric"
          >Url</th>
          <th //className="mdl-data-table__cell--non-numeric"
          >Email(s)</th>
          <th //className="mdl-data-table__cell--non-numeric"
          >categories</th>
          <th //className="mdl-data-table__cell--non-numeric"
          >City State</th>
          <th //className="mdl-data-table__cell--non-numeric"
          >zip</th>
          <th //className="mdl-data-table__cell--non-numeric"
          >Phone</th>
          <th //className="mdl-data-table__cell--non-numeric"
          >rating</th>
          <th //className="mdl-data-table__cell--non-numeric"
          >Review Count</th>
          <th //className="mdl-data-table__cell--non-numeric"
          >Actions</th>
        </tr>
      </thead>
      <tbody>

        {leads?.map((lead) => (
          <tr key={lead._id}>
            <td
             //className="mdl-data-table__cell--non-numeric"
             >{lead.xname}</td>
            <td
            //</tr>className="mdl-data-table__cell--non-numeric"
            >
              <a href={lead.xurl} target="_blank">
                {lead.xurl}
              </a>
            </td>
            <td
           // className="mdl-data-table__cell--non-numeric"
            >
              {lead.emails[0]?.emails.map(x=>(
                <a href={lead.xurl} target="_blank">
                {x??""}
                </a>
                ))
              }
            </td>
            <td
           // className="mdl-data-table__cell--non-numeric"
            >
              {lead.categories}
            </td>
            <td
            //className="mdl-data-table__cell--non-numeric"
            >
              {lead.citystate}
            </td>
            <td
           // className="mdl-data-table__cell--non-numeric"
            >{lead.zip}</td>
            <td
            //</tr>className="mdl-data-table__cell--non-numeric"
            >
              <a href={`tel:${lead.xphone}`}>{lead.xphone}</a>
            </td>
            <td
            //</tr>className="mdl-data-table__cell--non-numeric"
            >{lead.rating}</td>
            <td
            //className="mdl-data-table__cell--non-numeric"
            >
              {lead.review_count}
            </td>
            <td //</tr>className="mdl-data-table__cell--non-numeric"
            >
              <button className="btn btn-primary"
                //className="mdl-button mdl-js-button mdl-button--icon"
                onClick={() => handleDelete(lead._id)}
              >
                <i //</button>className="material-icons"
                >delete</i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default App;
