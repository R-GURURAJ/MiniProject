import React, { useState } from "react";
import amzdata, { amazon } from "./database.json";
import flipdata, { flipkart } from "./database.json";
import { CgDetailsMore } from "react-icons/cg";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { TbLink } from "react-icons/tb";

import "./App.css";

var objFlip = {};
var objDetailsFlip = {};
var objSpecFlip = {};

var objAmz = {};
var objAmzDetails = {};
var objAmzSpec = {};

const Amazoncard = () => {
  const [isActive, setActive] = useState("false");

  const handleToggleAmz = (valObj) => {
    setActive(!isActive);
    objAmz = valObj;
    objAmzDetails = valObj.detials;
    objAmzSpec = valObj.detials.detialSpec;
  };

  const handleToggleAmzClose = () => {
    setActive(!isActive);
  };
  return (
    <div className="hide_part">
      <div className={isActive ? "hidden" : ""}>
        <div className="change_btn">
          <button className="btn_back_ama" onClick={handleToggleAmzClose}>
            <MdOutlineKeyboardBackspace fontSize="1.7em" />
          </button>
          <button className="visitLink">
            <a href={objAmz.link} target="_blank" rel="noreferrer">
              <TbLink fontSize="2em" color="black" />
            </a>
          </button>
        </div>
        <div className="TotalContant">
          <div className="proHeadImage">
            <img
              src={objAmz.image}
              alt={objAmz.image}
              className="productimage"
            />
         
          {/* <div className="proBodyDetails"> */}
            <h4 className="product-name">
              Title : <span>{objAmz.name}</span>
            </h4>
            <h4 className="product-deliCharg">
              Specifications:<span> {objAmzDetails.detailSpecification}</span>
            </h4>
            <h4 className="product-price">
              price : <span>{objAmzDetails.detailPrice}</span>
            </h4>
            <h4 className="product-rating">
              Rating :<span> {objAmzDetails.detailRating}</span>
            </h4>
            <h4 className="product-offer">
              Offer : <span>{objAmzDetails.detailOffer}</span>
            </h4>

            <h4 className="product-rated">
              No of People Rated : <span>{objAmzDetails.detailCustomerRated}</span>
            </h4>
            <h4 className="product-emi">
              EMI : <span>{objAmzDetails.detailEmi}</span>
            </h4>
            <h4 className="product-replacement">
              Replacement : <span>{objAmzDetails.detialReplacement}</span>
            </h4>
            <h4 className="product-offer">
              Offer : <span>{objAmzDetails.detailOffer}</span>
            </h4>
          {/* </div> */}
          </div>
        </div>
      </div>

      <div className="amazonbox">
        <div className={isActive ? "" : "hidden"}>
          {amzdata.amazon.map((x) => {
            return (
              <div key={x.id} className="amazoncard">
                <img src={x.image} alt={x.image} className="productimage" />
                <div className="cardcontent">
                <a href={x.link}>{x.detials.detailName}</a>
                  <br />
                  <br />
                  <p>PRICE: {x.detials.detailPrice}</p>
                  <p>RATING: {x.detials.detailRating}</p>
                  <p>OFFER: {x.detials.detailOffer}</p>
                </div>
                <button
                  className="btnAmz"
                  onClick={() => {
                    objAmz = x;
                    handleToggleAmz(objAmz);
                  }}
                >
                  <CgDetailsMore color="#000" fontSize="1.5em" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Flipkartcards = () => {
  const [isActive, setActive] = useState("false");

  const handleToggle = (valObj) => {
    setActive(!isActive);
    objFlip = valObj;
    objDetailsFlip = valObj.detials;
    objSpecFlip = valObj.detials.detailSpecification;
  };

  const handleToggleClose = () => {
    setActive(!isActive);
  };
  return (
    <div className="hide_part">
      <div className={isActive ? "hidden" : ""}>
        <div className="change_btn">
          <button className="btn_back_fli" onClick={handleToggleClose}>
            <MdOutlineKeyboardBackspace fontSize="1.7em" />
          </button>
          <button className="visitLink">
            <a href={objFlip.link} target="_blank" rel="noreferrer">
              <TbLink fontSize="1.7em" color="black" />
            </a>
          </button>
        </div>
        <div className="TotalContant">
          <div className="proHeadImage">
            <img
              src={objFlip.image}
              alt={objFlip.image}
              className="productimage"
            />
          {/* </div> */}
          {/* <div className="proBodyDetails"> */}
            <h4 className="product-name">
              Title : <span>{objFlip.name}</span>
            </h4>
            <h4 className="product-deliCharg">
                Specifications: <span>{objDetailsFlip.detailSpecification}</span>
              </h4>
              <h4 className="product-price">price : <span>{objDetailsFlip.detailPrice}</span></h4>
              <h4 className="product-rating">
                Rating : <span>{objDetailsFlip.detailRating}</span>
              </h4>
              <h4 className="product-offer">Offer : <span>{objDetailsFlip.detailOffer}</span></h4>
          

          <h3 className="product-rated">
            No of People Rated : <span>{objDetailsFlip.detailCustomerRated}</span>
          </h3>
          <h3 className="product-emi">
            EMI :<span> {objDetailsFlip.detailEmi}</span>
          </h3>
          <h3 className="product-replacement">
            Replacement : <span>{objDetailsFlip.detialReplacement}</span>
          </h3>
          <h3 className="product-offer">
            Offer : <span>{objDetailsFlip.detailOffer}</span>
          </h3>
        </div>
      </div>
      </div>
      <div className="flipkartbox">
        <div className={isActive ? "" : "hidden"}>
          {flipdata.flipkart.map((y) => {
            return (
              <div>
                <div key={y.id} className={isActive ? "" : "hidden"}>
                  <div className="flipkartcard adjus">
                    <img src={y.image} alt={y.image} className="productimage" />
                    <br />
                    <div className="cardcontent">
                    <a href={y.link}>{y.detials.detailName}</a>
                      <br />
                      <br />
                      <p>PRICE: {y.detials.detailPrice}</p>
                      <p>RATING: {y.detials.detailRating}</p>
                      <p>OFFER: {y.detials.detailOffer}</p>
                    </div>

                    <button
                      className="btnFli"
                      onClick={() => {
                        objFlip = y;
                        handleToggle(objFlip);
                      }}
                    >
                      <CgDetailsMore color="#000" fontSize="1.5em" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export { Flipkartcards, Amazoncard };
