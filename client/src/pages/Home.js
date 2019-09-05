import React, { useContext } from "react";
import {
  Grid,
  Container,
  Image,
  Divider
} from "semantic-ui-react";
import { AuthContext } from "../context/auth";

import homePhoto1 from "../images/home-1.jpg";
import homePhoto2 from "../images/home-2.jpg";
import homePhoto3 from "../images/home-3.jpg";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Grid>
        <Grid.Row className="no-padding">
          <Grid.Column>
            <div className="masthead masthead-home">
              <div className="overlay-home">
                <Container>
                  <h1 className="masthead-title text-white">
                    Society of Hispanic Professional Engineers
                  </h1>
                  <h1 className="masthead-title">University of Florida</h1>
                </Container>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid>
        <Grid.Row className="no-padding">
          <Grid.Column>
            <div className="masthead masthead-quote">
              <Container>
                <h2 className="text-white">
                  Empowering the Hispanic community to realize its fullest
                  potential and to impact the world through STEM awareness,
                  access, support and development.
                </h2>
                <Divider />
                <i className="fas fa-quote fa-cogs"></i>
                <i className="fas fa-quote fa-drafting-compass"></i>
                <i className="fas fa-quote fa-code"></i>
              </Container>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid columns={2} stackable>
        <Grid.Row className="no-padding who">
          <Grid.Column width={6}>
            <Image src={homePhoto1} className="image-home"></Image>
          </Grid.Column>
          <Grid.Column width={10} className="text-home">
            <h1 className="text-white">Who are we?</h1>
            <p>
              The Society of Hispanic Professional Engineers Chapter at the
              University of Florida (SHPE UF) was formerly known as the Hispanic
              Engineering Society. It was founded in the fall of 1982 in an
              effort to provide Hispanic Engineers, Mathematicians, and
              Scientists with opportunities to develop as professionals while
              offering an amiable social environment.Since its inception it has
              prompted the recruitment, retention, and graduation of Hispanic
              students in the fields of science, technology, engineering, and
              mathematics. The society coordinates community outreach, corporate
              exposition meetings, academic development programs, and
              non-technical events. All this, to ensure SHPE UF members are
              presented with the opportunities necessary to succeed
              professionally, academically, and socially as Hispanic
              professionals.
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="no-padding mission">
          <Grid.Column width={6}>
            <Image src={homePhoto2} className="image-home"></Image>
          </Grid.Column>
          <Grid.Column width={10} className="text-home">
            <h1 className="text-white">Mission</h1>
            <p>
              SHPE changes lives by empowering the Hispanic community to realize
              its fullest potential and to impact the world through STEM
              awareness, access, support and development. SHPE's vision is a
              world where Hispanics are highly valued and influential as the
              leading innovators, scientists, mathematicians and engineers.
              Statement of Values: We are brought together by heritage, social
              responsibility and desire to improve the equality of all people
              through the use of science and technology. We value excellence in
              education, professional pursuits and leadership. We obtain
              excellence through integrity, empowerment, achievement, diversity
              and continuous improvement. Strategic Focus Areas: We will fulfill
              our mission by increasing educational opportunities, promoting
              professional and personal growth, carrying out our social
              responsibility to be involved in education, business, and
              government issues and enhancing pride within our organization and
              reinforcing our reputation as a vital Hispanic organization.
            </p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="no-padding vision">
          <Grid.Column width={6}>
            <Image src={homePhoto3} className="image-home"></Image>
          </Grid.Column>
          <Grid.Column width={10} className="text-home">
            <h1 className="text-white">Vision</h1>
            <p>
              SHPE's vision is a world where Hispanics are highly valued and
              influential as the leading innovators, scientists, mathematicians
              and engineers. We are brought together by heritage, social
              responsibility and desire to improve the equality of all people
              through the use of science and technology.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid>
        <Grid.Row className="no-padding">
          <Grid.Column>
            <div className="masthead masthead-quote">
              <Container>
                <h2 className="text-white">
                  "What I really hope for young people is that they find a
                  career they’re passionate about, something that’s challenging
                  and worthwhile."
                </h2>
                <Divider />
                <h2 className="text-white">Ellen Ochoa</h2>
                <h4 className="text-white">
                  Electrical Engineer & First Latina Astronaut
                </h4>
              </Container>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Home;