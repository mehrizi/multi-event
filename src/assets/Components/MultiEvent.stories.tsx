import type { Meta, StoryObj } from "@storybook/react";

import { MultiEvent } from "./MultiEvent";
import { Calendar } from "./Calendar";
import { DateTime } from "luxon";
import { EventFactory } from "../Helpers/EventFactory";
import { YearBar } from "./YearBar";
import { Event } from "../../types";

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
      options: [
        "buddhist",
        "chinese",
        "coptic",
        "ethiopiac",
        "ethiopic",
        "hebrew",
        "indian",
        "islamic",
        "islamicc",
        "iso8601",
        "japanese",
        "persian",
        "roc",
      ],
    },
    config: {
      control: {
        type: "object",
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

// export function Primary(args: MultiEventProps) {
//   return (
//     <MultiEvent {...args} events={events}>
//       <Calendar />
//     </MultiEvent>
//   );
// }
export const Primary = {
  args: {
    calendar: "iso8601",
    config: {
      weekends: [6, 7],
      rtl: true,
      weekstart: 1,
    },
  },
  parameters: {
    viewport: { viewports: VIEWPORTS, defaultViewport: "small" },
  },
} satisfies Story;
