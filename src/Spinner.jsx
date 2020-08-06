import React from "react";

import { Loader, Dimmer } from "semantic-ui-react";

// Dimmer provides a dark background to the Loader

const Spinner = () => (
  <Dimmer active>
    <Loader size="medium" content={"Preparing Chat..."} />
  </Dimmer>
);

export default Spinner;
