import React, {useState, useEffect} from 'react';

import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography";

import classes from "./StepTwo.module.css";



const StepTwo = props => {

  const [services, setServices] = useState([
    {
      service: "Zamjena ulja i filtera",
      price: 500,
      checked: false,
    },
    {
      service: "Promjena pakni",
      price: 450,
      checked: false,
    },
    {
      service: "Promjena guma",
      price: 100,
      checked: false
    },
    {
      service: "Servis klima uređaja",
      price: 299,
      checked: false
    },
    {
      service: "Balansiranje guma",
      price: 50,
      checked: false
    },
    {
      service: "Zamjena ulja u kočnicama",
      price: 229,
      checked: false
    }
  ]);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [showCouponLink, setShowCouponLink] = useState(true);
  const [coupon, setCoupon] = useState("");
  const [couponValid, setCouponValid] = useState(props.data.couponValid);
  const [showCouponError, setShowCouponError] = useState(false);
  const [totalPrice, setTotalPrice] = useState(props.data.totalPrice);
  const [totalPriceWithNoDiscount, setTotalPriceWithNoDiscount] = useState(props.data.totalPriceWithNoDiscount);
  const [discount, setDiscount] = useState(props.data.discount);

  useEffect(() => {
    const newServices = [...services];
    newServices.map(s => {
      if (props.data.selectedServices.filter(ss => ss.service === s.service).length > 0) {
        s.checked = true;
      }
    });
    setServices(newServices);
    setTotalPrice(props.data.totalPrice);
  }, []);

  useEffect(() => {
    calculatePrice(services);
  }, [services, couponValid]);

  const onNextButtonClick = () => {
    props.onStepTwoSubmit({
      selectedServices: services.filter(s => s.checked),
      totalPrice: totalPrice,
      totalPriceWithNoDiscount: totalPriceWithNoDiscount,
      discount: discount,
      couponValid: couponValid
    });
  };

  const onBackButtonClick = () => {
    props.onBackButtonClick()
  };

  const onCheckboxChange = (index) => {
    const newServices = [...services];
    newServices[index].checked = !newServices[index].checked;
    setServices(newServices);
    calculatePrice(newServices)
  };

  const calculatePrice = (services) => {
    let discount = 0;
    let totalPriceWithNoDiscount = 0;
    let totalPrice = 0;
    services.map(s => {
      if (s.checked) {
        totalPriceWithNoDiscount = totalPriceWithNoDiscount + s.price
      }
    });
    if (couponValid) {
      discount = 0.3 * totalPriceWithNoDiscount;
      totalPrice = totalPriceWithNoDiscount - discount;
    } else {
      totalPrice = totalPriceWithNoDiscount;
    }
    setTotalPriceWithNoDiscount(totalPriceWithNoDiscount);
    setTotalPrice(totalPrice);
    setDiscount(discount);
  };

  const onCouponInputChange = (e) => {
    setCoupon(e.target.value)
  };

  const onCouponSubmit = () => {
    if (coupon === "Tokić123") {
      setCouponValid(true);
      setShowCouponInput(false);
      setShowCouponError(false);
      calculatePrice(services)
    } else {
      setShowCouponError(true);
    }
  };

  const onCouponLinkClick = () => {
    setShowCouponInput(true);
    setShowCouponLink(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>
          <h3>Korak 2. Odaberite jednu ili više usluga za koje ste</h3>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormGroup>
          <Typography>
            <Grid container spacing={2}>
              {services.map((s, index) => (
                <Grid item xs={4}>
                  <FormControlLabel control={<Checkbox value={s} onChange={() => onCheckboxChange(index)} checked={s.checked}/>} label={s.service + " (" + s.price + " kn)"}/>
                </Grid>
              ))}
            </Grid>
          </Typography>
        </FormGroup>
      </Grid>
      <Grid align={"right"} item xs={12}>
        {showCouponLink && !couponValid && <Typography color={"primary"} className={classes["coupon-link"]} onClick={onCouponLinkClick}>Imam Kupon</Typography>}
        {
          showCouponInput
          &&
          <>
            <Grid container spacing={0}>
              <Grid item xs={10}>
                <TextField value={coupon} onChange={onCouponInputChange} label="Unesite kupon" variant="outlined"/>
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" onClick={onCouponSubmit}>Primjeni</Button><br/>
              </Grid>
            </Grid>
          </>
        }
        {couponValid && <Typography>Hvala vam, unjeli ste ispravan kod kupona</Typography>}
        {showCouponError && <Typography>Unjeli ste neispravan kod kupona</Typography>}
      </Grid>
      <Grid align={"right"} item xs={12}>
        <Grid container spacing={0}>
          {
            couponValid &&
            <>
              <Grid item xs={12}>
                <Typography>
                  <h4>OSNOVICA: {totalPriceWithNoDiscount} KN</h4>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <h4>Popust(30%): -{discount} KN</h4>
                </Typography>
              </Grid>
            </>
          }
          <Grid item xs={12}>
            <Typography>
              <h2>UKUPNO: {totalPrice} KN</h2>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <hr/>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid align={"right"} item xs={10}>
            <Button variant="contained" onClick={onBackButtonClick}>Nazad</Button>
          </Grid>
          <Grid item xs={2}>
            <Button disabled={totalPrice === 0} variant="contained" onClick={onNextButtonClick}>Dalje</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StepTwo;