import React, { useEffect, useMemo, useCallback } from "react";
import { withStyles } from "@ellucian/react-design-system/core/styles";
import {
  spacing20,
  spacing30,
} from "@ellucian/react-design-system/core/styles/tokens";
import {
  Typography,
  Button,
  Divider,
} from "@ellucian/react-design-system/core";
import PropTypes from "prop-types";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { useLocation, useHistory } from "react-router-dom";
import { Icon } from "@ellucian/ds-icons/lib";
import students from "../../json/students.json";

const styles = () => ({
  root: {
    margin: spacing30,
  },
  topControls: {
    display: "flex",
    alignItems: "center",
    gap: spacing20,
    marginBottom: spacing30,
  },
  sectionHeading: {
    borderBottom: "2px solid #000",
    paddingBottom: "4px",
    display: "inline-block",
    marginBottom: "12px",
  },
  section: {
    marginTop: spacing30,
    marginBottom: spacing30,
  },
  field: {
    marginBottom: spacing20,
  },
});

const StudentDetails = (props) => {
  const { classes } = props;
  const { setPageTitle } = usePageControl();
  const location = useLocation();
  const history = useHistory();

  // ✅ Get studentId from query params
  const queryParams = new URLSearchParams(location.search);
  const studentId = queryParams.get("studentId");

  const selectedStudent = useMemo(
    () => students.find((el) => el.studentId === studentId),
    [studentId]
  );

  useEffect(() => {
    setPageTitle("Student Details");
  }, [setPageTitle]);

  // ✅ Back button preserves search/filters
  const handleBack = useCallback(() => {
    history.goBack();
  }, [history]);

  if (!selectedStudent) {
    return (
      <Typography variant="body1">No student details available.</Typography>
    );
  }

  return (
    <div className={classes.root}>
      {/* Back Button */}
      <div className={classes.topControls}>
        <Button
          onClick={handleBack}
          color="secondary"
          startIcon={<Icon name="arrow-left" />}
        >
          Back
        </Button>
      </div>

      {/* Basic Info */}
      <div className={classes.section}>
        <Typography variant="h2">
          {selectedStudent.firstName} {selectedStudent.lastName}
        </Typography>
        <Typography variant="body1">ID: {selectedStudent.studentId}</Typography>
        <Typography variant="body1">Email: {selectedStudent.email}</Typography>
      </div>
      <Divider />

      {/* Contact Info */}
      {selectedStudent?.contactInformation && (
        <div className={classes.section}>
          <Typography variant="h2" className={classes.sectionHeading}>
            Contact Information
          </Typography>
          {Object.entries(selectedStudent.contactInformation).map(
            ([key, value]) => (
              <Typography key={key} variant="body1" className={classes.field}>
                <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
                {value}
              </Typography>
            )
          )}
        </div>
      )}
      <Divider />

      {/* Housing Info */}
      {selectedStudent?.housingInformation && (
        <div className={classes.section}>
          <Typography variant="h2" className={classes.sectionHeading}>
            Housing Information
          </Typography>
          {Object.entries(selectedStudent.housingInformation).map(
            ([key, value]) => (
              <Typography key={key} variant="body1" className={classes.field}>
                <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
                {value}
              </Typography>
            )
          )}
        </div>
      )}
      <Divider />

      {/* Grade Info */}
      {selectedStudent?.gradeInformation && (
        <div className={classes.section}>
          <Typography variant="h2" className={classes.sectionHeading}>
            Grade Information
          </Typography>
          {Object.entries(selectedStudent.gradeInformation).map(
            ([key, value]) => (
              <Typography key={key} variant="body1" className={classes.field}>
                <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
                {value}
              </Typography>
            )
          )}
        </div>
      )}
      <Divider />

      {/* FERPA Info */}
      {selectedStudent?.ferpaReleaseDesignees?.length > 0 && (
        <div className={classes.section}>
          <Typography variant="h2" className={classes.sectionHeading}>
            FERPA Academic Information Release Designees
          </Typography>
          {selectedStudent.ferpaReleaseDesignees.map((el, idx) => (
            <Typography key={idx} variant="body1" className={classes.field}>
              <strong>{el.name}:</strong> {el.passcode}
            </Typography>
          ))}
        </div>
      )}
    </div>
  );
};

StudentDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentDetails);
