import React from "react";
import { Card } from "semantic-ui-react";

import alejandro from "../assets/images/team/2019-2020/alejandro.jpg";
import cesar from "../assets/images/team/2019-2020/cesar.jpg";
import david from "../assets/images/team/2019-2020/david.jpg";
import diego from "../assets/images/team/2019-2020/diego.jpg";
import eduardo from "../assets/images/team/2019-2020/eduardo.jpg";
import isabel from "../assets/images/team/2019-2020/isabel.jpg";
import juan from "../assets/images/team/2019-2020/juan.jpg";
import mariana from "../assets/images/team/2019-2020/mariana.jpg";
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
