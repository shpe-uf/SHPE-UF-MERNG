import React, {useState} from "react";

import { useQuery } from "@apollo/react-hooks";
import { Menu, Segment, Container, Message } from "semantic-ui-react";
import Statistic from "./Statistic";
import {FETCH_USERS_QUERY, MAJOR_STAT, COUNTRY_STAT} from "../util/graphql";

function StatisticsData(){
    var majorData = useQuery(MAJOR_STAT).data.getMajorStat;
    var countryData = useQuery(COUNTRY_STAT).data.getCountryStat;

    const [activeItem, setActiveItem] = useState("Events");

    const handleItemClick = (e, { name }) => {
        setActiveItem(name);
    };
        return (
            <Container>
                <Menu fluid widths={5}>
                    <Menu.Item
                        name="Major"
                        active={activeItem ==="Major"}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name="Year"
                        active={activeItem ==="Year"}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name="Country of Origin"
                        active={activeItem ==="Country of Origin"}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name="Sex"
                        active={activeItem ==="Sex"}
                        onClick={handleItemClick}
                    />
                    <Menu.Item
                        name="Ethnicity"
                        active={activeItem ==="Ethnicity"}
                        onClick={handleItemClick}
                    />
                </Menu>

                    {activeItem === "Major" && majorData && (
                        <Statistic statData={majorData} />                       
                    )}
                    {activeItem === "Year" &&(
                        <Statistic/>
                    )}
                    {activeItem === "Country of Origin" && countryData && (
                        <Statistic statData={countryData} />
                    )}
                    {activeItem === "Sex" &&(
                        <Statistic/>
                    )}
                    {activeItem === "Ethnicity" &&(
                        <Statistic/>                      
                    )}
            </Container>
        );

}


export default StatisticsData;