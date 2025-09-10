import React from "react";
import PropTypes from "prop-types";
import {
  AdvancedTable,
  Paper,
  Button,
} from "@ellucian/react-design-system/core";
import { Icon } from "@ellucian/ds-icons/lib";
import { useLocation, useHistory } from "react-router-dom";
import students from "../students.json";

const ClassSchedule = () => {
  const location = useLocation();
  const history = useHistory();

  const queryParams = new URLSearchParams(location.search);
  const studentId = queryParams.get("studentId")?.trim();

  //  console.log("studentId from URL:", studentId);

  const student = students.find((s) => s.studentId === studentId);
  //console.log("Found student:", student);

  const classSchedule = student?.classSchedule || [];

  const columns = [
    { accessorKey: "POT", header: "POT" },
    { accessorKey: "CRN", header: "CRN" },
    { accessorKey: "subject", header: "Subject" },
    { accessorKey: "course", header: "Course" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "credits", header: "Credits" },
    { accessorKey: "primaryInstructor", header: "Primary Instructor" },
    { accessorKey: "days", header: "Days" },
    { accessorKey: "time", header: "Time" },
    { accessorKey: "building", header: "Building" },
    { accessorKey: "room", header: "Room" },
  ];

  if (!student) return <p>Student not found</p>;

  return (
    <Paper style={{ padding: "1rem" }}>
      <Button
        onClick={() => history.push(`details?studentId=${studentId}`)}
        color="secondary"
        startIcon={<Icon name="arrow-left" />}
        style={{ marginTop: "1rem" }}
      >
        Back to Details
      </Button>
      <h2>
        {student.firstName} {student.lastName} - Class Schedule
      </h2>

      <AdvancedTable
        data={classSchedule}
        columns={columns}
        enableEditing={false}
      />
    </Paper>
  );
};

ClassSchedule.propTypes = {
  pageInfo: PropTypes.object,
};

export default ClassSchedule;
