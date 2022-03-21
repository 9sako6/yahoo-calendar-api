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
      {
        date: "3/13 (日)",
        events: [
          {
            date: "19:00 〜 19:30通知",
            title: " API使いたい",
            place: "自宅",
            calendar: "カレンダー",
          },
        ],
      },
      {
        date: "3/20 (日)",
        events: [{ date: "終日通知", title: " 予定1", place: "", calendar: "カレンダー" }],
      },
      {
        date: "3/21 (月)",
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
    ],
  };

  assertEquals(
    responseJsonFromSerialEvents(2022, 3, serialEvents),
    expectedJson,
  );
});
