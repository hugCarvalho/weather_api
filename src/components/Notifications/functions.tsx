import Emoji from "components/utils/Emoji/Emoji";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const x = React
export const renderEmoji = (alarm: string) => {
  switch (alarm) {
    case "wind": return <Emoji title="wind" emoji="💨" />;
    case "rain": return <Emoji title="rain" emoji="☔" />;
    case "temperature": return <Emoji title="temperature" emoji="🌡️" />;
    default: throw Error("invalid alarm name")
  }
}

