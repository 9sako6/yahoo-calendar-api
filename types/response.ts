export type EventsInMonth = {
  year: number;
  month: number;
  items: {
    date: string;
    events: {
      date: string;
      title: string;
      place: string;
      calendar: string;
    }[];
  }[];
};
