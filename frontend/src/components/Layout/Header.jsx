import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import {CgProfile} from "react-icons/cg"
import DropDown from "./DropDown";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import Navbar from "./Navbar";

const Header = ({ activeHeading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropdown, setDropDown] = useState(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);

    console.log(filteredProducts);
  };

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                className="h-[70px]  w-[70px] rounded-full"
                src="data:image/jpeg;base64,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"
                alt=""
              />
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/product/${i.name}`} key={index}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={
                              Array.isArray(i.images) && i.images.length > 0
                                ? i.images[0]?.url
                                : ""
                            }
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className={`${styles.button}`}>
            <Link to="/seller">
              <h1 className="text-[#fff] flex items-center">
                Become Seller
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* catrgories */}

          <div>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-full w-full flex justify-between items-center pl-10 bg-white font-bold text-lg  select-none rounded-md`}
              >
                All Categories
              </button>

              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => {
                  setDropDown(!dropdown);
                }}
              />
              {dropdown ? <DropDown categoriesData={categoriesData} /> : null}
            </div>
          </div>
          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar activeHeading={activeHeading} />
          </div>

          <div className="flex gap-5">
             <div className={`${styles.noramlFlex}`}>

                <div className="relative cursor-pointer mr-[15px] ">
                    <AiOutlineShoppingCart size={30}  color='rgb(255 255 255/83%)'/>
                    <span className="absolute right-0 top-0 rounded-full w-4 h-4 p-0 m-0 text-white bg-blue-500 top right">1</span>
                </div>


             </div>
             <div className={`${styles.noramlFlex}`}>

                <div className="relative cursor-pointer mr-[15px] ">
                  
                  <AiOutlineHeart size={30}  color='rgb(255 255 255/83%)'/>
                    <span className="absolute right-0 top-0 rounded-full w-4 h-4 p-0 m-0 text-white bg-blue-500 top right">1</span>
                  
                   
                </div>


             </div>
             <div className={`${styles.noramlFlex}`}>

                <div className="relative cursor-pointer mr-[15px] ">
                  <Link to="/login">
                  <CgProfile size={30}  color='rgb(255 255 255/83%)'/>
                    <span className="absolute right-0 top-0 rounded-full w-4 h-4 p-0 m-0 text-white bg-blue-500 top right">1</span>
                  </Link>
                   
                </div>


             </div>
          </div>
        
          <div>
           
          </div>



        </div>
      </div>
    </>
  );
};

export default Header;
