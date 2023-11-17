import type { Meta, StoryObj } from "@storybook/react";

import { MultiEvent, Event } from "./Components/MultiEvent";
import { Calendar } from "./Components/Calendar";
import { DateTime } from "luxon";
import { EventFactory } from "./Helpers/EventFactory";
import { YearBar } from "./Components/YearBar";
import { within, userEvent } from "@storybook/testing-library";

import { expect } from "@storybook/jest";

// Viewports
// Doing event generation
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

const meta: Meta<typeof MultiEvent> = {
  title: "Multi Event Calendar",
  component: MultiEvent,
  argTypes: {
    calendar: {
      control: "select",
    },
    config: {
      control: {
        type: "object",
      },
    },
    events: {
      table: {
        disable: true,
      },
    },
    today: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    calendar: "iso8601",
    config: {
      weekends: [6, 7],
      rtl: false,
      weekstart: 1,
    },
  },
  render: (args) => (
    <MultiEvent {...args} events={events}>
      <YearBar />
      <Calendar />
    </MultiEvent>
  ),
} satisfies Story;

export const MonthNavTesting = {
  ...Primary,
  play: async ({ args, canvasElement,step }) => {
    const canvas = within(canvasElement);

    await step("Go to Next month", async () => {
      await userEvent.click(canvas.getByText(">"));
      const nextMonthName = DateTime.now()
        .reconfigure({ outputCalendar: args.calendar ?? "iso8601" })
        .plus({ months: 1 })
        .toFormat("MMMM yyyy");
      await expect(canvas.getByText(nextMonthName)).toBeInTheDocument();
    });

    await step("Go to Prev month", async () => {
      await userEvent.click(canvas.getByText("<"));
      const nextMonthName = DateTime.now()
        .reconfigure({ outputCalendar: args.calendar ?? "iso8601" })
        .toFormat("MMMM yyyy");
      await expect(canvas.getByText(nextMonthName)).toBeInTheDocument();
    });

  },
} satisfies Story;

export const Bounded = {
  args: {
    calendar: "iso8601",
    config: {
      weekends: [6, 7],
      rtl: false,
      weekstart: 1,
    },
  },
  parameters: {
    viewport: {
      defaultViewport: "large",
    },
  },
  render: (args) => {
    return (
      <div style={{ maxWidth: 300, margin: "auto" }}>
        <MultiEvent {...args} events={events}>
          <YearBar />
          <Calendar />
        </MultiEvent>
      </div>
    );
  },
} satisfies Story;
