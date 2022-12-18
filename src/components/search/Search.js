import React, { useEffect, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import Dropdown from "../dropdown/Dropdown";
import List from "../dropdown/List";
import Select from "../dropdown/Select";
import Field from "../field/Field";
import Option from "../dropdown/Option";
import Label from "../label/Label";
import http from "../../config/axiosConfig";
import { useForm } from "react-hook-form";
import { useSearch } from "../../context/search-context";

const Search = ({ handleSearch, col = false }) => {
  const [cities, setCites] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardsName, setWardsName] = useState("");
  const { setSearch, search } = useSearch();

  const { handleSubmit, setValue, register } = useForm({
    mode: "onSubmit",
  });
  const fetchDistrict = async (cityId) => {
    const res = await http.get(`booking/locations/cities/${cityId}`);
    setDistricts(res?.data);
  };
  const fetchWard = async (districtId) => {
    const res = await http.get(`booking/locations/districts/${districtId}`);
    setWards(res?.data);
  };
  useEffect(() => {
    http.get(`booking/locations/cities`).then((res) => {
      setCites(res?.data);
    });
  }, []);
  useEffect(() => {
    setCityName(search.cityName);
    setDistrictName(search.districtName);
    setWardsName(search.wardName);
    if (search.cityId) {
      fetchDistrict(search.cityId);
    }
    if (search.districtId) {
      fetchWard(search.districtId);
    }
  }, []);
  const handleClickCity = async (city) => {
    setValue("city", city.id);
    setCityName(city.name);
    setDistrictName("");
    setSearch((prev) => {
      return {
        districtId: "",
        districtName: "",
        wardId: "",
        wardName: "",
        cityName: city.name,
        cityId: city.id,
      };
    });
    fetchDistrict(city.id);
  };
  const handleClickDistrict = async (district) => {
    setValue("district", district.id);
    setDistrictName(district.name);
    setSearch((prev) => {
      return {
        ...prev,
        districtName: district.name,
        districtId: district.id,
        wardId: "",
        wardName: "",
      };
    });
    fetchWard(district.id);
  };
  const handleClickWard = (wards) => {
    setWardsName(wards.name);
    setValue("wards", wards.id);
    setSearch((prev) => {
      return {
        ...prev,
        wardName: wards.name,
        wardId: wards.id,
      };
    });
  };
  const handleClearFilter = () => {
    setSearch({
      cityId: "",
      cityName: "",
      districtId: "",
      districtName: "",
      wardId: "",
      wardName: "",
    });
    setCityName("");
    setDistrictName("");
    setWardsName("");
    setValue("minPrice", "");
    setValue("maxPrice", "");
  };
  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      className={`grid gap-3 ${
        col ? "grid-rows-1 w-full" : "grid-cols-4 w-full"
      } `}
    >
      <Field>
        <Label name="city">City</Label>
        <Dropdown>
          <Select placeholder={cityName || "City"}></Select>
          <List>
            {cities.map((city) => (
              <Option key={city.id} onClick={() => handleClickCity(city)}>
                {city.name}
              </Option>
            ))}
          </List>
        </Dropdown>
      </Field>
      <Field>
        <Label name="district">District</Label>
        <Dropdown>
          <Select placeholder={districtName || "District"}></Select>
          <List>
            {districts.map((district) => (
              <Option
                key={district.id}
                onClick={() => handleClickDistrict(district)}
              >
                {district.name}
              </Option>
            ))}
          </List>
        </Dropdown>
      </Field>
      <Field>
        <Label name="ward">Ward</Label>
        <Dropdown>
          <Select placeholder={wardsName || "Wards"}></Select>
          <List>
            {wards.map((ward) => (
              <Option key={ward.id} onClick={() => handleClickWard(ward)}>
                {ward.name}
              </Option>
            ))}
          </List>
        </Dropdown>
      </Field>
      {col && (
        <div className="w-full">
          <Label>Price</Label>
          <div className="flex flex-row gap-5 mt-3">
            <input
              type="number"
              placeholder="min"
              name="minPrice"
              className="w-full py-2 px-3 rounded-md outline-none order bg-grayLight focus:border-primary bg-slate-100"
              {...register("minPrice", { required: true })}
            ></input>
            <input
              type="number"
              placeholder="max"
              name="maxPrice"
              className="w-full py-2 px-3 rounded-md outline-none order bg-grayLight focus:border-primary bg-slate-100"
              {...register("maxPrice", { required: true })}
            ></input>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-1 font-semibold items-center">
          <MdLocationPin />
          <span>Location</span>
          <span onClick={handleClearFilter} className="ml-auto cursor-pointer">
            Clear
          </span>
        </div>
        <button
          type="submit"
          className="px-5 py-2 rounded-full bg-primary text-white"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
