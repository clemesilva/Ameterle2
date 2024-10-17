import React from "react";
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";

export default function App() {
  let defaultDate = today(getLocalTimeZone());
  let [focusedDate, setFocusedDate] = React.useState(defaultDate);

  return (
    <div className="flex justify-center h-screen">
      <div className="">
        {" "}
        {/* Contenedor que ocupa la mitad de la pantalla */}
        <Calendar
          className="bg-yellow-100 p-4 w-full" // Asegura que el calendario ocupe todo el ancho del contenedor
          aria-label="Date (Controlled Focused Value)"
          focusedValue={focusedDate}
          value={defaultDate}
          onFocusChange={setFocusedDate}
        />
      </div>
    </div>
  );
}
