import React, { useEffect, useState } from "react";
import Price from "./price";
import Icons from "./icons";
import Info from "./info";
import moment from "moment";
import data1 from "./data1.json";

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
      <img className="img" src={imageLink} />
    </div>
  );
}

export default Car;
