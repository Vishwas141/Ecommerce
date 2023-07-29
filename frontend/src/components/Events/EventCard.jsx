import React from "react";
import styles from "../../styles/styles";

import { Link } from "react-router-dom";

import CountDown from "./CountDown";
import { toast } from "react-toastify";

const EventCard = () => {

  return (
    <div
      className={`w-full block bg-white rounded-lg
         "mb-12"
       lg:flex p-2`}
    >
      <div className="w-full lg:-w[50%] m-auto">
        <img  className="w-[50%] object-contain"src="data:image/jpeg;base64,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" alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{`I Phone 14 Max`}</h2>
        <p>{"Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings."}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {"1000000"}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {"999999"}$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {"200"} sold
          </span>
        </div>
        <CountDown />
        <br />
        <div className="flex items-center">
          <Link to="/">
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div className={`${styles.button} text-[#fff] ml-5`} >Add to cart</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;