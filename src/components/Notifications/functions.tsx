import React from "react";
import Emoji from "components/Utils/Emoji/Emoji";

export const renderEmoji = (alarm: string) => {
  switch (alarm) {
    case "wind": return <Emoji title="wind" emoji="💨" />;
    case "rain": return <Emoji title="rain" emoji="☔" />;
    case "temperature": return <Emoji title="temperature" emoji="🌡️" />;
    default: throw Error("invalid alarm name")
  }
}
