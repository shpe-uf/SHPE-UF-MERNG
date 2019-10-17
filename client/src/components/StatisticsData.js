import React, {useState} from "react";

import { useQuery } from "@apollo/react-hooks";
import { FETCH_USERS_QUERY } from "../util/graphql";
import { Menu, Segment, Container, Message } from "semantic-ui-react";

function StatisticsData(){

    const [activeItem, setActiveItem] = useState("Events");

    const handleItemClick = (e, { name }) => {
        setActiveItem(name);
    };
        return (
            <Container>
                <Menu fluid widths={6}>
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
                    <Menu.Item
                        name="Point Distribution"
                        active={activeItem ==="Point Distribution"}
                        onClick={handleItemClick}
                    />
                </Menu>

                    {activeItem === "Major" &&(
                        <Segment attached="bottom">
                            <Message>
                                Display major information
                            </Message> 
                        </Segment>
                    )}
                    {activeItem === "Year" &&(
                        <Segment attached="bottom">
                            <Message>
                                Display year information
                            </Message> 
                        </Segment>
                    )}
                    {activeItem === "Country of Origin" &&(
                        <Segment attached="bottom">
                            <Message>
                                Display country of origin
                            </Message> 
                        </Segment>
                    )}
                    {activeItem === "Sex" &&(
                        <Segment attached="bottom">
                            <Message>
                                Display sex information
                            </Message> 
                        </Segment>
                    )}
                    {activeItem === "Ethnicity" &&(
                        <Segment attached="bottom">
                            <Message>
                                Display ethnicity information
                            </Message> 
                        </Segment>
                    )}
                    {activeItem === "Point Distribution" &&(
                        <Segment attached="bottom">
                            <Message>
                                Display Point Distribution
                            </Message> 
                        </Segment>
                    )}
            </Container>
        );

}

export default StatisticsData;