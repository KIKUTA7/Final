import DropdownCheckbox from "./DropdownCheckbox";
import React, { useEffect, useState } from "react";
import DropdownCheckboxGroup from "./DropdownCheckboxGroup";
const garigebis_tipi = ["იყიდება", "ქირავდება"];

interface FilterProps {
  setLink: React.Dispatch<React.SetStateAction<string>>;
  currency: string;
  selectCurrency: Function;
  setPage: Function;
  setLoaded: Function;
}

function Filter({
  setLoaded,
  setLink,
  currency,
  selectCurrency,
  setPage,
}: FilterProps) {
  const [selectedBox, setSelectedBox] = useState<number | null>(1);
  const [manNames, setManNames] = useState<string[]>([]);
  const [dataFromMans, setDataFromMans] = useState<any[]>([]);
  const [dataFromModel, setDataFromModel] = useState<any[]>([]);
  const [seoTitles, setSeoTitles] = useState<string[]>([]);
  const [dataFromCat, setDataFromCat] = useState<any[]>([]);
  const [model_names, setModel_names] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [selectedManId, setSelectedManId] = useState<number>(0);
  const [lowerBoundPrice, setLowerBoundPrice] = useState<number>(0);
  const [upperBoundPrice, setUpperBoundPrice] = useState<number>(10000000);
  const [garigebisTipi, setGarigebisTipi] = useState<string[]>([]);
  const [manName, setManName] = useState<string[]>([]);
  const [model, setModel] = useState<{ [key: string]: string[] }>({});
  const [cat, setCat] = useState<string[]>([]);

  const handleManNameSelection = (selectedManNames: string[]) => {
    if (selectedManNames.length === 0) {
      setSelectedManId(0);
    } else {
      const selectedManId = dataFromMans.find(
        (item: any) => item.man_name === selectedManNames[0]
      ).man_id;
      setSelectedManId(selectedManId);
    }
  };

  useEffect(() => {
    if (manName.length > 0) {
      const fetchModels = async () => {
        let allModels: { [key: string]: string[] } = {};
        for (let name of manName) {
          const manId = dataFromMans.find(
            (item: any) => item.man_name === name
          ).man_id;
          const response = await fetch(
            `https://api2.myauto.ge/ka/getManModels?man_id=${manId}`
          );
          const data = await response.json();
          setDataFromModel((prevData) => [...prevData, ...data.data]);
          const models = data.data.map((item: any) => item.model_name);
          allModels[name] = models;
        }
        setModel_names(allModels);
      };

      fetchModels();
    } else {
      setModel_names({});
    }
  }, [manName]);

  useEffect(() => {
    fetch("https://api2.myauto.ge/ka/cats/get")
      .then((response) => response.json())
      .then((data) => setDataFromCat(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const newSeoTitles = dataFromCat
      .filter((item) => {
        if (
          selectedBox !== null &&
          item.vehicle_types.includes(selectedBox - 1)
        ) {
          return true;
        }
        return false;
      })
      .map((item) => item.title)
      .sort();

    setSeoTitles(newSeoTitles);
  }, [selectedBox, dataFromCat]);

  useEffect(() => {
    fetch("https://static.my.ge/myauto/js/mans.json")
      .then((response) => response.json())
      .then((data) => setDataFromMans(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const newManNames = dataFromMans
      .filter((item) => {
        if (selectedBox === 1) return item.is_car === "1";
        if (selectedBox === 2) return item.is_spec === "1";
        if (selectedBox === 3) return item.is_moto === "1";
        return false;
      })
      .map((item) => item.man_name)
      .sort();
    setManNames(newManNames);
  }, [selectedBox, dataFromMans]);

  const handleBoxClick = (boxNumber: number) => {
    setSelectedBox(boxNumber === selectedBox ? null : boxNumber);
    setManName([]);
    setCat([]);
    setModel({});
    setGarigebisTipi([]);
  };

  const handleFilter = () => {
    setLoaded(false);
    setPage(1);
    const ForRent = garigebisTipi.map((x) => (x === "იყიდება" ? 0 : 1)).join();
    const manIdsForNames = manName.map(
      (name) => dataFromMans.find((man: any) => man.man_name === name)?.man_id
    );

    const temp = Object.entries(model)
      .map(([key, values]) => {
        const modelIds =
          values.length === 0
            ? ""
            : `.${values
                .map(
                  (name) =>
                    dataFromModel.find((x: any) => x.model_name === name)
                      ?.model_id
                )
                .join(".")}`;
        return `${
          dataFromMans.find((man: any) => man.man_name === key)?.man_id
        }${modelIds}`;
      })
      .join("-");
    const keys = Object.keys(model).map(
      (name) => dataFromMans.find((man: any) => man.man_name === name)?.man_id
    );
    const unMan = manIdsForNames
      .map((x) => (keys.find((man: any) => man === x) ? "" : "-" + x))
      .join("");
    const Mans = temp + unMan;
    const catIdsForNames = cat.map(
      (name) => dataFromCat.find((x: any) => x.title === name)?.category_id
    );
    const Cats = catIdsForNames.join(".");
    const PriceFrom =
      currency === "GEL" ? lowerBoundPrice : lowerBoundPrice * 2.5;
    const PriceTo =
      currency === "GEL" ? upperBoundPrice : upperBoundPrice * 2.5;
    const url = `https://api2.myauto.ge/ka/products/?ForRent=${ForRent}&Mans=${Mans}&Cats=${Cats}&PriceFrom=${PriceFrom}&PriceTo=${PriceTo}`;
    setLink(url);
    setTimeout(() => setLoaded(true), 3000);
  };

  return (
    <div id="filter">
      <div id="rectangle">
        <div id="veh_type">
          <button
            className={`box ${selectedBox === 1 ? "selected" : ""}`}
            onClick={() => handleBoxClick(1)}
          >
            {selectedBox === 1 ? (
              <svg
                width="100%"
                height="33"
                viewBox="0 0 62 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M35.719 19.973C35.7021 19.3542 35.8701 18.7444 36.2016 18.2215C36.5332 17.6987 37.0131 17.2866 37.58 17.038C38.147 16.7894 38.7752 16.7155 39.3843 16.8258C39.9935 16.9361 40.5559 17.2256 40.9997 17.6572C41.4434 18.0889 41.7484 18.6431 41.8755 19.2489C42.0026 19.8548 41.9462 20.4848 41.7133 21.0585C41.4805 21.6321 41.0819 22.1232 40.5684 22.4691C40.055 22.8149 39.4501 22.9998 38.831 23C38.4278 23.006 38.0274 22.9323 37.6527 22.7834C37.278 22.6344 36.9363 22.413 36.6473 22.1319C36.3582 21.8507 36.1275 21.5153 35.9682 21.1449C35.8089 20.7744 35.7242 20.3762 35.719 19.973V19.973ZM37.89 19.973C37.8846 20.1599 37.9351 20.3442 38.0351 20.5023C38.135 20.6604 38.2798 20.785 38.4509 20.8604C38.6221 20.9357 38.8118 20.9583 38.9959 20.9252C39.18 20.8921 39.35 20.8049 39.4842 20.6746C39.6184 20.5444 39.7107 20.3771 39.7493 20.1942C39.788 20.0112 39.7711 19.8209 39.701 19.6475C39.6309 19.4741 39.5106 19.3256 39.3557 19.221C39.2007 19.1163 39.018 19.0603 38.831 19.06C38.5855 19.0571 38.3487 19.1515 38.1726 19.3225C37.9965 19.4936 37.8952 19.7275 37.891 19.973H37.89ZM20.262 19.973C20.2677 19.57 20.3528 19.1721 20.5124 18.802C20.672 18.4319 20.9029 18.0969 21.192 17.816C21.4811 17.5352 21.8227 17.3141 22.1972 17.1653C22.5718 17.0166 22.972 16.9431 23.375 16.949C23.7803 16.9362 24.1841 17.0051 24.5623 17.1514C24.9405 17.2977 25.2855 17.5185 25.5767 17.8007C25.868 18.0829 26.0995 18.4207 26.2577 18.7942C26.4158 19.1676 26.4973 19.569 26.4973 19.9745C26.4973 20.38 26.4158 20.7814 26.2577 21.1549C26.0995 21.5283 25.868 21.8661 25.5767 22.1483C25.2855 22.4306 24.9405 22.6514 24.5623 22.7977C24.1841 22.944 23.7803 23.0128 23.375 23C22.9719 23.0057 22.5716 22.9319 22.197 22.7828C21.8224 22.6338 21.4809 22.4124 21.1919 22.1313C20.9029 21.8502 20.6721 21.5149 20.5127 21.1445C20.3533 20.7742 20.2685 20.3761 20.263 19.973H20.262ZM22.434 19.973C22.4288 20.1597 22.4794 20.3436 22.5793 20.5014C22.6792 20.6591 22.8239 20.7835 22.9948 20.8586C23.1658 20.9338 23.3552 20.9562 23.539 20.9232C23.7228 20.8901 23.8925 20.803 24.0265 20.6729C24.1605 20.5429 24.2527 20.3759 24.2913 20.1932C24.33 20.0105 24.3132 19.8205 24.2433 19.6473C24.1734 19.4742 24.0534 19.3258 23.8987 19.2212C23.7441 19.1166 23.5617 19.0605 23.375 19.06C23.1295 19.0573 22.893 19.1518 22.7169 19.3228C22.5408 19.4939 22.4395 19.7276 22.435 19.973H22.434ZM42.761 20.349C42.7806 20.2278 42.7937 20.1056 42.8 19.983C42.7678 18.985 42.3487 18.0386 41.6313 17.344C40.914 16.6494 39.9545 16.261 38.956 16.261C37.9575 16.261 36.998 16.6494 36.2807 17.344C35.5633 18.0386 35.1442 18.985 35.112 19.983C35.1182 20.1056 35.1312 20.2278 35.151 20.349H27.051C27.0703 20.2278 27.083 20.1056 27.089 19.983C27.0809 19.4861 26.975 18.9956 26.7774 18.5396C26.5797 18.0836 26.2941 17.671 25.937 17.3253C25.5798 16.9797 25.1581 16.7078 24.6959 16.5252C24.2336 16.3426 23.7399 16.2528 23.243 16.261C22.2401 16.2455 21.2721 16.6287 20.5516 17.3263C19.831 18.024 19.4168 18.9792 19.4 19.982C19.4064 20.1046 19.419 20.2267 19.438 20.348H16.509C16.4432 20.3492 16.3778 20.3374 16.3165 20.3132C16.2553 20.2891 16.1994 20.2531 16.1521 20.2072C16.1048 20.1614 16.067 20.1067 16.0409 20.0463C16.0148 19.9858 16.0009 19.9208 16 19.855V17.942C16.0018 17.8377 16.045 17.7383 16.12 17.6658C16.195 17.5932 16.2957 17.5534 16.4 17.555V16.111C16.4037 15.7837 16.5174 15.4671 16.7227 15.2121C16.928 14.9571 17.213 14.7785 17.532 14.705L22.716 13.453L26.568 10.453C27.7883 9.50884 29.2881 8.99765 30.831 9.00001H37.738C38.176 8.99865 38.5996 9.15643 38.93 9.44401L42.33 12.409L43.423 12.351C43.7962 12.3263 44.1649 12.4434 44.4554 12.6789C44.746 12.9143 44.9369 13.2508 44.99 13.621L45.49 17.558C45.5559 17.5567 45.6214 17.5684 45.6828 17.5925C45.7442 17.6166 45.8002 17.6526 45.8476 17.6984C45.895 17.7442 45.9328 17.799 45.959 17.8595C45.9852 17.92 45.9991 17.9851 46 18.051V19.851C45.9992 19.917 45.9854 19.9822 45.9593 20.0428C45.9332 20.1035 45.8953 20.1583 45.8479 20.2043C45.8005 20.2502 45.7445 20.2863 45.683 20.3104C45.6216 20.3346 45.556 20.3463 45.49 20.345L42.761 20.349ZM27.448 11.755L25.6 13.191L35.237 12.719V10.549H30.984C29.704 10.5464 28.4596 10.9708 27.448 11.755ZM36.842 12.638L40.024 12.482L38.057 10.769C37.8942 10.6269 37.6851 10.549 37.469 10.55H36.843L36.842 12.638Z"
                  fill="#FD4100"
                />
              </svg>
            ) : (
              <svg
                width="100%"
                height="33"
                viewBox="0 0 62 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M35.719 19.973C35.7021 19.3542 35.8701 18.7444 36.2016 18.2215C36.5332 17.6987 37.0131 17.2866 37.58 17.038C38.147 16.7894 38.7752 16.7155 39.3843 16.8258C39.9935 16.9361 40.5559 17.2256 40.9997 17.6572C41.4434 18.0889 41.7484 18.6431 41.8755 19.2489C42.0026 19.8548 41.9462 20.4848 41.7133 21.0585C41.4805 21.6321 41.0819 22.1232 40.5684 22.4691C40.055 22.8149 39.4501 22.9998 38.831 23C38.4278 23.006 38.0274 22.9323 37.6527 22.7834C37.278 22.6344 36.9363 22.413 36.6473 22.1319C36.3582 21.8507 36.1275 21.5153 35.9682 21.1449C35.8089 20.7744 35.7242 20.3762 35.719 19.973V19.973ZM37.89 19.973C37.8846 20.1599 37.9351 20.3442 38.0351 20.5023C38.135 20.6604 38.2798 20.785 38.4509 20.8604C38.6221 20.9357 38.8118 20.9583 38.9959 20.9252C39.18 20.8921 39.35 20.8049 39.4842 20.6746C39.6184 20.5444 39.7107 20.3771 39.7493 20.1942C39.788 20.0112 39.7711 19.8209 39.701 19.6475C39.6309 19.4741 39.5106 19.3256 39.3557 19.221C39.2007 19.1163 39.018 19.0603 38.831 19.06C38.5855 19.0571 38.3487 19.1515 38.1726 19.3225C37.9965 19.4936 37.8952 19.7275 37.891 19.973H37.89ZM20.262 19.973C20.2677 19.57 20.3528 19.1721 20.5124 18.802C20.672 18.4319 20.9029 18.0969 21.192 17.816C21.4811 17.5352 21.8227 17.3141 22.1972 17.1653C22.5718 17.0166 22.972 16.9431 23.375 16.949C23.7803 16.9362 24.1841 17.0051 24.5623 17.1514C24.9405 17.2977 25.2855 17.5185 25.5767 17.8007C25.868 18.0829 26.0995 18.4207 26.2577 18.7942C26.4158 19.1676 26.4973 19.569 26.4973 19.9745C26.4973 20.38 26.4158 20.7814 26.2577 21.1549C26.0995 21.5283 25.868 21.8661 25.5767 22.1483C25.2855 22.4306 24.9405 22.6514 24.5623 22.7977C24.1841 22.944 23.7803 23.0128 23.375 23C22.9719 23.0057 22.5716 22.9319 22.197 22.7828C21.8224 22.6338 21.4809 22.4124 21.1919 22.1313C20.9029 21.8502 20.6721 21.5149 20.5127 21.1445C20.3533 20.7742 20.2685 20.3761 20.263 19.973H20.262ZM22.434 19.973C22.4288 20.1597 22.4794 20.3436 22.5793 20.5014C22.6792 20.6591 22.8239 20.7835 22.9948 20.8586C23.1658 20.9338 23.3552 20.9562 23.539 20.9232C23.7228 20.8901 23.8925 20.803 24.0265 20.6729C24.1605 20.5429 24.2527 20.3759 24.2913 20.1932C24.33 20.0105 24.3132 19.8205 24.2433 19.6473C24.1734 19.4742 24.0534 19.3258 23.8987 19.2212C23.7441 19.1166 23.5617 19.0605 23.375 19.06C23.1295 19.0573 22.893 19.1518 22.7169 19.3228C22.5408 19.4939 22.4395 19.7276 22.435 19.973H22.434ZM42.761 20.349C42.7806 20.2278 42.7937 20.1056 42.8 19.983C42.7678 18.985 42.3487 18.0386 41.6313 17.344C40.914 16.6494 39.9545 16.261 38.956 16.261C37.9575 16.261 36.998 16.6494 36.2807 17.344C35.5633 18.0386 35.1442 18.985 35.112 19.983C35.1182 20.1056 35.1312 20.2278 35.151 20.349H27.051C27.0703 20.2278 27.083 20.1056 27.089 19.983C27.0809 19.4861 26.975 18.9956 26.7774 18.5396C26.5797 18.0836 26.2941 17.671 25.937 17.3253C25.5798 16.9797 25.1581 16.7078 24.6959 16.5252C24.2336 16.3426 23.7399 16.2528 23.243 16.261C22.2401 16.2455 21.2721 16.6287 20.5516 17.3263C19.831 18.024 19.4168 18.9792 19.4 19.982C19.4064 20.1046 19.419 20.2267 19.438 20.348H16.509C16.4432 20.3492 16.3778 20.3374 16.3165 20.3132C16.2553 20.2891 16.1994 20.2531 16.1521 20.2072C16.1048 20.1614 16.067 20.1067 16.0409 20.0463C16.0148 19.9858 16.0009 19.9208 16 19.855V17.942C16.0018 17.8377 16.045 17.7383 16.12 17.6658C16.195 17.5932 16.2957 17.5534 16.4 17.555V16.111C16.4037 15.7837 16.5174 15.4671 16.7227 15.2121C16.928 14.9571 17.213 14.7785 17.532 14.705L22.716 13.453L26.568 10.453C27.7883 9.50884 29.2881 8.99765 30.831 9.00001H37.738C38.176 8.99865 38.5996 9.15643 38.93 9.44401L42.33 12.409L43.423 12.351C43.7962 12.3263 44.1649 12.4434 44.4554 12.6789C44.746 12.9143 44.9369 13.2508 44.99 13.621L45.49 17.558C45.5559 17.5567 45.6214 17.5684 45.6828 17.5925C45.7442 17.6166 45.8002 17.6526 45.8476 17.6984C45.895 17.7442 45.9328 17.799 45.959 17.8595C45.9852 17.92 45.9991 17.9851 46 18.051V19.851C45.9992 19.917 45.9854 19.9822 45.9593 20.0428C45.9332 20.1035 45.8953 20.1583 45.8479 20.2043C45.8005 20.2502 45.7445 20.2863 45.683 20.3104C45.6216 20.3346 45.556 20.3463 45.49 20.345L42.761 20.349ZM27.448 11.755L25.6 13.191L35.237 12.719V10.549H30.984C29.704 10.5464 28.4596 10.9708 27.448 11.755ZM36.842 12.638L40.024 12.482L38.057 10.769C37.8942 10.6269 37.6851 10.549 37.469 10.55H36.843L36.842 12.638Z"
                  fill="#8C929B"
                />
              </svg>
            )}
          </button>
          <button
            className={`box ${selectedBox === 2 ? "selected" : ""}`}
            onClick={() => handleBoxClick(2)}
          >
            {selectedBox === 2 ? (
              <svg
                width="100%"
                height="33"
                viewBox="0 0 62 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.735 21.2707C27.699 20.2695 27.2757 19.3213 26.5544 18.6257C25.833 17.9301 24.8698 17.5414 23.8675 17.5414C22.8652 17.5414 21.902 17.9301 21.1806 18.6257C20.4593 19.3213 20.036 20.2695 20 21.2707C20.036 22.2719 20.4593 23.2201 21.1806 23.9157C21.902 24.6113 22.8652 25 23.8675 25C24.8698 25 25.833 24.6113 26.5544 23.9157C27.2757 23.2201 27.699 22.2719 27.735 21.2707V21.2707ZM24.513 21.2707C24.5178 21.3992 24.484 21.5262 24.4161 21.6353C24.3481 21.7445 24.2491 21.8308 24.1317 21.8833C24.0143 21.9358 23.8838 21.9519 23.7572 21.9298C23.6305 21.9076 23.5133 21.848 23.4207 21.7588C23.3281 21.6696 23.2644 21.5547 23.2376 21.429C23.2108 21.3032 23.2222 21.1724 23.2704 21.0532C23.3186 20.934 23.4014 20.8319 23.508 20.7601C23.6147 20.6882 23.7404 20.6499 23.869 20.65C24.0365 20.6473 24.1983 20.7112 24.3189 20.8275C24.4394 20.9439 24.5088 21.1033 24.512 21.2707H24.513ZM42 20.0303C41.9742 18.6885 41.4166 17.4119 40.4496 16.4809C39.4826 15.5499 38.1854 15.0408 36.843 15.0655C35.5011 15.0411 34.2044 15.5502 33.2378 16.481C32.2712 17.4117 31.7138 18.688 31.688 20.0293C31.7135 21.3706 32.2708 22.6469 33.2375 23.5775C34.2042 24.5082 35.5011 25.017 36.843 24.9921C38.1849 25.017 39.4819 24.5084 40.4488 23.578C41.4158 22.6476 41.9737 21.3716 42 20.0303V20.0303ZM38.778 20.0303C38.7685 20.5338 38.5594 21.013 38.1965 21.3624C37.8336 21.7118 37.3468 21.9028 36.843 21.8934C36.3394 21.9025 35.8528 21.7114 35.4901 21.362C35.1275 21.0126 34.9185 20.5336 34.909 20.0303C34.919 19.5273 35.1282 19.0487 35.4908 18.6998C35.8534 18.3509 36.3397 18.16 36.843 18.1691C37.3464 18.1597 37.833 18.3505 38.1958 18.6994C38.5586 19.0484 38.768 19.5271 38.778 20.0303V20.0303ZM30.4 21.8934V20.0303H28.863C28.9697 20.4352 29.0241 20.852 29.025 21.2707C29.0256 21.4783 29.0122 21.6857 28.985 21.8914L30.4 21.8934ZM37.489 20.0303C37.4938 19.9019 37.4601 19.775 37.3922 19.6659C37.3244 19.5568 37.2254 19.4704 37.1081 19.4179C36.9908 19.3654 36.8605 19.3491 36.7339 19.3711C36.6073 19.3931 36.4901 19.4525 36.3974 19.5415C36.3048 19.6305 36.2409 19.7452 36.2138 19.8708C36.1868 19.9964 36.198 20.1272 36.2459 20.2464C36.2937 20.3657 36.3762 20.4679 36.4826 20.54C36.589 20.612 36.7145 20.6507 36.843 20.651C37.0109 20.6539 37.1732 20.5903 37.2942 20.474C37.4153 20.3576 37.4853 20.1981 37.489 20.0303V20.0303ZM30.529 18.7898C30.8563 17.3662 31.6612 16.0975 32.8099 15.1944C33.9585 14.2914 35.3817 13.8085 36.843 13.826C38.3304 13.8241 39.775 14.3238 40.943 15.2444L41.764 14.2868C40.4674 13.2689 38.8869 12.678 37.2403 12.5954C35.5937 12.5129 33.962 12.9428 32.57 13.826H23.864C23.194 13.8153 22.5471 14.0701 22.0645 14.5348C21.582 14.9995 21.3032 15.6363 21.289 16.3059V16.9736C22.077 16.5343 22.9647 16.3044 23.867 16.3059C24.7621 16.3006 25.6434 16.5264 26.4256 16.9614C27.2078 17.3964 27.8645 18.0258 28.332 18.7888L30.529 18.7898ZM26.446 12.5845V10.7234C26.436 10.2203 26.2268 9.74184 25.8642 9.3929C25.5016 9.04395 25.0153 8.85308 24.512 8.86218V10.0986C24.6798 10.0957 24.842 10.1594 24.9629 10.2757C25.0838 10.3921 25.1536 10.5516 25.157 10.7194V12.5845H26.446ZM32.2 12.5845C34.1898 11.44 36.5323 11.0705 38.778 11.547V8.24045H40.066V7H29.752V8.24045H30.874L29.69 12.5845H32.2Z"
                  fill="#FD4100"
                />
              </svg>
            ) : (
              <svg
                width="100%"
                height="33"
                viewBox="0 0 62 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.735 21.2707C27.699 20.2695 27.2757 19.3213 26.5544 18.6257C25.833 17.9301 24.8698 17.5414 23.8675 17.5414C22.8652 17.5414 21.902 17.9301 21.1806 18.6257C20.4593 19.3213 20.036 20.2695 20 21.2707C20.036 22.2719 20.4593 23.2201 21.1806 23.9157C21.902 24.6113 22.8652 25 23.8675 25C24.8698 25 25.833 24.6113 26.5544 23.9157C27.2757 23.2201 27.699 22.2719 27.735 21.2707V21.2707ZM24.513 21.2707C24.5178 21.3992 24.484 21.5262 24.4161 21.6353C24.3481 21.7445 24.2491 21.8308 24.1317 21.8833C24.0143 21.9358 23.8838 21.9519 23.7572 21.9298C23.6305 21.9076 23.5133 21.848 23.4207 21.7588C23.3281 21.6696 23.2644 21.5547 23.2376 21.429C23.2108 21.3032 23.2222 21.1724 23.2704 21.0532C23.3186 20.934 23.4014 20.8319 23.508 20.7601C23.6147 20.6882 23.7404 20.6499 23.869 20.65C24.0365 20.6473 24.1983 20.7112 24.3189 20.8275C24.4394 20.9439 24.5088 21.1033 24.512 21.2707H24.513ZM42 20.0303C41.9742 18.6885 41.4166 17.4119 40.4496 16.4809C39.4826 15.5499 38.1854 15.0408 36.843 15.0655C35.5011 15.0411 34.2044 15.5502 33.2378 16.481C32.2712 17.4117 31.7138 18.688 31.688 20.0293C31.7135 21.3706 32.2708 22.6469 33.2375 23.5775C34.2042 24.5082 35.5011 25.017 36.843 24.9921C38.1849 25.017 39.4819 24.5084 40.4488 23.578C41.4158 22.6476 41.9737 21.3716 42 20.0303V20.0303ZM38.778 20.0303C38.7685 20.5338 38.5594 21.013 38.1965 21.3624C37.8336 21.7118 37.3468 21.9028 36.843 21.8934C36.3394 21.9025 35.8528 21.7114 35.4901 21.362C35.1275 21.0126 34.9185 20.5336 34.909 20.0303C34.919 19.5273 35.1282 19.0487 35.4908 18.6998C35.8534 18.3509 36.3397 18.16 36.843 18.1691C37.3464 18.1597 37.833 18.3505 38.1958 18.6994C38.5586 19.0484 38.768 19.5271 38.778 20.0303V20.0303ZM30.4 21.8934V20.0303H28.863C28.9697 20.4352 29.0241 20.852 29.025 21.2707C29.0256 21.4783 29.0122 21.6857 28.985 21.8914L30.4 21.8934ZM37.489 20.0303C37.4938 19.9019 37.4601 19.775 37.3922 19.6659C37.3244 19.5568 37.2254 19.4704 37.1081 19.4179C36.9908 19.3654 36.8605 19.3491 36.7339 19.3711C36.6073 19.3931 36.4901 19.4525 36.3974 19.5415C36.3048 19.6305 36.2409 19.7452 36.2138 19.8708C36.1868 19.9964 36.198 20.1272 36.2459 20.2464C36.2937 20.3657 36.3762 20.4679 36.4826 20.54C36.589 20.612 36.7145 20.6507 36.843 20.651C37.0109 20.6539 37.1732 20.5903 37.2942 20.474C37.4153 20.3576 37.4853 20.1981 37.489 20.0303V20.0303ZM30.529 18.7898C30.8563 17.3662 31.6612 16.0975 32.8099 15.1944C33.9585 14.2914 35.3817 13.8085 36.843 13.826C38.3304 13.8241 39.775 14.3238 40.943 15.2444L41.764 14.2868C40.4674 13.2689 38.8869 12.678 37.2403 12.5954C35.5937 12.5129 33.962 12.9428 32.57 13.826H23.864C23.194 13.8153 22.5471 14.0701 22.0645 14.5348C21.582 14.9995 21.3032 15.6363 21.289 16.3059V16.9736C22.077 16.5343 22.9647 16.3044 23.867 16.3059C24.7621 16.3006 25.6434 16.5264 26.4256 16.9614C27.2078 17.3964 27.8645 18.0258 28.332 18.7888L30.529 18.7898ZM26.446 12.5845V10.7234C26.436 10.2203 26.2268 9.74184 25.8642 9.3929C25.5016 9.04395 25.0153 8.85308 24.512 8.86218V10.0986C24.6798 10.0957 24.842 10.1594 24.9629 10.2757C25.0838 10.3921 25.1536 10.5516 25.157 10.7194V12.5845H26.446ZM32.2 12.5845C34.1898 11.44 36.5323 11.0705 38.778 11.547V8.24045H40.066V7H29.752V8.24045H30.874L29.69 12.5845H32.2Z"
                  fill="#8C929B"
                />
              </svg>
            )}
          </button>
          <button
            className={`box ${selectedBox === 3 ? "selected" : ""}`}
            onClick={() => handleBoxClick(3)}
          >
            {selectedBox === 3 ? (
              <svg
                width="100%"
                height="33"
                viewBox="0 0 63 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.448 20.665C26.446 19.8924 26.178 19.1441 25.689 18.546L26.56 17.475C27.0961 18.0582 27.4729 18.7698 27.654 19.541C27.7356 19.9098 27.7772 20.2863 27.778 20.664C27.7753 20.8376 27.8416 21.0052 27.9623 21.1301C28.0831 21.2549 28.2484 21.3268 28.422 21.33H34.502C34.7535 22.0982 35.239 22.7686 35.8904 23.2471C36.5419 23.7257 37.3267 23.9886 38.135 23.999C39.1776 23.9795 40.1701 23.5476 40.8949 22.7979C41.6197 22.0481 42.0178 21.0417 42.002 19.999C42.0181 18.9562 41.62 17.9496 40.8952 17.1998C40.1703 16.45 39.1777 16.0182 38.135 15.999C37.0919 16.0177 36.0988 16.4493 35.3735 17.1991C34.6482 17.949 34.25 18.9559 34.266 19.999H32.935C32.936 18.948 33.2417 17.9198 33.815 17.039C33.5376 16.4341 33.1165 15.9062 32.5884 15.5013C32.0603 15.0964 31.4412 14.8268 30.785 14.716C30.6959 14.7011 30.6108 14.6677 30.5354 14.6179C30.46 14.5681 30.3958 14.5031 30.347 14.427L28.878 12.151C28.557 11.6469 28.102 11.2422 27.564 10.982C27.564 10.987 27.555 10.989 27.549 10.995C27.2177 10.8274 26.859 10.7207 26.49 10.68V9.39098C26.6749 9.35961 26.8616 9.34024 27.049 9.33298H27.778C27.9503 9.3263 28.1133 9.25316 28.2329 9.1289C28.3524 9.00464 28.4192 8.83891 28.4192 8.66648C28.4192 8.49405 28.3524 8.32832 28.2329 8.20406C28.1133 8.0798 27.9503 8.00665 27.778 7.99998L27.049 7.99998C25.5104 8.04081 24.0494 8.6842 22.9805 9.79162C21.9116 10.899 21.3204 12.3819 21.334 13.921C21.3178 14.4862 21.526 15.0348 21.913 15.447C22.0827 15.6225 22.2862 15.7618 22.5111 15.8567C22.7361 15.9516 22.9779 16 23.222 15.999C23.5879 15.9995 23.9527 16.0397 24.31 16.119C24.7507 16.2245 25.1714 16.4004 25.556 16.64L24.685 17.711C24.2373 17.4665 23.7361 17.3363 23.226 17.332C22.3569 17.3478 21.5295 17.7075 20.9252 18.3322C20.3209 18.957 19.9889 19.7959 20.002 20.665C19.9868 21.0978 20.0588 21.5292 20.2139 21.9336C20.369 22.3379 20.604 22.7069 20.9048 23.0184C21.2056 23.33 21.566 23.5778 21.9647 23.7471C22.3633 23.9163 22.7919 24.0035 23.225 24.0035C23.6581 24.0035 24.0867 23.9163 24.4853 23.7471C24.884 23.5778 25.2444 23.33 25.5452 23.0184C25.846 22.7069 26.081 22.3379 26.2361 21.9336C26.3912 21.5292 26.4633 21.0978 26.448 20.665V20.665ZM25.158 20.665C25.1663 20.9241 25.1225 21.1822 25.0291 21.424C24.9357 21.6658 24.7947 21.8863 24.6144 22.0725C24.434 22.2588 24.2181 22.4068 23.9795 22.5079C23.7408 22.6091 23.4842 22.6612 23.225 22.6612C22.9658 22.6612 22.7092 22.6091 22.4706 22.5079C22.2319 22.4068 22.016 22.2588 21.8356 22.0725C21.6553 21.8863 21.5143 21.6658 21.4209 21.424C21.3275 21.1822 21.2837 20.9241 21.292 20.665C21.2837 20.1434 21.4827 19.6399 21.8453 19.2649C22.2079 18.89 22.7045 18.6742 23.226 18.665C23.4412 18.6676 23.6543 18.7072 23.856 18.782L22.722 20.248C22.6146 20.3871 22.5651 20.5623 22.5837 20.7371C22.6023 20.9118 22.6877 21.0726 22.822 21.186C22.8873 21.2408 22.9631 21.2818 23.0447 21.3066C23.1263 21.3313 23.2121 21.3393 23.2969 21.3299C23.3817 21.3206 23.4637 21.2941 23.5379 21.2522C23.6122 21.2103 23.6772 21.1537 23.729 21.086L24.862 19.615C25.0545 19.9314 25.1565 20.2946 25.157 20.665H25.158ZM40.712 19.999C40.7227 20.694 40.4575 21.365 39.9745 21.8649C39.4915 22.3648 38.83 22.6528 38.135 22.666C37.6794 22.6618 37.2331 22.5359 36.8425 22.3013C36.4518 22.0668 36.1309 21.7321 35.913 21.332H37.489C38.0105 21.3225 38.5069 21.1067 38.8694 20.7317C39.232 20.3568 39.431 19.8535 39.423 19.332C39.4264 19.2452 39.4123 19.1586 39.3814 19.0775C39.3506 18.9963 39.3037 18.9222 39.2435 18.8596C39.1833 18.797 39.1111 18.7472 39.0312 18.7131C38.9513 18.6791 38.8653 18.6616 38.7785 18.6616C38.6917 18.6616 38.6057 18.6791 38.5258 18.7131C38.4459 18.7472 38.3737 18.797 38.3135 18.8596C38.2533 18.9222 38.2064 18.9963 38.1756 19.0775C38.1447 19.1586 38.1306 19.2452 38.134 19.332C38.1367 19.5059 38.0703 19.6738 37.9494 19.7988C37.8285 19.9238 37.6629 19.9958 37.489 19.999H35.556C35.5453 19.3036 35.8108 18.6323 36.2942 18.1324C36.7777 17.6324 37.4397 17.3446 38.135 17.332C38.83 17.3451 39.4915 17.6332 39.9745 18.1331C40.4575 18.633 40.7227 19.3039 40.712 19.999ZM38.779 14.664C39.6476 14.6482 40.4746 14.2887 41.0787 13.6644C41.6828 13.04 42.0148 12.2017 42.002 11.333C42.0035 11.2466 41.9879 11.1608 41.9561 11.0805C41.9244 11.0001 41.8771 10.9269 41.817 10.8648C41.7569 10.8028 41.6852 10.7532 41.6059 10.7189C41.5266 10.6846 41.4414 10.6663 41.355 10.665H38.527L34.391 13.207C33.852 13.5326 33.2826 13.8052 32.691 14.021C33.5193 14.4778 34.2139 15.1431 34.706 15.951C34.706 15.962 34.706 15.973 34.716 15.984C35.2653 15.4951 35.9099 15.1254 36.6092 14.8982C37.3085 14.671 38.0473 14.5913 38.779 14.664V14.664ZM33.73 12.064L34.759 11.423C34.3582 10.7875 33.804 10.263 33.1475 9.89767C32.4911 9.5323 31.7533 9.33778 31.002 9.33198C30.1495 9.33894 29.3178 9.59589 28.61 10.071C29.1451 10.4193 29.602 10.8749 29.952 11.409L31.052 13.124C31.9987 12.9258 32.9045 12.567 33.73 12.063V12.064Z"
                  fill="#FD4100"
                />
              </svg>
            ) : (
              <svg
                width="100%"
                height="33"
                viewBox="0 0 63 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.448 20.665C26.446 19.8924 26.178 19.1441 25.689 18.546L26.56 17.475C27.0961 18.0582 27.4729 18.7698 27.654 19.541C27.7356 19.9098 27.7772 20.2863 27.778 20.664C27.7753 20.8376 27.8416 21.0052 27.9623 21.1301C28.0831 21.2549 28.2484 21.3268 28.422 21.33H34.502C34.7535 22.0982 35.239 22.7686 35.8904 23.2471C36.5419 23.7257 37.3267 23.9886 38.135 23.999C39.1776 23.9795 40.1701 23.5476 40.8949 22.7979C41.6197 22.0481 42.0178 21.0417 42.002 19.999C42.0181 18.9562 41.62 17.9496 40.8952 17.1998C40.1703 16.45 39.1777 16.0182 38.135 15.999C37.0919 16.0177 36.0988 16.4493 35.3735 17.1991C34.6482 17.949 34.25 18.9559 34.266 19.999H32.935C32.936 18.948 33.2417 17.9198 33.815 17.039C33.5376 16.4341 33.1165 15.9062 32.5884 15.5013C32.0603 15.0964 31.4412 14.8268 30.785 14.716C30.6959 14.7011 30.6108 14.6677 30.5354 14.6179C30.46 14.5681 30.3958 14.5031 30.347 14.427L28.878 12.151C28.557 11.6469 28.102 11.2422 27.564 10.982C27.564 10.987 27.555 10.989 27.549 10.995C27.2177 10.8274 26.859 10.7207 26.49 10.68V9.39098C26.6749 9.35961 26.8616 9.34024 27.049 9.33298H27.778C27.9503 9.3263 28.1133 9.25316 28.2329 9.1289C28.3524 9.00464 28.4192 8.83891 28.4192 8.66648C28.4192 8.49405 28.3524 8.32832 28.2329 8.20406C28.1133 8.0798 27.9503 8.00665 27.778 7.99998L27.049 7.99998C25.5104 8.04081 24.0494 8.6842 22.9805 9.79162C21.9116 10.899 21.3204 12.3819 21.334 13.921C21.3178 14.4862 21.526 15.0348 21.913 15.447C22.0827 15.6225 22.2862 15.7618 22.5111 15.8567C22.7361 15.9516 22.9779 16 23.222 15.999C23.5879 15.9995 23.9527 16.0397 24.31 16.119C24.7507 16.2245 25.1714 16.4004 25.556 16.64L24.685 17.711C24.2373 17.4665 23.7361 17.3363 23.226 17.332C22.3569 17.3478 21.5295 17.7075 20.9252 18.3322C20.3209 18.957 19.9889 19.7959 20.002 20.665C19.9868 21.0978 20.0588 21.5292 20.2139 21.9336C20.369 22.3379 20.604 22.7069 20.9048 23.0184C21.2056 23.33 21.566 23.5778 21.9647 23.7471C22.3633 23.9163 22.7919 24.0035 23.225 24.0035C23.6581 24.0035 24.0867 23.9163 24.4853 23.7471C24.884 23.5778 25.2444 23.33 25.5452 23.0184C25.846 22.7069 26.081 22.3379 26.2361 21.9336C26.3912 21.5292 26.4633 21.0978 26.448 20.665V20.665ZM25.158 20.665C25.1663 20.9241 25.1225 21.1822 25.0291 21.424C24.9357 21.6658 24.7947 21.8863 24.6144 22.0725C24.434 22.2588 24.2181 22.4068 23.9795 22.5079C23.7408 22.6091 23.4842 22.6612 23.225 22.6612C22.9658 22.6612 22.7092 22.6091 22.4706 22.5079C22.2319 22.4068 22.016 22.2588 21.8356 22.0725C21.6553 21.8863 21.5143 21.6658 21.4209 21.424C21.3275 21.1822 21.2837 20.9241 21.292 20.665C21.2837 20.1434 21.4827 19.6399 21.8453 19.2649C22.2079 18.89 22.7045 18.6742 23.226 18.665C23.4412 18.6676 23.6543 18.7072 23.856 18.782L22.722 20.248C22.6146 20.3871 22.5651 20.5623 22.5837 20.7371C22.6023 20.9118 22.6877 21.0726 22.822 21.186C22.8873 21.2408 22.9631 21.2818 23.0447 21.3066C23.1263 21.3313 23.2121 21.3393 23.2969 21.3299C23.3817 21.3206 23.4637 21.2941 23.5379 21.2522C23.6122 21.2103 23.6772 21.1537 23.729 21.086L24.862 19.615C25.0545 19.9314 25.1565 20.2946 25.157 20.665H25.158ZM40.712 19.999C40.7227 20.694 40.4575 21.365 39.9745 21.8649C39.4915 22.3648 38.83 22.6528 38.135 22.666C37.6794 22.6618 37.2331 22.5359 36.8425 22.3013C36.4518 22.0668 36.1309 21.7321 35.913 21.332H37.489C38.0105 21.3225 38.5069 21.1067 38.8694 20.7317C39.232 20.3568 39.431 19.8535 39.423 19.332C39.4264 19.2452 39.4123 19.1586 39.3814 19.0775C39.3506 18.9963 39.3037 18.9222 39.2435 18.8596C39.1833 18.797 39.1111 18.7472 39.0312 18.7131C38.9513 18.6791 38.8653 18.6616 38.7785 18.6616C38.6917 18.6616 38.6057 18.6791 38.5258 18.7131C38.4459 18.7472 38.3737 18.797 38.3135 18.8596C38.2533 18.9222 38.2064 18.9963 38.1756 19.0775C38.1447 19.1586 38.1306 19.2452 38.134 19.332C38.1367 19.5059 38.0703 19.6738 37.9494 19.7988C37.8285 19.9238 37.6629 19.9958 37.489 19.999H35.556C35.5453 19.3036 35.8108 18.6323 36.2942 18.1324C36.7777 17.6324 37.4397 17.3446 38.135 17.332C38.83 17.3451 39.4915 17.6332 39.9745 18.1331C40.4575 18.633 40.7227 19.3039 40.712 19.999ZM38.779 14.664C39.6476 14.6482 40.4746 14.2887 41.0787 13.6644C41.6828 13.04 42.0148 12.2017 42.002 11.333C42.0035 11.2466 41.9879 11.1608 41.9561 11.0805C41.9244 11.0001 41.8771 10.9269 41.817 10.8648C41.7569 10.8028 41.6852 10.7532 41.6059 10.7189C41.5266 10.6846 41.4414 10.6663 41.355 10.665H38.527L34.391 13.207C33.852 13.5326 33.2826 13.8052 32.691 14.021C33.5193 14.4778 34.2139 15.1431 34.706 15.951C34.706 15.962 34.706 15.973 34.716 15.984C35.2653 15.4951 35.9099 15.1254 36.6092 14.8982C37.3085 14.671 38.0473 14.5913 38.779 14.664V14.664ZM33.73 12.064L34.759 11.423C34.3582 10.7875 33.804 10.263 33.1475 9.89767C32.4911 9.5323 31.7533 9.33778 31.002 9.33198C30.1495 9.33894 29.3178 9.59589 28.61 10.071C29.1451 10.4193 29.602 10.8749 29.952 11.409L31.052 13.124C31.9987 12.9258 32.9045 12.567 33.73 12.063V12.064Z"
                  fill="#8C929B"
                />
              </svg>
            )}
          </button>
        </div>
        <svg>
          <rect width="250" height="1" fill="#E9E9F0" />
        </svg>

        <div id="garigebis_tipi_line">
          <label id="lable">გარიგების ტიპი</label>
          <DropdownCheckbox
            placeholder="გარიგების ტიპი"
            options={garigebis_tipi}
            selectedOptions={garigebisTipi}
            setSelectedOptions={setGarigebisTipi}
          />
        </div>

        <div id="garigebis_tipi">
          <label id="lable">მწარმოებელი</label>
          <DropdownCheckbox
            placeholder="მწარმოებელი"
            options={manNames}
            selectedOptions={manName}
            setSelectedOptions={setManName}
            onSelect={handleManNameSelection}
          />
        </div>

        <div id="garigebis_tipi">
          <label id="lable">მოდელი</label>
          <DropdownCheckboxGroup
            placeholder="მოდელი"
            data={model_names}
            selectedOptions={model}
            setSelectedOptions={setModel}
          />
        </div>

        <div id="garigebis_tipi">
          <label id="lable">კატეგორია</label>
          <DropdownCheckbox
            placeholder="კატეგორია"
            options={seoTitles}
            selectedOptions={cat}
            setSelectedOptions={setCat}
          />
        </div>

        <svg
          width="250"
          height="1"
          viewBox="0 0 250 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="250" height="1" fill="#E9E9F0" />
        </svg>

        <div className="currency">
          <label className="lablefasi">ფასი</label>
          <div className="currency-choice">
            <div
              className={`currency-option ${
                currency === "GEL" ? "selected" : ""
              }`}
              onClick={() => selectCurrency("GEL")}
            >
              <svg
                width="60%"
                height="60%"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.98466 2.55309C4.83129 2.55309 4.64213 2.57119 4.41718 2.60741V6.15185H3.52761V2.82469C2.91411 3.10535 2.47444 3.52634 2.20859 4.08766C1.95297 4.63992 1.82515 5.32798 1.82515 6.15185C1.82515 6.82181 1.96319 7.42387 2.23926 7.95802C2.51534 8.48313 2.91411 8.89959 3.43558 9.20741C3.95705 9.51523 4.58078 9.66914 5.30675 9.66914H8.92638V11H0.644172V9.72346H2.14724V9.66914C1.66667 9.43374 1.26278 9.10782 0.935583 8.69136C0.618609 8.2749 0.383436 7.82222 0.230061 7.33333C0.0766871 6.83539 0 6.35103 0 5.88025C0 5.20123 0.143149 4.56296 0.429448 3.96543C0.715746 3.35885 1.12474 2.83827 1.65644 2.4037C2.19836 1.96914 2.82209 1.66584 3.52761 1.49383V0H4.41718V1.33086C4.64213 1.31276 4.83129 1.3037 4.98466 1.3037C5.10736 1.3037 5.30164 1.31276 5.56749 1.33086V0H6.45706V1.49383C7.18303 1.6749 7.81186 1.9963 8.34356 2.45803C8.88548 2.9107 9.29448 3.45844 9.57055 4.10123C9.85685 4.74403 10 5.42757 10 6.15185H8.17485C8.17485 5.32798 8.04192 4.63992 7.77607 4.08766C7.51023 3.52634 7.07055 3.10535 6.45706 2.82469V6.15185H5.56749V2.60741C5.38344 2.57119 5.18916 2.55309 4.98466 2.55309Z"
                  fill="white"
                />
              </svg>
            </div>
            <div
              className={`currency-option ${
                currency === "USD" ? "selected" : ""
              }`}
              onClick={() => selectCurrency("USD")}
            >
              <svg
                width="60%"
                height="60%"
                viewBox="0 0 8 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.41916 12V10.6784C5.23598 10.6258 5.94213 10.446 6.53762 10.1392C7.51254 9.63945 8 8.83726 8 7.7326C8 6.89534 7.64429 6.24658 6.93286 5.7863C6.50074 5.51014 5.65756 5.19233 4.40335 4.83288V2.32767C4.93033 2.35836 5.29395 2.52932 5.4942 2.84055C5.61014 3.02027 5.68918 3.30521 5.73134 3.69534H7.81029C7.77867 2.64329 7.31756 1.88274 6.42696 1.4137C5.93686 1.12 5.26233 0.944658 4.40335 0.887671V0H3.6524V0.874521C3.11487 0.909589 2.70646 0.964384 2.42716 1.0389C1.96869 1.15726 1.55237 1.37205 1.17821 1.68329C0.888374 1.92438 0.663089 2.21151 0.50236 2.54466C0.34163 2.87781 0.261265 3.24822 0.261265 3.65589C0.261265 4.27397 0.468106 4.80219 0.881787 5.24055C1.29547 5.6789 2.00558 6.02082 3.01211 6.2663L3.6524 6.42411V9.23178C3.05164 9.14411 2.64849 8.95342 2.44297 8.65973C2.31123 8.47123 2.20846 8.10082 2.13469 7.54849H0.000408866C-0.0154006 8.76274 0.427265 9.62192 1.3284 10.126C1.83958 10.4066 2.61424 10.5951 3.6524 10.6915V12H4.41916ZM3.65239 4.64877C3.2677 4.54794 2.98313 4.43835 2.79868 4.32C2.46668 4.1052 2.30069 3.8137 2.30069 3.44548C2.30069 3.10794 2.41135 2.84164 2.63268 2.64657C2.85402 2.45151 3.19392 2.34959 3.65239 2.34082V4.64877ZM4.40335 6.6411V9.21206C4.81966 9.16822 5.12268 9.08932 5.31239 8.97534C5.64439 8.7737 5.81039 8.42521 5.81039 7.92986C5.81039 7.55288 5.65493 7.2548 5.34401 7.03562C5.15957 6.9085 4.84601 6.77699 4.40335 6.6411Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="pricerange">
            <input
              className="pricebox"
              type="number"
              onChange={(e) => setLowerBoundPrice(Number(e.target.value))}
              placeholder="დან"
            />

            <input
              className="pricebox"
              type="number"
              placeholder="მდე"
              onChange={(e) => setUpperBoundPrice(Number(e.target.value))}
            />
          </div>
        </div>
        <button className="filter_search" onClick={handleFilter}>
          ძებნა
        </button>
      </div>
    </div>
  );
}

export default Filter;
