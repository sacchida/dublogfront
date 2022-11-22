import React from "react";
import { useState, useEffect } from "react";

const Top = () => {
  const [data, setData] = useState("");
  const URL = "http://localhost:1337/api/categories";

  useEffect(() => {
    fetch(URL)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Error");
        }
        return resp.json();
      })
      .then((item) => {
        const temp = item.data.map((item) => {
          return {
            id: item.attributes.ctgy_id,
            name: item.attributes.ctgy_name,
            slug: item.attributes.ctgy_slug,
          };
        });
        setData(temp);
        console.log(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <section className="home" id="home" style={{marginBottom: '1rem'}}>
        <div className="home-text container">
          <p className="home-title fw-bold">University of Delhi</p>
          <span className="home-subtitle">News Portal</span>
        </div>
      </section>

      <div className="post-filter container" >
          <ul style={{  display: 'flex', flexWrap: 'wrap'}}>
            <li>
                <button style={{backgroundColor: 'transparent',  margin: '0.3rem'}} type="button" className="btn btn-outline-light rounded-pill text-white" data-toggle="portfilter" data-target="all"> All </button>
            </li>
            { data ? 
                data.map(item => {
                    return(
                      <li>
                          <button style={{backgroundColor: 'transparent', margin: '0.3rem'}} type="button" key={item.slug} className="btn btn-light btn-outline-light rounded-pill text-white" data-toggle="portfilter" data-target={item.slug}> {item.name} </button>
                      </li>
                    );
                }) : null
            }
            </ul>
        </div>
      
    </div>
  );
};

export default Top;
