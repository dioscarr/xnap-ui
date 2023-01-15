import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";

import axios from "axios";
import "./App.css";

function App() {
  const [leads, SetLeads] = useState([]);
  const [selectedState, setSelectedState] = useState("NY");
  const [selectedCity, setSelectedCity] = useState("");

  const [data, setData] = useState([]);
  const [parentAliases, setParentAliases] = useState([]);
  const [childAliases, setChildAliases] = useState([]);
  const [selectedParent, setSelectedParent] = useState("");

  useEffect(() => {
    axios
      .get("https://xnap1.onrender.com/yelpcats")
      .then((response) => {
        setData(response.data);
        setParentAliases(
          Array.from(
            new Set(response.data.map((item) => item.parent_aliases[0]))
          )
        );
      })
      .catch((err) => console.log(err));


      axios.get("https://xnap1.onrender.com/Leads").then((res) => {
        const leads = res.data;
        console.log(leads);
        SetLeads(leads);
      });

  }, []);

  useEffect(() => {
    if (selectedParent) {
      setChildAliases(
        data
          .filter((item) => item.parent_aliases[0] === selectedParent)
          .map((item) => item.alias)
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
    axios.get("https://xnap1.onrender.com/").then((res) => {
      axios.get("https://xnap1.onrender.com/Leads").then((res) => {
        const leads = res.data;
        console.log(leads);
        SetLeads(leads);
      });
    });
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

  return (
    <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
      <thead>
        <tr>
          <th colSpan={10}>
            <div>
              <div className="mdc-select" role="listbox">
                <select
                  className="mdc-select__native-control"
                  value={selectedParent}
                  onChange={(e) => setSelectedParent(e.target.value)}
                >
                  <option value="" disabled>
                    Select Parent Alias
                  </option>
                  {parentAliases.map((item,i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <div className="mdc-line-ripple"></div>
              </div>
              <div className="mdc-select" role="listbox">
                <select className="mdc-select__native-control">
                  <option value="" disabled>
                    Select Child Alias
                  </option>
                  {childAliases.map((item,i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <div className="mdc-line-ripple"></div>
              </div>
            </div>
          </th>
        </tr>
        <tr>
          <th colSpan={3}>
            <div>
              <select
                className="mdl-textfield__input"
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="">Select State</option>
                {states}
              </select>
            </div>
          </th>
          <th colSpan={3}>
            <div>
              {selectedState}
              <select
                className="mdl-textfield__input"
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
              >
                <option value="">Select City</option>
                {cities}
              </select>
            </div>
          </th>
          <th colSpan={1}></th>
        </tr>
        <tr>
          <th className="mdl-data-table__cell--non-numeric">Name</th>
          <th className="mdl-data-table__cell--non-numeric">Url</th>
          <th className="mdl-data-table__cell--non-numeric">categories</th>
          <th className="mdl-data-table__cell--non-numeric">City State</th>
          <th className="mdl-data-table__cell--non-numeric">zip</th>
          <th className="mdl-data-table__cell--non-numeric">Phone</th>
          <th className="mdl-data-table__cell--non-numeric">rating</th>
          <th className="mdl-data-table__cell--non-numeric">Review Count</th>
          <th className="mdl-data-table__cell--non-numeric">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={7}>
            <button
              className="mdl-button mdl-js-button mdl-button--icon"
              onClick={() => addone()}
            >
              <i className="material-icons">add</i>
            </button>
          </td>
        </tr>
        {leads.map((lead) => (
          <tr key={lead._id}>
            <td className="mdl-data-table__cell--non-numeric">{lead.xname}</td>
            <td className="mdl-data-table__cell--non-numeric">
              <a href={lead.xurl} target="_blank">
                {lead.xurl}
              </a>
            </td>
            <td className="mdl-data-table__cell--non-numeric">
              {lead.categories}
            </td>
            <td className="mdl-data-table__cell--non-numeric">
              {lead.citystate}
            </td>
            <td className="mdl-data-table__cell--non-numeric">{lead.zip}</td>
            <td className="mdl-data-table__cell--non-numeric">
              <a href={`tel:${lead.xphone}`}>{lead.xphone}</a>
            </td>
            <td className="mdl-data-table__cell--non-numeric">{lead.rating}</td>
            <td className="mdl-data-table__cell--non-numeric">
              {lead.review_count}
            </td>
            <td className="mdl-data-table__cell--non-numeric">
              <button
                className="mdl-button mdl-js-button mdl-button--icon"
                onClick={() => handleDelete(lead._id)}
              >
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
