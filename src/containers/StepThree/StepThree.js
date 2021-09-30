import React, {useState} from 'react';

import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const StepThree = props => {

  const [data, setData] = useState({
    nameAndSurname: {
      value: props.data.nameAndSurname,
      showError: false
    },
    email: {
      value: props.data.email,
      showError: false
    },
    telephoneNumber: {
      value: props.data.telephoneNumber,
      showError: false
    },
    note: {
      value: props.data.note,
      showError: false
    }
  });

  const onInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: {
        value: e.target.value,
        showError: false
      }
    })
  };

  const onNextButtonClick = () => {
    let valid = true;
    const newData = {...data};
    if (data.nameAndSurname.value === "") {
      newData.nameAndSurname.showError = true;
      valid = false;
    }
    if (data.email.value === "") {
      newData.email.showError = true;
      valid = false;
    }
    if (data.telephoneNumber.value === "") {
      newData.telephoneNumber.showError = true;
      valid = false;
    }
    setData(newData);
    if (valid) {
      props.onStepThreeSubmit({
        nameAndSurname: data.nameAndSurname.value,
        email: data.email.value,
        telephoneNumber: data.telephoneNumber.value,
        note: data.note.value
      })
    }
  };

  const onBackButtonClick = () => {
    props.onBackButtonClick()
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>
          <h3>Korak 3. Vaši kontakt podaci</h3>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid align={"center"} container spacing={2}>
          <Grid item xs={6}>
            <TextField error={data.nameAndSurname.showError}
                       helperText={data.nameAndSurname.showError ? "Podatak je obavezan!." : ""}
                       value={data.nameAndSurname.value}
                       name="nameAndSurname"
                       onChange={onInputChange}
                       label="Ime i prezime*"
                       variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField error={data.email.showError}
                       helperText={data.email.showError ? "Podatak je obavezan!." : ""}
                       value={data.email.value}
                       name="email"
                       onChange={onInputChange}
                       label="Email adresa*"
                       variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField error={data.telephoneNumber.showError}
                       helperText={data.telephoneNumber.showError ? "Podatak je obavezan!" : ""}
                       value={data.telephoneNumber.value}
                       name="telephoneNumber"
                       onChange={onInputChange}
                       label="Broj telefona*"
                       variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField value={data.note.value}
                       name="note"
                       onChange={onInputChange}
                       multiline rows={4}
                       label="Napomena (opcionalno)"
            />
          </Grid>
        </Grid>
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