import React, { useState } from "react";
import { withStyles } from "@ellucian/react-design-system/core/styles";
import { spacing40 } from "@ellucian/react-design-system/core/styles/tokens";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Search,
  Typography,
} from "@ellucian/react-design-system/core";
import students from "../students.json";
import PropTypes from "prop-types";
import { useCardControl } from "@ellucian/experience-extension-utils";

const styles = () => ({
  card: {
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    padding: spacing40,
  },
});

function StudentCard(props) {
  const { classes } = props;
  const [searchBy, setSearchBy] = useState("lastname");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { navigateToPage } = useCardControl();

  const handleRadioChange = (event) => {
    setSearchBy(event.target.value);
    setQuery("");
    setResults([]);
  };

  const handleSearch = (input) => {
    setQuery(input);

    if (!input) {
      setResults([]);
      return;
    }

    let filtered = [];
    if (searchBy === "id") {
      filtered = students.filter((s) =>
        s.studentId.toLowerCase().includes(input.toLowerCase())
      );
    } else {
      filtered = students.filter((s) =>
        s.lastName.toLowerCase().includes(input.toLowerCase())
      );
    }

    setResults(filtered);
  };

  const handleClick = (item) => {
    navigateToPage({
      route: `/details?studentId=${item.studentId}`,
      state: { item },
    });
  };

  return (
    <div className={classes.card}>
      <FormControl fullWidth>
        <RadioGroup
          row
          name="search-type"
          value={searchBy}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="lastname"
            control={<Radio />}
            label="Last Name"
          />
          <FormControlLabel value="id" control={<Radio />} label="ID" />
        </RadioGroup>

        <Search
          inputProps={{ "aria-label": "Search for a student" }}
          placeholder={`Search by ${searchBy}`}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          fullWidth
        />
      </FormControl>

      <div style={{ marginTop: "1rem" }}>
        {results.length === 0 && query && (
          <Typography color="error">
            {searchBy === "id" ? "No ID found" : "No Last Name found"}
          </Typography>
        )}

        {results.map((student) => (
          <div
            key={student.studentId}
            role="button"
            tabIndex={0}
            onClick={() => handleClick(student)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClick(student);
              }
            }}
            style={{
              marginTop: "0.5rem",
              cursor: "pointer",
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          >
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              {student.firstName} {student.lastName}
            </Typography>
            <Typography variant="body2">ID: {student.studentId}</Typography>
            <Typography variant="body2">Email: {student.email}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

StudentCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentCard);
