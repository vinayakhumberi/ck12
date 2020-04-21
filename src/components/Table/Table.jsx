import React, { useLayoutEffect, useState, useMemo } from 'react';
import './Table.css';

export default function(props) {
  const [ tocData, setTocData ] = useState(null);
  const [sectionsData, setSectionsData] = useState({});
  const [active, setActive] = useState(null);
  useLayoutEffect(() => {
    fetch(`http://localhost:3000/api/book/${props.subject}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTocData(data.response);
      });
  }, []);
  const handleGetSections = (e) => {
    const id = e.target.getAttribute('data-id');
    if (!sectionsData[id]) {
      fetch(`http://localhost:3000/api/book/maths/section/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSectionsData({...sectionsData, ...data.response});
      });
    }
    const status = active === id ? null : id;
    setActive(status);
  };

  const handleOpenSection = (e) => {
    e.stopPropagation();
    const title = e.target.innerText;
    alert(`Clicked on ${title}`);
  }

  const tables = tocData && tocData.map((item) => (
    <div key={item.id} className={`rows ${active === item.id + "" && sectionsData[item.id] ? 'active' : ''}`} onClick={handleGetSections}>
      <button data-id={item.id} className="coll">{item.title} <span className="material-icons">
        chevron_right
      </span></button>
      <div className="coll-body">
        {
          sectionsData[item.id] && sectionsData[item.id].map((item) => (
            <a key={item.id} href="javascript:void()" onClick={handleOpenSection} >
              {item.title}
            </a>
          ))
        }
      </div>
    </div>
  ));
  return(
    <div className="toc">
      {tables}
    </div>
  );
}