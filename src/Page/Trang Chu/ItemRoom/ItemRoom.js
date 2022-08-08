import React from "react";
import { Card } from "antd";
import { NavLink } from "react-router-dom";

const { Meta } = Card;
export default function ItemRoom({ data }) {
  // console.log({ data });
  return (
    <div className="itemRoom w-1/3 p-3 ">
      <NavLink
        to={`/detail/${data._id}`}
        className="block w-full  cursor-pointer"
      >
        <Card
          hoverable
          style={{ width: "100%" }}
          cover={
            <img
              className=" w-full h-32 object-cover "
              alt="example"
              src={data.locationId.image}
            />
          }
        >
          <Meta
            title={
              <p className="text-2xl text-center font-bold text-red-600">
                {data.name}
              </p>
            }
          />
          <p className="text-red-600 font-normal text-center">
            {data.locationId.name} - {data.locationId.province} ,{" "}
            {data.locationId.country}
          </p>
        </Card>
      </NavLink>
    </div>
  );
}
