import React from "react";
import { Grid } from "semantic-ui-react";
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";

function AlumniMap({ alumnis }) {
  const Map = ReactMapboxGl({
    accessToken:
      ""
  });

  console.log(alumnis);

  return (
    <Map
      style="mapbox://styles/cecrigope/ck3516abl01rl1cnzijsw69hg"
      containerStyle={{
        height: "600px",
        width: "100%"
      }}
      center={[-110.5, 50.5]}
      zoom={[2.25]}
      pitch={[0]}
      bearing={[0]}
    >
      <Layer type="symbol" layout={{ "icon-image": "star-15" }}>
        {alumnis &&
          alumnis.map((alumni, index) => (
            <Popup
              key={index}
              coordinates={[
                alumni.coordinates.longitude,
                alumni.coordinates.latitude
              ]}
            >
              <h1>Popup</h1>
            </Popup>
          ))}
      </Layer>
    </Map>
  );
}

export default AlumniMap;
