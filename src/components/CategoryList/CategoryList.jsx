import React from 'react';

const CategoryList = () => {
  return (
    <div className="container-fluid px-custom mt-5 mb-5">
      <div className="row g-4 justify-content-center">
        {categories.map((cat) => (
          <div key={cat.id} className="col-6 col-sm-4 col-md-2 text-center">
            <div className="category-item">
              <div className="category-image-wrapper mb-3">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="img-fluid category-img"
                />
              </div>
              <h6 className="category-name">{cat.name}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;