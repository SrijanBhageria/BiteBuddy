import React, { useState, useEffect } from "react";
import Card from "./Card";

function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://127.0.0.1:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setfoodItem(response[0]);
    setfoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain" }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  borderRadius: "25px",
                  padding: "0.5rem",
                  fontSize: "1rem",
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid #ccc",
                  color: "#000", 
                  width: "100%", 
                  maxWidth: "600px",
                }}
              />
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1712746786164-6bcf28c09cfe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZ1bGwlMjBlbmdsaXNoJTIwYnJlYWtmYXN0fGVufDB8fDB8fHww"
              className="d-block w-100"
              style={{
                filter: "brightness(50%) contrast(130%) saturate(150%)",
                height: "100%",
                objectFit: "cover", 
              }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D"
              className="d-block w-100"
              style={{
                filter: "brightness(50%) contrast(130%) saturate(150%)",
                height: "100%",
                objectFit: "cover", 
              }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9zYXxlbnwwfHwwfHx8MA%3D%3D"
              className="d-block w-100"
              style={{
                filter: "brightness(50%) contrast(130%) saturate(150%)",
                height: "100%",
                objectFit: "cover", 
              }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container mt-4">
        {foodCat.length > 0 ? foodCat.map((data) => {
          return (
            <div className="row mb-4" key={data._id}>
              <div className="col-12">
                <h2 style={{ color: "#333", fontWeight: "bold", fontSize: "2rem", textAlign: "center" }}>
                  {data.CategoryName}
                </h2>
                {!search && (
                  <p style={{ color: "#666", fontStyle: "italic", fontSize: "1.1rem", textAlign: "center" }}>
                    Explore our wide range of {data.CategoryName.toLowerCase()} items. Here’s a selection of what we offer:
                  </p>
                )}
                <hr style={{ color: "#000", borderTop: "2px solid #000" }} />
              </div>
              {foodItem.length > 0 ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                .map(filterItems => {
                  return (
                    <div key={filterItems._id} className="col-12 col-sm-6 col-lg-3 mb-4">
                      <Card foodItem = {filterItems}
                        options={filterItems.options[0]}
                        
                      />
                    </div>
                  )
                }
                ) : <div className="text-center" style={{ color: "#ff0000", fontWeight: "bold" }}>No such data found</div>}
            </div>
          )
        }) : ""}
      </div>
    </>
  );
}

export default Home;
