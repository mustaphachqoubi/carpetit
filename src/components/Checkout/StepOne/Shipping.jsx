import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import CustomTextField from "../CustomTextField";
import { Link } from "react-router-dom";
import { commerce } from "../../../lib/commerce";
import { useSelector, useDispatch } from "react-redux";
import { setCountries } from "../../../redux/CheckoutReducers/countries";
import { setCountry } from "../../../redux/CheckoutReducers/country";
import { setSubdivisions } from "../../../redux/CheckoutReducers/subdivisions";
import { setSubdivision } from "../../../redux/CheckoutReducers/subdivision";
import { setOptions } from "../../../redux/CheckoutReducers/options";
import { setOption } from "../../../redux/CheckoutReducers/option";

import ShippingX from "./ShippingX";

const Shipping = ({ next, CheckShippingOption }) => {
  const dispatch = useDispatch();
  const { c_ountries } = useSelector((state) => state.c_ountries);
  const { country } = useSelector((state) => state.country);
  const { s_ubdivisions } = useSelector((state) => state.s_ubdivisions);
  const { subdivision } = useSelector((state) => state.subdivision);
  const { o_ptions } = useSelector((state) => state.o_ptions);
  const { option } = useSelector((state) => state.option);
  const { checkoutToken } = useSelector((state) => state.checkoutToken);
  const [selectedCountry, setSelectedCountry] = useState(
    Object.keys(c_ountries)[0]
  );

  const methods = useForm();

  const fetchCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    dispatch(setCountries(countries));
    if (!selectedCountry) {
      setSelectedCountry(Object.keys(countries)[0]);
      dispatch(setCountry(Object.keys(countries)[0]));
    }
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    dispatch(setSubdivisions(subdivisions));
    dispatch(setSubdivision(Object.keys(subdivisions)[0]));
  };

  const fetchOptions = async (checkoutTokenId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );
    dispatch(setOptions(options));
    dispatch(setOption(options[0].id));
  };

  const coun_tries = Object.entries(c_ountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const sub_divisions = Object.entries(s_ubdivisions).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const opt_ions = o_ptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
  }));

  useEffect(() => {
    checkoutToken && fetchCountries(checkoutToken.id);
  }, [checkoutToken]);

  useEffect(() => {
    if (selectedCountry) {
      fetchSubdivisions(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (subdivision && selectedCountry) {
      fetchOptions(checkoutToken.id, selectedCountry, subdivision);
    }
  }, [subdivision, selectedCountry]);

  return (
    <ShippingX
      next={next}
      CheckShippingOption={CheckShippingOption}
      country={country}
      option={option}
      methods={methods}
      coun_tries={coun_tries}
      sub_divisions={sub_divisions}
      opt_ions={opt_ions}
      subdivision={subdivision}
      CustomTextField={CustomTextField}
      selectedCountry={selectedCountry}
      setSelectedCountry={setSelectedCountry}
      dispatch={dispatch}
      setCountry={setCountry}
      setSubdivision={setSubdivision}
      setOption={setOption}
      Link={Link}
      checkoutToken={checkoutToken}
      FormProvider={FormProvider}
    />
  );
};

export default Shipping;
