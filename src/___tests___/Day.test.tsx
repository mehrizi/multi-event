import { render, screen } from "@testing-library/react";
import { Day } from "../Components/Day";
import { DateTime } from "luxon";
import userEvent from '@testing-library/user-event'
import { Event } from "../Components/MultiEvent";

describe("Day Component", () => {
  test("Render the Day correctly", () => { 
    const day = DateTime.now();
    render(<Day day={day} today={day} weekends={[]} />);
    const titleElement = screen.getByText(day.toFormat("d"));
    expect(titleElement).toBeInTheDocument();
  });

  test("Render the weekend as holiday", () => {
    const day = DateTime.now();
    render(<Day day={day} today={day} weekends={[parseInt(day.toFormat("c"))]} />);
    const titleElement = screen.getByRole("day");
    expect(titleElement).toHaveClass("weekend");

  });

  test("Render the weekend as holiday (multiday weekend)", () => {
    const day = DateTime.now();
    render(<Day day={day} today={day} weekends={[2,4,parseInt(day.toFormat("c"))]} />);
    const titleElement = screen.getByRole("day");
    expect(titleElement).toHaveClass("weekend");

  });

  test("Show events on mouse hover", () => {
    const day = DateTime.now();
    const events:Event[] = [
      {
        color:"#ccc",
        time: DateTime.now(),
        title: "The Sample Event 1"
      },
      {
        color:"#ccc",
        time: DateTime.now(),
        title: "The Sample Event 2"
      }
    ]
    render(<Day day={day} today={day} weekends={[4,5]} events={events} />);

    userEvent.hover(screen.getByText(day.toFormat("d")))

    const titleElement = screen.queryByText("The Sample Event 1");
    expect(titleElement).toBeInTheDocument();
    
    const titleElement2 = screen.queryByText("The Sample Event 2");
    expect(titleElement2).toBeInTheDocument();

  });
});
