import { Footer } from "antd/lib/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import NavHeader from "../../components/NavHeader/NavHeader";
import { getRoomAction } from "../../redux/Actions/userActions";
import Banner from "../Banner/Banner";
import FooterNav from "../Footer/Footer";
import LargeCard from "../LargeCard/LargeCard";
import ListRoom from "./ListRoom/ListRoom";
import "./TrangChu.css";

export default function TrangChu() {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRoomAction());
  }, []);
  return (
    <div className="bg-gray-50">
      <Banner />
      <div className=" bg-white  rounded-md shadow-md">
        <ListRoom />
        <div className="large__card">
          <LargeCard
            img="https://links.papareact.com/4cj"
            title="The Greatest Outdoors"
            description="Wishlists curated by Airbnb."
            buttonText="Get Inspired"
          />
        </div>
      </div>
      <FooterNav />
    </div>
  );
}
