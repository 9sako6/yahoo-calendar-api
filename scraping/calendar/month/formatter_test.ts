import { responseJsonFromSerialEvents, SerialEvents } from "./formatter.ts";
import { assertEquals } from "../../../test_deps.ts";

Deno.test("events in month formatter", () => {
  const serialEvents: SerialEvents = [
    { type: "event-date", content: "3/13 (日)" },
    {
      type: "event-detail",
      content: {
        date: "19:00 〜 19:30通知",
        title: " API使いたい",
        place: "自宅",
        cal: "カレンダー",
      },
    },
    { type: "event-date", content: "3/20 (日)" },
    {
      type: "event-detail",
      content: { date: "終日通知", title: " 予定1", place: "", cal: "カレンダー" },
    },
    { type: "event-date", content: "3/21 (月)" },
    {
      type: "event-detail",
      content: { date: "終日通知", title: " 予定1", place: "", cal: "カレンダー" },
    },
    {
      type: "event-detail",
      content: { date: "終日通知", title: " 予定2", place: "", cal: "カレンダー" },
    },
    {
      type: "event-detail",
      content: { date: "終日通知", title: " 予定3", place: "", cal: "カレンダー" },
    },
    {
      type: "event-detail",
      content: { date: "終日通知", title: " 予定5", place: "", cal: "カレンダー" },
    },
    {
      type: "event-detail",
      content: { date: "終日通知", title: " 散歩1", place: "", cal: "散歩" },
    },
    {
      type: "event-detail",
      content: {
        date: "15:00 〜 15:30通知",
        title: " 予定4",
        place: "",
        cal: "カレンダー",
      },
    },
    {
      type: "event-detail",
      content: {
        date: "15:00 〜 15:30通知",
        title: " 予定6",
        place: "",
        cal: "カレンダー",
      },
    },
    {
      type: "event-detail",
      content: {
        date: "15:00 〜 15:30通知",
        title: " 予定7",
        place: "",
        cal: "カレンダー",
      },
    },
    {
      type: "event-detail",
      content: {
        date: "15:00 〜 15:30通知",
        title: " 予定8",
        place: "",
        cal: "カレンダー",
      },
    },
  ];

  const expectedJson = {
    year: 2022,
    month: 3,
    items: [
      { date: "2022-3-1", events: [] },
      { date: "2022-3-2", events: [] },
      { date: "2022-3-3", events: [] },
      { date: "2022-3-4", events: [] },
      { date: "2022-3-5", events: [] },
      { date: "2022-3-6", events: [] },
      { date: "2022-3-7", events: [] },
      { date: "2022-3-8", events: [] },
      { date: "2022-3-9", events: [] },
      { date: "2022-3-10", events: [] },
      { date: "2022-3-11", events: [] },
      { date: "2022-3-12", events: [] },
      {
        date: "2022-3-13",
        events: [
          {
            date: "19:00 〜 19:30通知",
            title: " API使いたい",
            place: "自宅",
            calendar: "カレンダー",
          },
        ],
      },
      { date: "2022-3-14", events: [] },
      { date: "2022-3-15", events: [] },
      { date: "2022-3-16", events: [] },
      { date: "2022-3-17", events: [] },
      { date: "2022-3-18", events: [] },
      { date: "2022-3-19", events: [] },
      {
        date: "2022-3-20",
        events: [{ date: "終日通知", title: " 予定1", place: "", calendar: "カレンダー" }],
      },
      {
        date: "2022-3-21",
        events: [
          {
            date: "終日通知",
            title: " 予定1",
            place: "",
            calendar: "カレンダー",
          },
          {
            date: "終日通知",
            title: " 予定2",
            place: "",
            calendar: "カレンダー",
          },
          {
            date: "終日通知",
            title: " 予定3",
            place: "",
            calendar: "カレンダー",
          },
          {
            date: "終日通知",
            title: " 予定5",
            place: "",
            calendar: "カレンダー",
          },
          {
            date: "終日通知",
            title: " 散歩1",
            place: "",
            calendar: "散歩",
          },
          {
            date: "15:00 〜 15:30通知",
            title: " 予定4",
            place: "",
            calendar: "カレンダー",
          },
          {
            date: "15:00 〜 15:30通知",
            title: " 予定6",
            place: "",
            calendar: "カレンダー",
          },
          {
            date: "15:00 〜 15:30通知",
            title: " 予定7",
            place: "",
            calendar: "カレンダー",
          },
          {
            date: "15:00 〜 15:30通知",
            title: " 予定8",
            place: "",
            calendar: "カレンダー",
          },
        ],
      },
      { date: "2022-3-22", events: [] },
      { date: "2022-3-23", events: [] },
      { date: "2022-3-24", events: [] },
      { date: "2022-3-25", events: [] },
      { date: "2022-3-26", events: [] },
      { date: "2022-3-27", events: [] },
      { date: "2022-3-28", events: [] },
      { date: "2022-3-29", events: [] },
      { date: "2022-3-30", events: [] },
      { date: "2022-3-31", events: [] },
    ],
  };

  assertEquals(
    responseJsonFromSerialEvents(2022, 3, serialEvents),
    expectedJson,
  );
});
