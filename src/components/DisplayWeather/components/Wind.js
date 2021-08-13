import React from "react";
import { RadioButtons2 } from "../../Utils/RadioButtons/RadioButtons";

const Wind = ({ selectedTime }) => {
  const [isKm, setIsKm] = React.useState(true);

  //converts from metres per second (m/s) to km/h or to miles per hour
  const convertWindSpeed = value =>
    isKm ? Math.round(value * 3.6) : Math.round(value * 2.237);

  const convertWindDirection = value => {
    //adapted from https://www.campbellsci.de/blog/convert-wind-directions
    //using this graph in http://snowfence.umn.edu/Components/winddirectionanddegrees.htm as a reference
    // prettier-ignore
    const cardinalPoints = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"]
    return cardinalPoints[Math.round(value / 22.5)];
  };

  //Rotates wind arrow
  const rotate = deg => {
    document.querySelector(
      ".fa-long-arrow-alt-down"
    ).style.transform = `rotate(${deg}deg)`;
  };

  React.useEffect(() => {
    if (selectedTime.length > 0) {
      rotate(selectedTime[0].wind.deg);
    }
  }, [selectedTime]);

  return (
    <>
      <div className="item item--8">
        <h4>Wind</h4>
        <div className="wrapper__wind-units">
          <button>
            <RadioButtons2
              id={"kms"}
              label={" km/h"}
              checked={isKm}
              action={() => setIsKm(true)}
            />
          </button>
          <button>
            <RadioButtons2
              id={"mps"}
              label={" mph"}
              checked={!isKm}
              action={() => setIsKm(false)}
            />
          </button>
        </div>
      </div>

      <div className="item item--9">
        {selectedTime.length > 0 && (
          <span>{convertWindSpeed(selectedTime[0].wind.speed)}</span>
        )}
        <span>
          {selectedTime.length > 0
            ? convertWindDirection(selectedTime[0].wind.deg)
            : "n/a"}
        </span>
        <span
          style={selectedTime.length > 0 ? { display: "block" } : { display: "none" }}
        >
          <i className="fas fa-long-arrow-alt-down"></i>
        </span>
      </div>
    </>
  );
};

export { Wind };
