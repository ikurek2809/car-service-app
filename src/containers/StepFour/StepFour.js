import React from 'react';

import Grid from '@mui/material/Grid';
import steps from "../../constants/steps";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


const StepThree = props => {

  const onNextButtonClick = () => {
    props.onStepFourSubmit()
  };

  const onBackButtonClick = () => {
    props.onBackButtonClick()
  };

  const onEditButtonClick = (step) => {
    props.onEditButtonClick(step)
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>
          <h3>Korak 4. Pregled i potvrda vašeg odabira</h3>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          Molimo vas da još jednom pregledate i potvrdite unesene podatke. Ukoliko želite promijeniti neki od podataka, možete pritisnuti
          gumb za uređivanje pored svake od kategorija. Kada ste provjerili i potvdrili ispravnost svojih podataka pritisnite gumb pošalji na dnu,
          za slanje upita za servis.
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2} justify="center">
              <Grid style={{paddingTop: "0px"}} item xs={8}>
                <Typography>
                  <h2>MODEL VOZILA</h2>
                </Typography>
              </Grid>
              <Grid item xs={4} justify={"center"}>
                <Button onClick={() => onEditButtonClick(steps.STEP_ONE)} variant="contained">Uredi</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography>{props.stepOneData.carMake}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Grid container spacing={2} justify="center">
              <Grid style={{paddingTop: "0px"}} item xs={8}>
                <Typography>
                  <h2>ODABRANE USLUGE</h2>
                </Typography>
              </Grid>
              <Grid item xs={4} justify={"center"}>
                <Button onClick={() => onEditButtonClick(steps.STEP_TWO)} variant="contained">Uredi</Button>
              </Grid>
            </Grid>
          </Grid>
          {props.stepTwoData.selectedServices.map(ss => (
            <>
              <Grid item xs={6}>
                <Typography>{ss.service}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{ss.price} KN</Typography>
              </Grid>
            </>
          ))}
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={6}>
            {props.stepTwoData.couponValid && <Typography>{props.stepTwoData.discount} KN - Popust (30%)</Typography>}
            <Typography>{props.stepTwoData.totalPrice} KN - UKUPNO</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <hr/>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justify="center">
              <Grid style={{paddingTop: "0px"}} item xs={4}>
                <Typography>
                  <h2>KONTAKT PODACI</h2>
                </Typography>
              </Grid>
              <Grid item xs={8} justify={"center"}>
                <Button onClick={() => onEditButtonClick(steps.STEP_THREE)} variant="contained">Uredi</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>Ime i prezime:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{props.stepThreeData.nameAndSurname}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Broj telefona:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{props.stepThreeData.telephoneNumber}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>Email:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{props.stepThreeData.email}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Napomena:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{props.stepThreeData.note}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <hr/>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid align={"right"} item xs={10}>
            <Button variant="contained" onClick={onBackButtonClick}>Nazad</Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={onNextButtonClick}>Dalje</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StepThree;