import React from "react";
import { RadioButtons2 } from "../../Utils/RadioButtons/RadioButtons";
import { convertTemp } from "../../Utils/convertTemp";

const Temperature = ({ selectedTime }) => {
  const [isCelsius, setIsCelsius] = React.useState(true);

  return (
    <>
      <div className="item item--2">
        <h4>Temperature</h4>
        <div className="wrapper__temp-units">
          <button>
            <RadioButtons2
              id={"celsius"}
              label={" °C"}
              checked={isCelsius}
              action={() => setIsCelsius(true)}
            />
          </button>
          <button>
            <RadioButtons2
              id={"fahrenheit"}
              label={" °F"}
              checked={!isCelsius}
              action={() => setIsCelsius(false)}
            />
          </button>
        </div>
      </div>

      {/* Actual temperature  */}
      <div className="item item--3">
        <h5>Actual</h5>
        <span>
          {selectedTime.length > 0
            ? convertTemp(isCelsius, selectedTime[0].main.temp)
            : "n/a"}
        </span>
      </div>

      {/* Real feel */}
      <div className="item item--4">
        <h5> Real Feel:</h5>
        {selectedTime.length > 0
          ? convertTemp(isCelsius, selectedTime[0].main.feels_like)
          : "n/a"}
      </div>
    </>
  );
};

export { Temperature };
