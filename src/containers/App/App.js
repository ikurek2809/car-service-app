import React, {useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import CancelIcon from '@mui/icons-material/Cancel';

import logo from "../../images/logo.png"
import steps from "../../constants/steps";
import StepOne from "../StepOne/StepOne";
import StepTwo from "../StepTwo/StepTwo";
import StepThree from "../StepThree/StepThree";
import StepFour from "../StepFour/StepFour";
import StepFive from "../StepFive/StepFive";

import classes from "./App.module.css";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 950,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const App = () => {

  const [openModal, setOpenModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(steps.STEP_ONE);

  const [stepOneData, setStepOneData] = useState({
    carMake: ""
  });

  const [stepTwoData, setStepTwoData] = useState({
    selectedServices: [],
    totalPrice: 0,
    totalPriceWithNoDiscount: 0,
    discount: 0,
    couponValid: false
  });

  const [stepThreeData, setStepThreeData] = useState({
    nameAndSurname: "",
    email: "",
    telephoneNumber: "",
    note: ""
  });

  const onStartButtonClick = () => {
    setOpenModal(true);
    setCurrentStep(steps.STEP_ONE);
  };

  const onCloseModalClick = () => {
    setOpenModal(false)
  };

  const onStepOneSubmit = (data) => {
    setStepOneData(data);
    setCurrentStep(steps.STEP_TWO);
  };

  const onStepTwoSubmit = (data) => {
    setStepTwoData(data);
    setCurrentStep(steps.STEP_THREE);
  };

  const onStepThreeSubmit = (data) => {
    setStepThreeData(data);
    setCurrentStep(steps.STEP_FOUR);
  };

  const onStepFourSubmit = () => {
    setCurrentStep(steps.STEP_FIVE);
  };

  const onStepFiveFinish = () => {
    setOpenModal(false);
  };

  const onEditButtonClick = (step) => {
    setCurrentStep(step);
  };

  const onBackButtonClick = () => {
    if (currentStep === steps.STEP_TWO) {
      setCurrentStep(steps.STEP_ONE);
    }
    if (currentStep === steps.STEP_THREE) {
      setCurrentStep(steps.STEP_TWO);
    }
    if (currentStep === steps.STEP_FOUR) {
      setCurrentStep(steps.STEP_THREE);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid align="center" item xs={12}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography>
                  <h1>Konfigurator servisa</h1>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <h3>Izračunajte trošak servisa</h3>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <hr/>
      </Grid>
      <Grid item xs={12}>
        <Grid align="center" justify="center" container spacing={2}>
          <Grid item xs={12}>
            <Typography>Pritisnite gumb niže kako biste pokrenuli</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onStartButtonClick}>Pokreni konfigurator</Button>
            <Modal open={openModal}>
              <Box sx={style}>
                <Grid align="center" container spacing={2}>
                  <Grid item xs={12}>
                    <h1>Konfigurator servisa<CancelIcon fontSize={"large"} color={"primary"} onClick={onCloseModalClick} className={classes['close-button']}>X</CancelIcon></h1>
                  </Grid>
                </Grid>
                {currentStep === steps.STEP_ONE && <StepOne data={stepOneData}
                                                            onStepOneSubmit={onStepOneSubmit}
                                                            onBackButtonClick={onBackButtonClick}
                />}
                {currentStep === steps.STEP_TWO && <StepTwo data={stepTwoData}
                                                            onStepTwoSubmit={onStepTwoSubmit}
                                                            onBackButtonClick={onBackButtonClick}
                />}
                {currentStep === steps.STEP_THREE && <StepThree data={stepThreeData}
                                                                onStepThreeSubmit={onStepThreeSubmit}
                                                                onBackButtonClick={onBackButtonClick}
                />}
                {currentStep === steps.STEP_FOUR && <StepFour onEditButtonClick={onEditButtonClick}
                                                              stepOneData={stepOneData}
                                                              stepTwoData={stepTwoData}
                                                              stepThreeData={stepThreeData}
                                                              onStepFourSubmit={onStepFourSubmit}
                                                              onBackButtonClick={onBackButtonClick}
                />}
                {currentStep === steps.STEP_FIVE && <StepFive onStepFiveFinish={onStepFiveFinish}
                                                              onBackButtonClick={onBackButtonClick}
                />}
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;