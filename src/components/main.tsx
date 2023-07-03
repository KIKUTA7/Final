import React, { useState } from "react";
import MainHeader from "./mainHeader";
import Cards from "./cards";
import Pages from "./pages";

interface MetaData {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

interface MainProps {
  IDs: number[];
  meta: MetaData | null;
  selectCurrency: Function;
  currency: string;
  handlePeriodChange: Function;
  handleSortOrderChange: Function;
  car: any[];
  setPage: Function;
  Page: number;
  filter: boolean;
  setLoaded: Function;
}

function Main(props: MainProps) {
  const handlePageChange = (pageNumber: number) => {
    props.setLoaded(false);
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.scrollTop = 0;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    props.setPage(pageNumber);
    setTimeout(() => props.setLoaded(true), 3000);
  };

  return (
    <div className="main">
      {props.meta && (
        <MainHeader
          filter={props.filter}
          handlePeriodChange={props.handlePeriodChange}
          handleSortOrderChange={props.handleSortOrderChange}
          num={props.meta.total}
        />
      )}
      <Cards
        car={props.car}
        IDs={props.IDs}
        page={props.Page}
        currency={props.currency}
        selectCurrency={props.selectCurrency}
      />
      {props.meta && (
        <Pages
          totalPages={
            props.meta.total % 15 === 0
              ? props.meta.total / 15
              : props.meta.total / 15 + 1
          }
          page={props.Page}
          handlePagechange={handlePageChange}
        />
      )}
      <div className="pageBottom"></div>
    </div>
  );
}

export default Main;
