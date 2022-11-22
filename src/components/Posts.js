import React from "react";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./Main";

const Posts = () => {
  const { data } useContext(UserContext);

  useEffect(() => {
    console.log("Posts running useEffect...");
    console.log(data);
  }, [data]);

  /* 
  <div className={cls} key={item.id} data-tag={item.category_slug}>
      
      <img  src={item.img} alt="img" className="post-img" />
      
      <h2 className="category"> {item.category} </h2>
      
      <Link to={`/${item.id}`}  className="post-title">
          {item.title}
      </Link>

      <span className="post-date">{formatDate}</span>
      <p className="post-decription">
          {item.descr}
      </p>
      
      <div className="profile">
          <img  src={item.writer_photo} alt="" className="profile-img" />
          <span className="profile-name">{item.writer}</span>
      </div>
  
  </div>
  */


  return (
    <div style={{ marginBottom: '5rem' }}>
      <section className="post container">
        {data ?
          data.map((item) => {
            const date = new Date(item.date);
            const formatDate = date.toDateString();
            const articleData = {
              img: item.img,
            };
            return (
              <div
                className="card post-box"
                key={item.id}
                data-tag={item.category_slug}
                style={{ height: '32rem', width: '20rem' }}
              >
                <Link to={`/${item.slug}`}>
                  <img
                    src={articleData.img}
                    class="card-img-top mx-auto rounded responsive-img p-2"
                    alt="img"
                    style={{ height: '15rem', width: '100%', backgroundColor: 'white' }}
                  />
                </Link>

                <div class="card-body">
                  <Link to={`/${item.slug}`}>
                    <p className="fs-4 fw-bold post-title" >
                      {item.title}
                    </p>

                    <h6 class="card-subtitle text-muted">
                      {" "}
                      {formatDate}{" "}
                    </h6>
                  </Link>
                </div>

                <div class="card-footer">
                  <small class="text-muted">
                    <span class="badge bg-warning text-dark text-uppercase fw-bold">
                      {" "}
                      {item.category}{" "}
                    </span>
                  </small>
                </div>

              </div>
            );
          }) : null
        }

      </section>
    </div>
  );
};

export default Posts;
