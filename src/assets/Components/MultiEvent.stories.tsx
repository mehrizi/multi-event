import type { Meta, StoryObj } from "@storybook/react";

import MultiEvent from "./MultiEvent";
import Calendar from "./Calendar";
import { DateTime } from "luxon";
import { EventFactory } from "../Helpers/EventFactory";
import {  MultiEventProps } from "../../types";

// Doing event generation
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

const meta: Meta<typeof MultiEvent> = {
  title: "Multi Event Calendar",
  component: MultiEvent,
  render: (args) => (
    <MultiEvent {...args} events={events}>
      <Calendar />
    </MultiEvent>
  ),
  argTypes: {
    calendar: {
      control: "select",
      options : ['buddhist'
      , 'chinese'
      , 'coptic'
      , 'ethiopiac'
      , 'ethiopic'
      , 'hebrew'
      , 'indian'
      , 'islamic'
      , 'islamicc'
      , 'iso8601'
      , 'japanese'
      , 'persian'
      , 'roc']
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export function Primary(args: MultiEventProps) {
  return (
    <MultiEvent {...args} events={events}>
      <Calendar />
    </MultiEvent>
  );
}

Primary.args = {
  calendar:"persian",
};
