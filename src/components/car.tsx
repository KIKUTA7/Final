import React, { useEffect, useState } from "react";
import Price from "./price";
import Icons from "./icons";
import Info from "./info";
import moment from "moment";
import data1 from "./data1.json";

import axios from "axios";

interface CarProps {
  id: number;
  selectCurrency: Function;
  currency: string;
  all_cars: any[];
}

function Car(props: CarProps) {
  function calculateTimeDifference(startDate: string, endDate: string): string {
    const startMoment = moment(startDate);

    const endMoment = moment(endDate);
    const diff = endMoment.diff(startMoment);
    const duration = moment.duration(diff);

    if (duration.days() > 0) {
      return `${duration.days()} დღის${duration.days() > 1 ? "" : ""} წინ`;
    }

    if (duration.hours() > 0) {
      return `${duration.hours()} საათის${duration.hours() > 1 ? "" : ""} წინ`;
    }

    if (duration.minutes() > 0) {
      return `${duration.minutes()} წუთის${
        duration.minutes() > 1 ? "" : ""
      } წინ`;
    }

    return "ახლა";
  }

  const [model, setModel] = useState<string>();

  const [isValidImageLink, setIsValidImageLink] = useState<boolean>(false);

  const [car, setCar] = useState<any[]>([]);
  let [manId, setManId] = useState<any>([]);

  useEffect(() => {
    const foundCar = props.all_cars.filter(
      (item: any) => props.id === item.car_id
    );
    const manId = foundCar[0].man_id;
    setCar(foundCar);
    setManId(manId);
  }, [props.all_cars, props]);

  useEffect(() => {
    fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${car[0]?.man_id}`)
      .then((response) => response.json())
      .then((data) => {
        setModel(
          data.data.find(
            (temp: any) =>
              temp.model_id ===
              props.all_cars.filter((x) => x.car_id === props.id)[0]["model_id"]
          ).model_name
        );
      })
      .catch((error) => {
        console.error(error);
      });
  });

  if (!car || car.length === 0) return null;

  var carBrand = "";
  carBrand =
    carBrand +
    data1.filter((vehicle) => parseInt(vehicle.man_id) === car[0].man_id)[0]
      ?.man_name;
  carBrand = carBrand + "   " + model;

  if (carBrand.length > 22) carBrand = carBrand.substring(0, 22) + "...";

  const imageLink: string = `https://static.my.ge/myauto/photos/${car[0].photo}/thumbs/${car[0].car_id}_1.jpg?v=${car[0].photo_ver}`;

  const checkImageLinkValidity = async () => {
    try {
      const response = await axios.head(imageLink);
      setIsValidImageLink(response.status === 200);
    } catch (error) {
      setIsValidImageLink(false);
    }
  };

  checkImageLinkValidity();

  return (
    <div className="card">
      <Price
        selectCurrency={props.selectCurrency}
        price={car[0].price}
        price_usd={car[0].price_usd}
        currency={props.currency}
      />
      <Icons />
      <Info
        vip={car[0].prom_color}
        gear={car[0].gear_type_id}
        engine_volume={car[0].engine_volume}
        fuel_type={car[0].fuel_type_id}
        run={car[0].car_run_km}
        steering={car[0].drive_type_id}
        carBrand={carBrand}
        carYear={car[0].prod_year}
        country={car[0].location_id}
        views={car[0].views}
        days={calculateTimeDifference(
          car[0].order_date,
          new Date().toDateString()
        )}
        passed={car[0].customs_passed}
      />
      {isValidImageLink ? (
        <img className="img" src={imageLink} />
      ) : (
        <div className="img grayRectangle">
          <div className="carWhiteSVG">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              className="WhiteSVG"
              viewBox="0 0 100 100"
            >
              <path
                fill="#fff"
                d="M91.667,43.583v31.25A4.167,4.167,0,0,1,87.5,79H83.333a4.167,4.167,0,0,1-4.167-4.167V70.667H20.833v4.167A4.167,4.167,0,0,1,16.667,79H12.5a4.167,4.167,0,0,1-4.167-4.167V43.583L3.154,42.292A4.167,4.167,0,0,1,0,38.25v-3a2.083,2.083,0,0,1,2.083-2.083H9.9L18.8,9.408A8.333,8.333,0,0,1,26.608,4H73.392a8.334,8.334,0,0,1,7.8,5.409L90.1,33.167h7.812A2.083,2.083,0,0,1,100,35.25v3a4.167,4.167,0,0,1-3.154,4.042Zm-75,6.25v8.333a4.167,4.167,0,0,0,4.167,4.167H34.354a2.083,2.083,0,0,0,1.833-3.067Q31.156,49.829,16.667,49.833Zm66.667,0q-14.481,0-19.525,9.433a2.083,2.083,0,0,0,1.838,3.067H79.167a4.167,4.167,0,0,0,4.167-4.167ZM25,12.333,18.5,31.85a4.167,4.167,0,0,0,3.95,5.483H77.554A4.167,4.167,0,0,0,81.5,31.85L75,12.333Z"
                transform="translate(0 12.667)"
              ></path>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default Car;
