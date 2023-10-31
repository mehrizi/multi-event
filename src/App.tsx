import { MultiEvent } from "./assets/Components/MultiEvent";
import { Event } from "./types";
import { DateTime } from "luxon";
import { EventFactory } from "./assets/Helpers/EventFactory";
import { Calendar } from "./assets/Components/Calendar";
import { YearBar } from "./assets/Components/YearBar";
function App() {
  let events: Event[] = [];
  let dateNow: DateTime = DateTime.now().set({ day: 1 });
  const dateEnd = DateTime.now().set({ day: 28 });
  while (dateNow.toFormat("dd") <= dateEnd.toFormat("dd")) {
    const eventFactory = new EventFactory(dateNow);
    events = events.concat(
      eventFactory.generateRandomEventArray(Math.ceil(Math.random() * 10))
    );
    dateNow = dateNow.plus({ days: 1 });
  }

  return (
    <>
      <h1>A simple multi event Calendar</h1>
      <div className="card" style={{ width: "300px" }}>
        <MultiEvent events={events}>
          <YearBar />
          <Calendar />
        </MultiEvent>
      </div>
    </>
  );
}

export default App;