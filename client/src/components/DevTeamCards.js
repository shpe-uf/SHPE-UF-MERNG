import React from "react";
import { Card } from "semantic-ui-react";

import cesar from "../assets/images/team/2019-2020/cesar.jpg";
import alejandro from "../assets/images/team/2019-2020/alejandro.jpeg";
import david from "../assets/images/team/2019-2020/david.jpeg";
import juan from "../assets/images/team/2019-2020/juan.jpeg";
import gabriel from "../assets/images/team/2019-2020/gabriel.jpeg";
import placeholder from "../assets/images/team/placeholder.png";


function DevTeamCards({ title }) {
  return (
    <>
      <Card
        fluid
        image={placeholder}
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
        meta="Full-Stack Developer"
      />
      <Card
        fluid
        image={placeholder}
        header="Diego Coviella"
        meta="Full-Stack Developer"
      />
      <Card
        fluid
        image={david}
        header="David Espantoso"
        meta="Full-Stack Developer"
      />
      <Card
        fluid
        image={placeholder}
        header="Sofia Harmon"
        meta="Full-Stack Developer"
      />
      <Card
        fluid
        image={placeholder}
        header="Isabel Mitre"
        meta="Full-Stack Developer"
      />
      <Card
        fluid
        image={gabriel}
        header="Gabriel Rodriguez Torres"
        meta="Full-Stack Developer"
      />
      <Card
        fluid
        image={juan}
        header="Juan Suhr"
        meta="Full-Stack Developer"
      />
      <Card
        fluid
        image={placeholder}
        header="Mariana Torres Torres"
        meta="Full-Stack Developer"
      />
    </>
  );
}

export default DevTeamCards;
