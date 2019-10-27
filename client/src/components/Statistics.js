import React, { useState } from "react";

import { useQuery } from "@apollo/react-hooks";
import {
  Menu,
  Segment,
  Container,
  Message,
  Responsive,
  Accordion,
  Icon
} from "semantic-ui-react";
import StatisticDisplay from "./StatisticDisplay";
import {
  FETCH_USERS_QUERY,
  MAJOR_STAT,
  COUNTRY_STAT,
  YEAR_STAT,
  SEX_STAT,
  ETHNICITY_STAT
} from "../util/graphql";

function Statistics() {
  var majorData = useQuery(MAJOR_STAT).data.getMajorStat;
  var countryData = useQuery(COUNTRY_STAT).data.getCountryStat;
  var yearData = useQuery(YEAR_STAT).data.getYearStat;
  var sexData = useQuery(SEX_STAT).data.getSexStat;
  var ethnicityData = useQuery(ETHNICITY_STAT).data.getEthnicityStat;

  const [activeItem, setActiveItem] = useState("Major");

  const handleItemClick = (e, { name }) => {
    if (activeItem === name) {
      setActiveItem("");
    } else {
      setActiveItem(name);
    }
  };
  return (
    <Container>
      <Responsive minWidth={992}>
        <Menu fluid widths={5}>
          <Menu.Item
            name="Major"
            active={activeItem === "Major"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="Year"
            active={activeItem === "Year"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="Country of Origin"
            active={activeItem === "Country of Origin"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="Sex"
            active={activeItem === "Sex"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="Ethnicity"
            active={activeItem === "Ethnicity"}
            onClick={handleItemClick}
          />
        </Menu>
        {activeItem === "Major" && <StatisticDisplay statData={majorData} />}
        {activeItem === "Year" && <StatisticDisplay statData={yearData} />}
        {activeItem === "Country of Origin" && (
          <StatisticDisplay statData={countryData} />
        )}
        {activeItem === "Sex" && <StatisticDisplay statData={sexData} />}
        {activeItem === "Ethnicity" && (
          <StatisticDisplay statData={ethnicityData} />
        )}
      </Responsive>

      <Responsive maxWidth={991}>
        <Accordion fluid styled>
          <Accordion.Title
            name="Major"
            active={activeItem === "Major"}
            onClick={handleItemClick}
          >
            <Icon name="dropdown" />
            Major
          </Accordion.Title>
          <Accordion.Content active={activeItem === "Major"}>
            <StatisticDisplay statData={majorData} />
          </Accordion.Content>

          <Accordion.Title
            name="Year"
            active={activeItem === "Year"}
            onClick={handleItemClick}
          >
            <Icon name="dropdown" />
            Year
          </Accordion.Title>
          <Accordion.Content active={activeItem === "Year"}>
            <StatisticDisplay statData={yearData} />
          </Accordion.Content>

          <Accordion.Title
            name="Country"
            active={activeItem === "Country"}
            onClick={handleItemClick}
          >
            <Icon name="dropdown" />
            Country of Origin
          </Accordion.Title>
          <Accordion.Content active={activeItem === "Country"}>
            <StatisticDisplay statData={countryData} />
          </Accordion.Content>

          <Accordion.Title
            name="Sex"
            active={activeItem === "Sex"}
            onClick={handleItemClick}
          >
            <Icon name="dropdown" />
            Sex
          </Accordion.Title>
          <Accordion.Content active={activeItem === "Sex"}>
            <StatisticDisplay statData={sexData} />
          </Accordion.Content>

          <Accordion.Title
            name="Ethnicity"
            active={activeItem === "Ethnicity"}
            onClick={handleItemClick}
          >
            <Icon name="dropdown" />
            Ethnicity
          </Accordion.Title>
          <Accordion.Content active={activeItem === "Ethnicity"}>
            <StatisticDisplay statData={ethnicityData} />
          </Accordion.Content>
        </Accordion>
      </Responsive>
    </Container>
  );
}

export default Statistics;
