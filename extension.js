// module.exports = {
//   name: "SampleExperienceCard",
//   publisher: "Sanyukta",
//   cards: [
//     {
//       type: "Sample Experience Card",
//       source: "./src/cards/SampleCardCard",
//       title: "Sample Experience Card",
//       displayCardType: "Sample Experience Card",
//       description:
//         "This is an introductory card to the Ellucian Experience SDK",
//       // pageRoute: {
//       //    route: "/",
//       //    excludeClickSelectors: ["a"],
//       // },
//     },
//   ],
//   page: {
//     source: "./src/page/router.jsx",
//   },
// };

module.exports = {
  name: "SampleExperienceCard",
  publisher: "Sanyukta",
  cards: [
    {
      type: "Sample Experience Card",
      source: "./src/cards/SampleCardCard",
      title: "Sample Experience Card",
      displayCardType: "Sample Experience Card",
      description:
        "This is an introductory card to the Ellucian Experience SDK",
      // pageRoute: {
      //   route: "/details/:studentId",
      //   excludeClickSelectors: ["a"],
      // },
    },
  ],
  page: {
    source: "./src/page/router.jsx",
  },
};
