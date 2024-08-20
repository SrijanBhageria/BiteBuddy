import React from "react";

function Carousel() {
  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      style={{ objectFit: "contain" }}
    >
      <div className="carousel-inner" id="carousel">
        <div className="carousel-caption" style={{ zIndex: "10" }}>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success text-white bg-black"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
        <div className="carousel-item active">
          <img
            src="https://images.unsplash.com/photo-1712746786164-6bcf28c09cfe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZ1bGwlMjBlbmdsaXNoJTIwYnJlYWtmYXN0fGVufDB8fDB8fHww"
            className="d-block w-100 img-fluid"
            style={{
              filter: "brightness(40%) contrast(120%) saturate(130%)",
              objectFit: "cover",
            }}
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D"
            className="d-block w-100 img-fluid"
            style={{
              filter: "brightness(40%) contrast(120%) saturate(130%)",
              objectFit: "cover",
            }}
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9zYXxlbnwwfHwwfHx8MA%3D%3D"
            className="d-block w-100 img-fluid"
            style={{
              filter: "brightness(40%) contrast(120%) saturate(130%)",
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
  );
}

export default Carousel;
