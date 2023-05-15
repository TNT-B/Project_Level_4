import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../Redux/Actions/ProductActions";

const Test = (props) => {
  const { test } = props;
//   const dispatch = useDispatch();

//   const deletehandler = (_id) => {
//     if (window.confirm("Bạn chắc chứ??")) {
//       dispatch(deleteProduct(_id));
//     }
//   };

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {test.name}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
