import React, { useState } from "react";
import { getAllCarList } from "../../store/customer-actions";

import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    fuelType: "",
    price: "",
    seats: "",
    tires: "",
  });
  const changeHandler = (e) => {
    let { name, id } = e.target;
    console.log(name, id);
    setFilter({ ...filter, [name]: id });
  };

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(getAllCarList(filter));
  };
  return (
    <>
      <div class="dropdown text-right mr-5">
        <button
          class="btn btn-secondary dropdown-toggle w-25"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          Filter
        </button>
        <div class="dropdown-menu w-25" aria-labelledby="dropdownMenuButton">
          <form onSubmit={searchHandler}>
            <fieldset class="form-group row ">
              <legend class="col-form-label col-sm-2 float-sm-left pt-0">
                FuelType
              </legend>
              <div class="col-sm-10">
                <div class="form-check">
                  <input
                    required
                    class="form-check-input"
                    type="radio"
                    name="fuelType"
                    id="petrol"
                    value="petrol"
                    onChange={changeHandler}
                  />
                  <label class="form-check-label" for="gridRadios1">
                    Petrol
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="fuelType"
                    id="diesel"
                    value="diesel"
                    onChange={changeHandler}
                  />
                  <label class="form-check-label" for="gridRadios2">
                    Diesel
                  </label>
                </div>
              </div>
            </fieldset>
            <fieldset class="form-group row ">
              <legend class="col-form-label col-sm-2 float-sm-left pt-0">
                Price
              </legend>
              <div class="col-sm-10">
                <div class="form-check">
                  <input
                    required
                    class="form-check-input"
                    type="radio"
                    name="price"
                    id="lte,50000"
                    value="50000"
                    onChange={changeHandler}
                  />
                  <label class="form-check-label" for="gridRadios2">
                    less than 50000
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="price"
                    id="gte,50000"
                    value="50000"
                    onChange={changeHandler}
                  />
                  <label class="form-check-label" for="gridRadios1">
                    greater than 50000
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="price"
                    id="gte,100000"
                    value="100000"
                    onChange={changeHandler}
                  />
                  <label class="form-check-label" for="gridRadios2">
                    greater than 100000
                  </label>
                </div>
              </div>
            </fieldset>
            <fieldset class="form-group row ">
              <legend class="col-form-label col-sm-2 float-sm-left pt-0">
                Seats
              </legend>
              <div class="col-sm-10">
                <div class="form-check">
                  <input
                    required
                    class="form-check-input"
                    type="radio"
                    name="seats"
                    id="lte,4"
                    value="4"
                    onChange={changeHandler}
                  />
                  <label class="form-check-label" for="gridRadios1">
                    Less Than 4
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="seats"
                    id="gte,4"
                    value="4"
                    onChange={changeHandler}
                  />
                  <label class="form-check-label" for="gridRadios2">
                    Greater than 4
                  </label>
                </div>
              </div>
            </fieldset>
            <fieldset class="form-group row ">
              <legend class="col-form-label col-sm-2 float-sm-left pt-0">
                Tyres
              </legend>
              <div class="col-sm-10">
                <div class="form-check">
                  <input
                    required
                    class="form-check-input"
                    type="radio"
                    name="tires"
                    id="offroad"
                    value="offroad"
                    onChange={changeHandler}
                  />
                  <label class="form-check-label" for="gridRadios1">
                    offroad
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="tires"
                    id="planroad"
                    value="planroad"
                    onChange={changeHandler}
                  />
                  <label class="form-check-label" for="gridRadios2">
                    planroad
                  </label>
                </div>
              </div>
            </fieldset>

            <div class="form-group row">
              <div class="col-sm-10">
                <button type="submit" class="btn btn-primary">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Filter;
