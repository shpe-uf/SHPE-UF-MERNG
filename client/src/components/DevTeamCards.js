import React from "react";
import { Card } from "semantic-ui-react";

import alejandro from "../assets/images/team/2019-2020/alejandro.JPG";
import cesar from "../assets/images/team/2019-2020/cesar.JPG";
import david from "../assets/images/team/2019-2020/david.JPG";
import diego from "../assets/images/team/2019-2020/diego.JPG";
import eduardo from "../assets/images/team/2019-2020/eduardo.JPG";
import isabel from "../assets/images/team/2019-2020/isabel.JPG";
import juan from "../assets/images/team/2019-2020/juan.JPG";
import mariana from "../assets/images/team/2019-2020/mariana.JPG";
import placeholder from "../assets/images/team/placeholder.png";


function DevTeamCards() {
  return (
    <>
      <Card
        fluid
        image={eduardo}
        header="Eduardo Graziano"
        meta="Project Manager"
      />
      <Card
        fluid
        image={cesar}
        header="César González"
        meta="Scrum Master"
        />
      <Card
        fluid
        image={alejandro}
        header="Alejandro Alonso"
        meta="Developer"
      />
      <Card
        fluid
        image={diego}
        header="Diego Coviella"
        meta="Developer"
      />
      <Card
        fluid
        image={david}
        header="David Espantoso"
        meta="Developer"
      />
      <Card
        fluid
        image={placeholder}
        header="Sofia Harmon"
        meta="Developer"
      />
      <Card
        fluid
        image={isabel}
        header="Isabel Mitre"
        meta="Developer"
      />
      <Card
        fluid
        image={placeholder}
        header="Gabriel Rodriguez Torres"
        meta="Developer"
      />
      <Card
        fluid
        image={juan}
        header="Juan Suhr"
        meta="Developer"
      />
      <Card
        fluid
        image={mariana}
        header="Mariana Torres Torres"
        meta="Developer"
      />
    </>
  );
}

export default DevTeamCards;
