import React from 'react';

import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid/index';
import Button from "@mui/material/Button/index";

const StepFive = props => {

  const onNextButtonClick = () => {
    props.onStepFiveFinish()
  };

  return (
    <Grid align="center" container spacing={2}>
      <Grid item xs={12}>
        <Typography>
          <h3>Vaša prijava je uspješno poslana</h3>
        </Typography>
      </Grid>
      <Grid item xs={12}>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onNextButtonClick}>Zatvori</Button>
      </Grid>
    </Grid>
  );
};

export default StepFive;