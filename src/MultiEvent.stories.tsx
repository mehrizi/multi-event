import type { Meta, StoryObj } from "@storybook/react";

import { MultiEvent, Event } from "./Components/MultiEvent";
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

/** Hi */
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
      viewports: {
        xlarge: {
          name: "xlarge (780px wide)",
          styles: {
            width: "780px",
            height: "480px",
          },
        },
      },
      defaultViewport: "xlarge",
    },
  },
  render: (args) => {
    return (
      <div style={{maxWidth:300,margin:'auto'}}>
      <MultiEvent {...args} events={events}>
        <YearBar />
        <Calendar />
      </MultiEvent>

      </div>

    );
  },
} satisfies Story;
