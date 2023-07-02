import React from "react";

interface InfoProps {
  gear: number;
  engine_volume: number;
  fuel_type: number;
  run: number;
  steering: number;
  carBrand: string;
  carYear: number;
  country: number;
  views: number;
  days: string;
  vip: number;
  passed: boolean;
}

function Info(props: InfoProps) {
  const svgStyle = {
    clipPath: "circle(50%)",
  };

  const location = [
    "გზაში საქ.-სკენ",
    "თბილისი",
    "ქუთაისი",
    "ბათუმი",
    "ფოთი",
    "რუსთავი",
    "რუსთავის ავტობაზრობა",
    "კავკასიის ავტომარკეტი",
    "ჩხოროწყუ",
    "ახმეტა",
    "ზესტაფონი",
    "ბორჯომი",
    "კასპი",
    "საგარეჯო",
    "ახალციხე",
    "სოხუმი",
    "ქობულეთი",
    "გურჯაანი",
    "მარტვილი",
    "ჭიათურა",
    "დუშეთი",
    "ლაგოდეხი",
    "თელავი",
    "მცხეთა",
    "ცხინვალი",
    "ახალქალაქი",
    "გორი",
    "ხაშური",
    "ამბროლაური",
    "ოზურგეთი",
    "ზუგდიდი",
    "სენაკი",
    "სიღნაღი",
    "ქარელი",
    "მარნეული",
    "გარდაბანი",
    "სამტრედია",
    "მესტია",
    "საჩხერე",
    "ხობი",
    "თიანეთი",
    'ფოთის "გეზ"-ი',
    'ბათუმის "გეზ"-ი',
    "ყვარელი",
    "ტყიბული",
    "დედოფლისწყარო",
    "ონი",
    "ბოლნისი",
    "წყალტუბო",
    "თეთრიწყარო",
    "თიანეთი",
    "ხარაგაული",
    "წალკა",
    "წალენჯიხა",
    "წეროვანი",
    "ლანჩხუთი",
    "სართიჭალა",
    "ხონი",
    "ნინოწმინდა",
    "ასპინძა",
    "აბაშა",
    "ცაგერი",
    "აშშ",
    "გერმანია",
    "იაპონია",
    "ევროპა",
    "საფრანგეთი",
    "ესპანეთი",
    "სამხ. კორეა",
    "რუსეთი",
    "ირლანდია",
    "ჰოლანდია",
    "იტალია",
    "დუბაი",
    "ინგლისი",
    "სხვა",
    "უკრაინა",
    "ჩინეთი",
    "კანადა",
    "თურქეთი",
    "პოლონეთი",
  ];

  var transmission = ["მექანიკა", "ავტომატიკა", "ტიპტრონიკი", "ვარიატორი"];

  var fuels = [
    "ბენზინი",
    "დიზელი",
    "ელექტრო",
    "ჰიბრიდი",
    "დატენვადი ჰიბრიდი",
    "თხევადი გაზი",
    "ბუნებრივი გაზი",
    "წყალბადი",
  ];

  return (
    <div className="info">
      <div className="carName">
        <div className="carBrand">{props.carBrand}</div>
        <div className="carYear">{props.carYear} წ</div>
      </div>
      <div className="gearType">
        <svg
          className="gear"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2.6"
            y="7.6"
            width="10.8"
            height="7.8"
            rx="1.2"
            stroke="#8C929B"
            stroke-width="1.2"
          />
          <path
            d="M8 5V10"
            stroke="#8C929B"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 12V13.5"
            stroke="#8C929B"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle cx="8" cy="2.5" r="1.8" stroke="#8C929B" stroke-width="1.4" />
          <path
            d="M5 10V13"
            stroke="#8C929B"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 10V13"
            stroke="#8C929B"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div className="gearTypeText">{transmission[props.gear - 1]}</div>
      </div>

      <div className="motor">
        <svg
          className="motorIcon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.52488 2C5.13653 2 4.82171 2.35066 4.82171 2.78322C4.82171 3.21578 5.13653 3.56643 5.52488 3.56643H7.33347V5.27273H5.68644C5.51194 5.27273 5.3446 5.3412 5.22121 5.46308L4.00406 6.66538H3.33668C2.97331 6.66538 2.67875 6.95635 2.67875 7.31528V8.54545H1.50009V7.13369C1.50009 6.7084 1.16428 6.36364 0.750043 6.36364C0.335806 6.36364 0 6.7084 0 7.13369V12.084C0 12.5093 0.335806 12.8541 0.750043 12.8541C1.16428 12.8541 1.50009 12.5093 1.50009 12.084V10.0856H2.67875V11.9574C2.67875 12.3164 2.97331 12.6074 3.33668 12.6074H4.00406L5.22121 13.8096C5.3446 13.9315 5.51194 14 5.68644 14H10.8559C10.9983 14 11.1368 13.9544 11.2507 13.87L13.1305 12.4774C13.2961 12.3546 13.3936 12.162 13.3936 11.9574V10.0856H14.4999V12.084C14.4999 12.5093 14.8357 12.8541 15.25 12.8541C15.6642 12.8541 16 12.5093 16 12.084V7.13369C16 6.7084 15.6642 6.36364 15.25 6.36364C14.8357 6.36364 14.4999 6.7084 14.4999 7.13369V8.54545H13.3936V7.31528C13.3936 7.14292 13.3243 6.97761 13.2009 6.85573L11.7911 5.46308C11.6677 5.3412 11.5004 5.27273 11.3259 5.27273H8.7398V3.56643H10.5475C10.9358 3.56643 11.2507 3.21578 11.2507 2.78322C11.2507 2.35066 10.9358 2 10.5475 2H8.03664H5.52488ZM4.74181 7.77483L5.95896 6.57253H11.0533L12.0778 7.58448V11.6325L10.6366 12.7002H5.95896L4.74181 11.4979C4.61842 11.376 4.45108 11.3075 4.27658 11.3075H3.99461V7.96518H4.27658C4.45108 7.96518 4.61842 7.89671 4.74181 7.77483Z"
            fill="#9CA2AA"
          />
        </svg>
        <div className="motorText">
          {props.engine_volume % 1000 === 0
            ? `${props.engine_volume / 1000}.0`
            : `${props.engine_volume / 1000}`}{" "}
          დატ. {fuels[props.fuel_type - 1]}
        </div>
      </div>

      <div className="run">
        <svg
          className="runIcon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="6.3" stroke="#9CA2AA" stroke-width="1.4" />
          <circle cx="8" cy="8" r="1.3" stroke="#9CA2AA" stroke-width="1.4" />
          <path
            d="M12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8"
            stroke="#9CA2AA"
            stroke-width="1.4"
            stroke-linecap="round"
          />
          <path
            d="M9 7L10.5 5.5"
            stroke="#9CA2AA"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <div className="runKm">{props.run} კმ</div>
      </div>

      <div className="steeringWheel">
        <svg
          className="steeringIcon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="6.3" stroke="#9CA2AA" stroke-width="1.4" />
          <circle cx="8" cy="8" r="1.3" stroke="#9CA2AA" stroke-width="1.4" />
          <path
            d="M9.5 8L13.5 6.5"
            stroke="#9CA2AA"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.21387 7.99979L1.99977 7.29883"
            stroke="#9CA2AA"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8 9.5V14"
            stroke="#9CA2AA"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div className="steering">
          {props.steering === 1
            ? "მარცხენა"
            : props.steering === 2
            ? "მარჯვენა"
            : "ადაპტირებული"}
        </div>
        {props.passed ? (
          <div className="passedRed">განუბაჟებელი</div>
        ) : (
          <div className="passedGreen">განბაჟებული</div>
        )}
        <div className="country">
          <div className="flag">
            {props.country < 63 ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.4982 8.00007C15.4982 12.1422 12.1407 15.4999 7.99912 15.4999C3.85751 15.4999 0.5 12.1422 0.5 8.00007C0.5 3.85799 3.85751 0.500244 7.99912 0.500244C12.1407 0.500244 15.4982 3.85799 15.4982 8.00007Z"
                  fill="white"
                  stroke="#E9E9F0"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.9304 6.95557H9.04433V0.0677221C8.35172 -0.022574 7.65032 -0.022574 6.95771 0.0677221V6.95557H0.0704627C-0.0198255 7.64825 -0.0198255 8.34971 0.0704627 9.04238H6.95771V15.9302C7.65032 16.0205 8.35172 16.0205 9.04433 15.9302V9.04238H15.9316C16.0219 8.34971 16.0219 7.64825 15.9316 6.95557H15.9304ZM4.87147 3.82564V2.78223H3.82816V3.82564H2.78484V4.86904H3.82816V5.91244H4.87147V4.86904H5.91478V3.82564H4.87147ZM12.1736 2.78223V3.82564H13.2214V4.86904H12.1781V5.91244H11.1348V4.86904H10.0915V3.82564H11.1348V2.78223H12.1736ZM4.87147 11.1324V10.089H3.82816V11.1324H2.78484V12.1758H3.82816V13.2192H4.87147V12.1758H5.91478V11.1324H4.87147ZM12.1736 10.089V11.1324H13.2214V12.1758H12.1781V13.2192H11.1348V12.1758H10.0915V11.1324H11.1348V10.089H12.1736Z"
                  fill="#FF3B30"
                />
              </svg>
            ) : props.country === 63 ? (
              <svg
                className="USA"
                style={svgStyle}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32.5332 -0.71701H-7.99661V0.924323H32.5332V-0.71701Z"
                  fill="#BD3D44"
                />
                <path
                  d="M32.5332 2.56433H-7.99661V4.20566H32.5332V2.56433Z"
                  fill="#BD3D44"
                />
                <path
                  d="M32.5332 5.84702H-7.99661V7.48835H32.5332V5.84702Z"
                  fill="#BD3D44"
                />
                <path
                  d="M32.5332 9.12833H-7.99661V10.7697H32.5332V9.12833Z"
                  fill="#BD3D44"
                />
                <path
                  d="M32.5332 12.411H-7.99661V14.0523H32.5332V12.411Z"
                  fill="#BD3D44"
                />
                <path
                  d="M32.5332 15.6924H-7.99661V17.3337H32.5332V15.6924Z"
                  fill="#BD3D44"
                />
                <path
                  d="M32.5332 0.924316H-7.99661V2.56565H32.5332V0.924316Z"
                  fill="white"
                />
                <path
                  d="M32.5332 4.20566H-7.99661V5.84699H32.5332V4.20566Z"
                  fill="white"
                />
                <path
                  d="M32.5332 7.48834H-7.99661V9.12967H32.5332V7.48834Z"
                  fill="white"
                />
                <path
                  d="M32.5332 10.7697H-7.99661V12.411H32.5332V10.7697Z"
                  fill="white"
                />
                <path
                  d="M32.5332 14.0523H-7.99661V15.6937H32.5332V14.0523Z"
                  fill="white"
                />
                <path
                  d="M8.21529 -3.99966H-7.99661V7.487H8.21529V-3.99966Z"
                  fill="#192F5D"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.10806 -0.0610352L0.25606 0.393632H0.733393L0.346727 0.673632L0.494727 1.1283L0.10806 0.848298L-0.278606 1.1283L-0.130606 0.673632L-0.517273 0.393632H-0.0399399L0.10806 -0.0610352Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.80914 -0.0610352L2.95714 0.393632H3.43447L3.04781 0.673632L3.19581 1.1283L2.80914 0.848298L2.42247 1.1283L2.57047 0.673632L2.18381 0.393632H2.66114L2.80914 -0.0610352Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.51156 -0.0610352L5.65956 0.393632H6.1369L5.75023 0.673632L5.89823 1.1283L5.51156 0.848298L5.1249 1.1283L5.2729 0.673632L4.88623 0.393632H5.36356L5.51156 -0.0610352Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.45859 1.08698L1.60659 1.54164H2.08392L1.69725 1.82164L1.84525 2.27631L1.45859 1.99631L1.07192 2.27631L1.21992 1.82164L0.833252 1.54164H1.31059L1.45859 1.08698Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.16101 1.08698L4.30901 1.54164H4.78634L4.39967 1.82164L4.54767 2.27631L4.16101 1.99631L3.77434 2.27631L3.92234 1.82164L3.53568 1.54164H4.01301L4.16101 1.08698Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.86343 1.08698L7.01143 1.54164H7.48876L7.1021 1.82164L7.2501 2.27631L6.86343 1.99631L6.47676 2.27631L6.62476 1.82164L6.2381 1.54164H6.71543L6.86343 1.08698Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.10806 2.2363L0.25606 2.69097H0.733393L0.346727 2.97097L0.494727 3.42563L0.10806 3.14563L-0.278606 3.42563L-0.130606 2.97097L-0.517273 2.69097H-0.0399399L0.10806 2.2363Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.80914 2.2363L2.95714 2.69097H3.43447L3.04781 2.97097L3.19581 3.42563L2.80914 3.14563L2.42247 3.42563L2.57047 2.97097L2.18381 2.69097H2.66114L2.80914 2.2363Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.51156 2.2363L5.65956 2.69097H6.1369L5.75023 2.97097L5.89823 3.42563L5.51156 3.14563L5.1249 3.42563L5.2729 2.97097L4.88623 2.69097H5.36356L5.51156 2.2363Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.45859 3.38431L1.60659 3.83898H2.08392L1.69725 4.11898L1.84525 4.57364L1.45859 4.29364L1.07192 4.57364L1.21992 4.11898L0.833252 3.83898H1.31059L1.45859 3.38431Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.16101 3.38431L4.30901 3.83898H4.78634L4.39967 4.11898L4.54767 4.57364L4.16101 4.29364L3.77434 4.57364L3.92234 4.11898L3.53568 3.83898H4.01301L4.16101 3.38431Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.86343 3.38431L7.01143 3.83898H7.48876L7.1021 4.11898L7.2501 4.57364L6.86343 4.29364L6.47676 4.57364L6.62476 4.11898L6.2381 3.83898H6.71543L6.86343 3.38431Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.10806 4.53363L0.25606 4.9883H0.733393L0.346727 5.2683L0.494727 5.72296L0.10806 5.44296L-0.278606 5.72296L-0.130606 5.2683L-0.517273 4.9883H-0.0399399L0.10806 4.53363Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.80914 4.53363L2.95714 4.9883H3.43447L3.04781 5.2683L3.19581 5.72296L2.80914 5.44296L2.42247 5.72296L2.57047 5.2683L2.18381 4.9883H2.66114L2.80914 4.53363Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.51156 4.53363L5.65956 4.9883H6.1369L5.75023 5.2683L5.89823 5.72296L5.51156 5.44296L5.1249 5.72296L5.2729 5.2683L4.88623 4.9883H5.36356L5.51156 4.53363Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.45859 5.68164L1.60659 6.13631H2.08392L1.69725 6.41631L1.84525 6.87097L1.45859 6.59097L1.07192 6.87097L1.21992 6.41631L0.833252 6.13631H1.31059L1.45859 5.68164Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.16101 5.68164L4.30901 6.13631H4.78634L4.39967 6.41631L4.54767 6.87097L4.16101 6.59097L3.77434 6.87097L3.92234 6.41631L3.53568 6.13631H4.01301L4.16101 5.68164Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.86343 5.68164L7.01143 6.13631H7.48876L7.1021 6.41631L7.2501 6.87097L6.86343 6.59097L6.47676 6.87097L6.62476 6.41631L6.2381 6.13631H6.71543L6.86343 5.68164Z"
                  fill="white"
                />
              </svg>
            ) : (
              <div></div>
            )}
          </div>
          <div className="countryName">
            <p className="insideCountry">
              {location[props.country - 1] ?? "სხვა"}
            </p>
          </div>
        </div>

        <div className="timeAndViews">
          {props.vip === 0 ? (
            <svg
              className="vip"
              width="32"
              height="20"
              viewBox="0 0 32 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32" height="20" rx="10" fill="#4A6CFA" />
              <path
                d="M9.54 6.86L11.13 11.88H11.15L12.76 6.86H14.38L12.01 14H10.24L7.92 6.86H9.54ZM16.5588 14H14.9888V6.86H16.5588V14ZM17.938 6.86H21.168C21.708 6.86 22.1614 6.96 22.528 7.16C22.8947 7.36 23.168 7.63333 23.348 7.98C23.5347 8.32667 23.628 8.71667 23.628 9.15C23.628 9.59 23.5347 9.98333 23.348 10.33C23.168 10.67 22.8947 10.94 22.528 11.14C22.1614 11.34 21.7114 11.44 21.178 11.44H19.508V14H17.938V6.86ZM19.508 10.22H20.758C21.218 10.22 21.558 10.1367 21.778 9.97C21.998 9.79667 22.108 9.52333 22.108 9.15C22.108 8.78333 21.998 8.51333 21.778 8.34C21.5647 8.16667 21.228 8.08 20.768 8.08H19.508V10.22Z"
                fill="white"
              />
            </svg>
          ) : props.vip === 1 ? (
            <svg
              className="vip"
              width="41"
              height="20"
              viewBox="0 0 41 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="41" height="20" rx="10" fill="#FEC900" />
              <path
                d="M9.54 6.86L11.13 11.88H11.15L12.76 6.86H14.38L12.01 14H10.24L7.92 6.86H9.54ZM16.5588 14H14.9888V6.86H16.5588V14ZM17.938 6.86H21.168C21.708 6.86 22.1614 6.96 22.528 7.16C22.8947 7.36 23.168 7.63333 23.348 7.98C23.5347 8.32667 23.628 8.71667 23.628 9.15C23.628 9.59 23.5347 9.98333 23.348 10.33C23.168 10.67 22.8947 10.94 22.528 11.14C22.1614 11.34 21.7114 11.44 21.178 11.44H19.508V14H17.938V6.86ZM19.508 10.22H20.758C21.218 10.22 21.558 10.1367 21.778 9.97C21.998 9.79667 22.108 9.52333 22.108 9.15C22.108 8.78333 21.998 8.51333 21.778 8.34C21.5647 8.16667 21.228 8.08 20.768 8.08H19.508V10.22ZM27.1812 12.01V10.94H29.1712V8.95H30.2412V10.94H32.2312V12.01H30.2412V14H29.1712V12.01H27.1812Z"
                fill="white"
              />
            </svg>
          ) : (
            <span className="sVip">S - VIP</span>
          )}
          <div className="views">{props.views} ნახვა</div>
          <svg
            className="timeAndViewsIcon"
            width="3"
            height="4"
            viewBox="0 0 3 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="1.5" cy="2" r="1.5" fill="#8C929B" />
          </svg>
          <div className="postDate">{props.days}</div>
        </div>
      </div>
    </div>
  );
}

export default Info;
