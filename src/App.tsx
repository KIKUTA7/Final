import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./App2.css";
import "./App.css";
import Filter from "./components/filter";
import Header from "./components/header";
import Myauto from "./components/myauto";
import Navbar from "./components/navbar";
import Main from "./components/main";

function App() {
  const [link, setLink] = useState<string>(
    "https://api2.myauto.ge/ka/products/?ForRent=&Mans=&Cats=&PriceFrom=&PriceTo=&Period=&SortOrder=&Page="
  );
  const [filteredCarIds, setFilteredCarIds] = useState<number[]>([]);
  const [fullLink, setFullLink] = useState<string>(
    "https://api2.myauto.ge/ka/products/?ForRent=&Mans=&Cats=&PriceFrom=&PriceTo=&Period=&SortOrder=&Page="
  );

  const selectCurrency = (currency: string) => {
    setCurrency(currency);
  };

  useEffect(() => {
    fetch(fullLink)
      .then((response) => response.json())
      .then((data) => {
        const ids = data.data.items.map((item: any) => item.car_id);
        setFilteredCarIds(ids);
      })
      .catch((err) => console.log(err));
  }, [fullLink]);

  const [currency, setCurrency] = useState<string>("GEL");
  const [period, setPeriod] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const currRef = useRef<HTMLDivElement>(null);

  const [car, setCar] = useState<any[]>([]);

  interface MetaData {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  }

  const [metaData, setMetaData] = useState<MetaData | null>(null);

  let IDs: number[] = car.map((x) => x.car_id);

  useEffect(() => {
    fetch(fullLink)
      .then((response) => response.json())
      .then((data) => {
        setCar(data.data.items);
        setMetaData(data.data.meta);
      })
      .catch((err) => console.log(err));
    console.log(fullLink);
  }, [fullLink]);

  const handlePeriodChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let per = parseInt(event.target.value);
    setPeriod(
      per <= 3 ? `${per}h` : per <= 72 ? `${per / 24}d` : `${per / 168}w`
    );
  };

  const handleSortOrderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(parseInt(event.target.value));
  };

  useEffect(() => {
    console.log(page);
  }, [page]);

  useEffect(() => {
    setFullLink(
      link + "&Period=" + period + "&SortOrder=" + sortOrder + "&Page=" + page
    );
  });

  const [filter, setFilter] = useState<any>(false);

  const styles: React.CSSProperties = {
    width: "15px",
  };

  return (
    <>
      <Header />
      <Myauto />
      <button
        className="hidden"
        onClick={() => {
          setFilter(!filter);
        }}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 4H7.5"
            stroke="black"
            stroke-width="1.4"
            stroke-linecap="round"
          ></path>
          <circle
            cx="10"
            cy="4"
            r="2.3"
            stroke="black"
            stroke-width="1.4"
          ></circle>
          <path
            d="M12 10L6.5 10"
            stroke="black"
            stroke-width="1.4"
            stroke-linecap="round"
          ></path>
          <circle
            cx="4"
            cy="10"
            r="2.3"
            transform="rotate(-180 4 10)"
            stroke="black"
            stroke-width="1.4"
          ></circle>
        </svg>
        <div style={styles}></div>
        ფილტრი
      </button>
      {window.innerWidth > 1125 ? (
        <Filter
          setLink={setLink}
          selectCurrency={selectCurrency}
          currency={currency}
          setPage={setPage}
        />
      ) : (
        filter && (
          <Filter
            setLink={setLink}
            selectCurrency={selectCurrency}
            currency={currency}
            setPage={setPage}
          />
        )
      )}
      <Navbar />
      <Main
        filter={filter}
        Page={page}
        setPage={setPage}
        IDs={IDs}
        car={car}
        handlePeriodChange={handlePeriodChange}
        handleSortOrderChange={handleSortOrderChange}
        meta={metaData}
        selectCurrency={setCurrency}
        currency={currency}
      />
    </>
  );
}

export default App;
