import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import { useSelector, useDispatch } from "react-redux";
import { setCountries } from "../../redux/CheckoutReducers/countries";
import { setCountry } from "../../redux/CheckoutReducers/country";
import { setSubdivisions } from "../../redux/CheckoutReducers/subdivisions";
import { setSubdivision } from "../../redux/CheckoutReducers/subdivision";
import { setOptions } from "../../redux/CheckoutReducers/options";
import { setOption } from "../../redux/CheckoutReducers/option";

const Shipping = ({ next }) => {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.countries);
  const { country } = useSelector((state) => state.country);
  const { subdivisions } = useSelector((state) => state.subdivisions);
  const { subdivision } = useSelector((state) => state.subdivision);
  const { options } = useSelector((state) => state.options);
  const { option } = useSelector((state) => state.option);

  const [wait, setWait] = useState("");

  const methods = useForm();

  const { checkoutToken } = useSelector((state) => state.checkoutToken);

  const fetchCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    dispatch(setCountries(countries));
    dispatch(setCountry(Object.keys(countries)[0]));
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

  const coun_tries = Object.entries(countries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const sub_divisions = Object.entries(subdivisions).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const opt_ions = options.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
  }));

  useEffect(() => {
    const token = async () => {
      let ch = await checkoutToken;
      !ch ? setWait("Loading...") : fetchCountries(ch.id);
    };
    token();
  }, [checkoutToken]);

  useEffect(() => {
    if (country) fetchSubdivisions(country);
  }, [country]);

  useEffect(() => {
    const token = async () => {
      let ch = await checkoutToken;
      if (subdivision) fetchOptions(ch.id, country, subdivision);
    };
    token();
  }, [subdivision]);

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({ ...data, country, subdivision, option })
          )}
          action=""
          method="get"
          className="grid sm:grid-cols-2 justify-items-center gap-8 p-5 mt-4 justify-center"
        >
          <CustomTextField
            required
            name="firstName"
            label="first name"
            placeholder="Fisrt name *"
          />
          <CustomTextField
            required
            name="lastName"
            label="last name"
            placeholder="Last name *"
          />
          <CustomTextField
            required
            name="street"
            label="address"
            placeholder="Address *"
          />
          <CustomTextField
            required
            name="email"
            label="email"
            placeholder="Email *"
          />
          <CustomTextField
            required
            name="city"
            label="city"
            placeholder="City *"
          />
          <CustomTextField
            required
            name="zip"
            label="zip"
            placeholder="ZIP / Postal code *"
          />
          {!country ? (
            <div className="flex gap-5 w-full p-5">
              <svg
                aria-hidden="true"
                className="w-6 h-6 animate-spin text-slate-300 fill-blue-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <h3>Countries...</h3>
            </div>
          ) : (
            <select
              required
              title="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              name="country"
              className="dark:bg-slate-700 bg-gray-100 border-b border-gray-600 dark:border-slate-300 w-48 md:w-[20rem] py-4 outline-none"
            >
              {coun_tries.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          )}

          {!subdivision ? (
            <div className="flex gap-5 w-full p-5">
              <svg
                aria-hidden="true"
                className="w-6 h-6 animate-spin text-slate-300 fill-blue-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <h3>Subdivisions...</h3>
            </div>
          ) : (
            <select
              required
              title="subdivision"
              value={subdivision}
              onChange={(e) => setSubdivision(e.target.value)}
              name="subdivision"
              className="dark:bg-slate-700 bg-gray-100 border-b border-gray-600 dark:border-slate-300 w-48 md:w-[20rem] py-4 outline-none"
            >
              {sub_divisions.map((s) => (
                <option value={s.id} key={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          )}

          {!option ? (
            <div className="flex gap-5 w-full p-5">
              <svg
                aria-hidden="true"
                className="w-6 h-6 animate-spin text-slate-300 fill-blue-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <h3>Shipping options...</h3>
            </div>
          ) : (
            <select
              required
              title="shipping options"
              value={option}
              onChange={(e) => setOption(e.target.value)}
              name="option"
              className="dark:bg-slate-700 bg-gray-100 border-b border-gray-600 dark:border-slate-300 w-48 md:w-[20rem] py-4 outline-none"
            >
              {opt_ions.map((o) => (
                <option value={o.id} key={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          )}
          <br />
          <div className="sm:col-span-2 gap-4 md:gap-0 sm:space-x-40 md:space-x-80 lg:space-x-96 flex justify-between items-center flex-col sm:flex-row text-white font-semibold">
            <Link to="/cart">
              <button className="rounded-md bg-slate-300 text-gray-500 dark:text-gray-300 hover:bg-slate-400 dark:hover:text-white dark:hover:bg-slate-800 hover:text-white dark:bg-slate-600 w-[10rem] h-10">
                Back to cart
              </button>
            </Link>
            <button
              type="submit"
              className="rounded-md bg-blue-500 w-[10rem] h-10 hover:bg-blue-700 cursor-pointer"
              disabled={!option}
            >
              Next
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Shipping;
