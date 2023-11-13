import type { Meta, StoryObj } from "@storybook/react";

import { MultiEvent,Event } from "./Components/MultiEvent";
import { Calendar } from "./Components/Calendar";
import { DateTime } from "luxon";
import { EventFactory } from "./Helpers/EventFactory";
import { YearBar } from "./Components/YearBar";

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
  render: (args) => (
    <MultiEvent {...args} events={events}>
      <YearBar />
      <Calendar />
    </MultiEvent>
  ),
  argTypes: {
    calendar: {
      control: "select",
    },
    config: {
      control: {
        type: "object",
      },
    },
    events:{
      table: {
        disable: true,
      },
    },
    today:{
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
const VIEWPORTS = {
  large:{
    name: "large (780px wide)",
    styles: {
      width: "780px",
      height: "980px",
    },
  },
  medium:{
    name: "medium (560px wide)",
    styles: {
      width: "560px",
      height: "690px",
    },
  },
  small:{
    name: "small (320px wide)",
    styles: {
      width: "320px",
      height: "400px",
    },
  },
  xsmall:{
    name: "xsmall (260px wide)",
    styles: {
      width: "260px",
      height: "330px",
    },
  },
};

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
  parameters: {
    viewport: { viewports: VIEWPORTS, defaultViewport: "small" },
  },
} satisfies Story;

export const Persian = {
  args: {
    calendar: "persian",
    locale:'fa',
    config: {
      weekends: [5],
      rtl: true,
      weekstart: 6,
    },
  },
  parameters: {
    viewport: { viewports: VIEWPORTS, defaultViewport: "small" },
  },
} satisfies Story;
