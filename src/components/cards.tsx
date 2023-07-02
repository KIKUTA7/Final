import React from "react";
import Car from "./car";
import { link } from "fs";

interface CardsProps {
  IDs: number[];
  page: number;
  selectCurrency: Function;
  currency: string;
  car: any[];
}

function Cards(props: CardsProps) {
  function getElementsPerPage(
    array: any[],
    pageNumber: number,
    elementsPerPage: number
  ): any[] {
    const startIndex: number = 0;
    const endIndex: number = startIndex + elementsPerPage;

    return array.slice(startIndex, endIndex);
  }

  return (
    <div className="cards">
      {getElementsPerPage(
        props.IDs.map((ID: number) => (
          <Car
            all_cars={props.car}
            id={ID}
            selectCurrency={props.selectCurrency}
            currency={props.currency}
          />
        )),
        props.page,
        15
      )}
    </div>
  );
}

export default Cards;
