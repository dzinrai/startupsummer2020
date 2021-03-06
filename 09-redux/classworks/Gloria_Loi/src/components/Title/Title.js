import React from "react";
import { useSelector } from "react-redux";

import svg from "../../assets/images/react.svg";

import "./Title.css";

const Title = () => {
  const { data } = useSelector((state) => state.subRedditTitle);
  return (
    <div className="title-logo">
      <img src={data.icon_img ? data.icon_img : svg} className="logo-img" />
      <div className="title-container">
        <div className="main-title">{data.title}</div>
        <div>{data.display_name_prefixed}</div>
      </div>
    </div>
  );
};

export default Title;
