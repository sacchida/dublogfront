import React from "react";
import { useState, useEffect } from "react";
import { createContext } from "react";
import {useParams } from "react-router-dom";
import Footer from "./Footer";
import { YoutubeEmbed } from "./YoutubeEmbed";
// eslint-disable-next-line
import ReactMarkdown from 'react-markdown'
import ImageEmbed from "./ImageEmbed";

export const ArticleContext = createContext();

export function toDate(param) {
  const date = new Date(param);
  const formatDate = date.toDateString();
  return formatDate;
}

const Article = () => {
  const [data, setData] = useState("");
  const { slug } = useParams();
  const apiURL =
    "http://localhost:1337/api/articles?filters[art_slug][$eq]="+slug+"&populate=art_img,Dynamic.url,writer.wr_photo,category";

  useEffect(() => {
    // let { host, hostname, href, origin, pathname, port, protocol, search } =
    //   window.location;

    // let URL1 = origin.replace("3000", "1337");
    // let URL = URL1.concat(apiURL);

    fetch(apiURL)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Error");
        }
        return resp.json();
      })
      .then((item) => {
        const temp = item.data.map((item) => {
          return {
            id: item.attributes.art_id,
            title: item.attributes.art_title,
            content: item.attributes.art_content,
            img: "http://localhost:1337" + item.attributes.art_img.data.attributes.url,
            writer: item.attributes.writer.data.attributes.wr_name,
            writer_photo:
              "http://localhost:1337" +
              item.attributes.writer.data.attributes.wr_photo.data.attributes
                .url,
            date: toDate(item.attributes.createdAt),
            category:
              item.attributes.category.data === null
                ? "All"
                : item.attributes.category.data.attributes.ctgy_slug,
            newContent: item.attributes.Dynamic,
          };
        });
        setData(temp);
        // console.log(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [apiURL]);

  //   <div className="card rounded">
  //     <div className="card-body post-header">
  //       <div className="card-text text-white">
  //         <h1 className="m-3 p-3 fw-bold"></h1>
  //       </div>
  //     </div>
  // <UserContext.Provider value={data}>
  //     <div style={{ height: "40%", width: "40%" }} className="mx-auto">
  //       <img src={data[0].img} alt="img-article" className="img-fluid" />
  //     </div>
  //   </div>;

  
    /* image 
                    <div style={{ height: "3rem", width: "3rem" }}>
                <img
                    src={data[0].writer_photo}
                    alt="writer-photo"
                    className="rounded img-thumbnail img-fluid"
                />
                </div>
                */
  

  return (
    data ? (
      <div>
        <div className="post-header">
          <div class="header-content ps-5 pe-5">
            <p class="fs-1 text-white m-3 p-3 fw-bold"> {data[0].title} </p>
            <img
              src={data[0].img}
              alt="img"
              class="header-img img-fluid mb-3"
              style={{
                backgroundColor: 'white'
              }}
            />
          </div>
        </div>
        <div
          className="container-fluid text-center"
          style={{ marginTop: "5rem" }}
        >
          <section className="row m-4 d-flex justify-content-evenly">
            
            <div className="col">
              <span class="badge bg-warning text-dark text-uppercase fw-bold">
                {data[0].category}
              </span>
            </div>
            {/* date */}
            <p className="col font-monospace float-end">
              {toDate(data[0].date)}
            </p>
          </section>
          {/* content */}
        </div>
        <div className="m-3">
          {
            data[0].newContent ?
                data[0].newContent.map((item) => {
                  if (item.type === "text") {
                    return (
                      <div className='pb-5 ms-5 me-5 m-5'>
                        <ReactMarkdown>{item.text}</ReactMarkdown>
                      </div>
                    );
                  } else if(item.type === "youtubeEmbed") {
                    return (
                      <div className='pb-5'>
                        <YoutubeEmbed url={item.text} />
                      </div>
                    );
                  } else {
                    return(
                        <div className='pb-5' >
                          <ImageEmbed url={item.url}/>
                        </div>
                    )
                  }
                }) : null
            }
        </div>
        <Footer />
      </div>
    ) : null
  );
};

export default Article;
