import React, {useState} from 'react';

import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";

const StepOne = props => {

  const cars = ["Peugeot", "Volkswagen", "Citroen", "Audi", "Bmw", "Seat", "Alfa Romeo", "Kia", "Hyundai", "Honda", "Toyota"];

  const [selectedCarMake, setSelectedCarMake] = useState({
    value: props.data.carMake,
    showError: props.data.carMake === "" ? true : false
  });

  const onCarMakeChange = (e) => {
    setSelectedCarMake({
      value: e.target.value,
      showError: false
    });

  };

  const onNextButtonClick = () => {
    let valid = true;
    if (selectedCarMake.value === "") {
      setSelectedCarMake({
        value: selectedCarMake.value,
        showError: true
      });
      valid = false;
    }
    if (valid) {
      props.onStepOneSubmit({carMake: selectedCarMake.value})
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>
          <h3>Korak 1. Odaberite proizvođača vašeg vozila</h3>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <RadioGroup value={selectedCarMake.value} row>
            <Grid container spacing={2}>
              {cars.map(car => (
                <Grid item xs={2}>
                  <FormControlLabel onChange={onCarMakeChange} value={car} control={<Radio/>} label={car}/>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </Typography>
        <hr/>
      </Grid>
      <Grid align={"right"} item xs={12}>
        <Button disabled={selectedCarMake.showError} variant="contained" onClick={onNextButtonClick}>Dalje</Button>
      </Grid>
    </Grid>
  );
};

export default StepOne;