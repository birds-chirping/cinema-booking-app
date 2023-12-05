export default class TheaterModel {
  static theaterLayout = [
    { row: "A", seats: [false, false, false, false, false, false, false, false, false, false] },
    { row: "B", seats: [false, false, false, false, false, false, false, false, false, false] },
    {
      row: "C",
      seats: [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    },
    {
      row: "D",
      seats: [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    },
    {
      row: "E",
      seats: [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    },
    {
      row: "F",
      seats: [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    },
    {
      row: "G",
      seats: [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    },
    {
      row: "H",
      seats: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    },
  ];

  static getNewLayout() {
    return JSON.parse(JSON.stringify(this.theaterLayout));
  }
}
