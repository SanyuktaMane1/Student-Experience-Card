// import { withStyles } from "@ellucian/react-design-system/core/styles";
// import { spacing20 } from "@ellucian/react-design-system/core/styles/tokens";
// import { Typography } from "@ellucian/react-design-system/core";
// import PropTypes from "prop-types";
// import React from "react";

// import { useLocation } from "react-router-dom";

// import { usePageControl } from "@ellucian/experience-extension-utils";

// const styles = () => ({
//   card: {
//     margin: `0 ${spacing20}`,
//   },
// });

// const StudentDetails = (props) => {
//   const { classes } = props;
//   const { setPageTitle } = usePageControl();
//   const location = useLocation();

//   const { item } = location.state || {};

//   if (!item) {
//     return <p>No item selected.</p>;
//   }

//   setPageTitle("Props and Hooks");

//   return (
//     <div className={classes.card}>
//       <Typography variant={"h2"}>Properties</Typography>
//       <h2>{item?.title}</h2>
//       <p>ID: {item?.id}</p>
//       <p>{item?.description}</p>
//     </div>
//   );
// };

// StudentDetails.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(StudentDetails);
