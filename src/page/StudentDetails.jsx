import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import {
  MasterDetail,
  Typography,
  Button,
  Divider,
} from "@ellucian/react-design-system/core";
import { withStyles } from "@ellucian/react-design-system/core/styles";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { useLocation, useHistory } from "react-router-dom";
import { Icon } from "@ellucian/ds-icons/lib";
import students from "../students.json";

const styles = (theme) => ({
  root: {
    height: "35rem",
    width: "100%",
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2),
  },
});

const StudentDetailsMasterDetail = withStyles(styles)((props) => {
  const { classes } = props;
  const { setPageTitle } = usePageControl();
  const location = useLocation();
  const history = useHistory();
  const { navigateToPage } = usePageControl();

  const queryParams = new URLSearchParams(location.search);
  const studentId = queryParams.get("studentId")?.trim();

  const student = useMemo(
    () => students.find((s) => s.studentId === studentId),
    [studentId]
  );

  useEffect(() => {
    setPageTitle("Student Details");
  }, [setPageTitle]);

  const [selectedNodeId, setSelectedNodeId] = useState("basic");

  const handleNodeSelect = (e, item) => {
    setSelectedNodeId(item.nodeId);
  };

  if (!student) {
    return <Typography>No student details available.</Typography>;
  }

  const menu = [
    { label: "Basic Info", nodeId: "basic" },
    { label: "Contact Info", nodeId: "contact" },
    { label: "Housing Info", nodeId: "housing" },
    { label: "Grade Info", nodeId: "grade" },
    { label: "Class Schedule", nodeId: "schedule" },
    { label: "FERPA Info", nodeId: "ferpa" },
  ];

  const renderDetail = () => {
    switch (selectedNodeId) {
      case "basic":
        return (
          <>
            <Typography variant="h2">
              {student.firstName} {student.lastName}
            </Typography>
            <Typography>ID: {student.studentId}</Typography>
            <Typography>Email: {student.email}</Typography>
          </>
        );
      case "contact":
        return (
          <>
            {Object.entries(student.contactInformation).map(([key, value]) => (
              <Typography key={key}>
                <strong>{key}:</strong> {value}
              </Typography>
            ))}
          </>
        );
      case "housing":
        return (
          <>
            {Object.entries(student.housingInformation).map(([key, value]) => (
              <Typography key={key}>
                <strong>{key}:</strong> {value}
              </Typography>
            ))}
          </>
        );
      case "grade":
        return (
          <>
            {Object.entries(student.gradeInformation).map(([key, value]) => (
              <Typography key={key}>
                <strong>{key}:</strong> {value}
              </Typography>
            ))}
          </>
        );
      case "schedule":
        return (
          <Button
            onClick={() =>
              history.push(`class-schedule?studentId=${student.studentId}`)
            }
            color="primary"
            startIcon={<Icon name="arrow-right" />}
          >
            Go to Class Schedule
          </Button>
        );
      case "ferpa":
        return (
          <>
            {student.ferpaReleaseDesignees.map((el, idx) => (
              <Typography key={idx}>
                <strong>{el.name}:</strong> {el.passcode}
              </Typography>
            ))}
          </>
        );
      default:
        return <Typography>Select a section</Typography>;
    }
  };

  return (
    <div className={classes.root}>
      <Button
        onClick={() => navigateToPage({ route: "/" })} // empty route = back to card
        color="secondary"
        startIcon={<Icon name="arrow-left" />}
      >
        Back to Card
      </Button>

      <Divider style={{ marginTop: "1rem" }} />
      <MasterDetail
        title="Student Details"
        menu={menu}
        onNodeSelect={handleNodeSelect}
        selectedNodeId={selectedNodeId}
      >
        {renderDetail()}
      </MasterDetail>
    </div>
  );
});

StudentDetailsMasterDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default StudentDetailsMasterDetail;
