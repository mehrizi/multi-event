import { render, screen } from "@testing-library/react";
import { DateTime } from "luxon";
import userEvent from "@testing-library/user-event";
import { Event } from "../Components/MultiEvent";
import MultiEvent from "../Components/MultiEvent";
import YearBar from "../Components/YearBar";
import Calendar from "../Components/Calendar";
import { EventFactory } from "../Helpers/EventFactory";

let events: Event[] = [];
let dateNow: DateTime = DateTime.now().set({ day: 1 });
const dateEnd = DateTime.now().set({ day: 28 });
while (dateNow.toFormat("dd") <= dateEnd.toFormat("dd")) {
  const eventFactory = new EventFactory(dateNow);
  const newEvents = eventFactory.generateRandomEventArray(
    Math.ceil(Math.random() * 7)
  );
  events = [...events, ...newEvents];
  dateNow = dateNow.plus({ days: 1 });
}

describe("Calendar Component", () => {
  test("Render the Yearbar", () => {

    // const day = DateTime.now();
    render(
      <MultiEvent events={events}>
        <YearBar />
        <Calendar />
      </MultiEvent>
    );
    const titleElement = screen.getByText(DateTime.now().toFormat("MMMM yyyy"));
    expect(titleElement).toBeInTheDocument();

  });
  
  test("Next month", () => {

    // const day = DateTime.now();
    render(
      <MultiEvent events={events}>
        <YearBar />
        <Calendar />
      </MultiEvent>
    );

    userEvent.click(screen.getByText(">"));
    const nextMonthName = DateTime.now()
      .plus({ months: 1 })
      .toFormat("MMMM yyyy");
    expect(screen.getByText(nextMonthName)).toBeInTheDocument();


  });
});
