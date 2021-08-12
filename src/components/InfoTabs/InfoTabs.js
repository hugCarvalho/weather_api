import React from "react";
import Days from "./Days/Days"

const InfoTabs = ({ data, isLoading, cityNotFound, validCity, forecast3Days }) => {
  const [activeTab, setActiveTab] = React.useState("today");
  const [filteredDataByDay, setFilteredDataByDay] = React.useState([]);

  // console.log("filteredByDay", filteredDataByDay);

  return <>
    <Days
      data={data}
      isLoading={isLoading}
      validCity={validCity}
      cityNotFound={cityNotFound}
      forecast3Days={forecast3Days}
      activeTab={activeTab}
    />
  </>
}

export {InfoTabs}