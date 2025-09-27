import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useHttp } from "../hooks/useHttp";
import { playersCreated } from "../slices/players-slice";
const PlayersAddForm = () => {
  const { filters, filtersLoadingStatus } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const { request } = useHttp();
  const onSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const country = event.target.country.value;
    const continent = event.target.continent.value;
    const data = {
      id: uuidv4(),
      name,
      country,
      continent,
    };
    request("http://localhost:3000/players", "POST", JSON.stringify(data))
      .then((res) => console.log(res, "Succsesfully created"))
      .then(dispatch(playersCreated(data)))
      .catch((err) => console.log(err.message));
  };

  const renderOptions = () => {
    if (filtersLoadingStatus === "loading") {
      return <span>Loading...</span>;
    } else if (filtersLoadingStatus === "error") {
      return <option className="text-red-500">Not found options</option>
    }
    if (filters && filters.length > 0) {
      return filters.map((item) => {
        if (item.id === "all") return;

        return (
          <option key={item.id} value={item.label}>
            {item.label}
          </option>
        );
      });
    }
  };
  return (
    <div className="px-4 py-6 bg-white/10 rounded-md shadow-lg bg-gradient-to-t from-cyan-200 to-transparent">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col space-y-2">
          <div>
            <label htmlFor="name" className="text-2xl">
              New Football Player
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Cristiano Ronaldo "
              className="border bg-white block w-full py-2 px-4 rounded-md mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="text-2xl">
              Country
            </label>
            <input
              type="text"
              id="country"
              placeholder="Portugal"
              name="country"
              className="border bg-white block w-full py-2 px-4 rounded-md mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="continent" className="text-2xl">
              Select PLayer Continent
            </label>
            <select
              id="continent"
              className="border bg-white block w-full py-2 px-4 rounded-md mt-1"
              name="continent"
              required
            >
              {renderOptions()}
            </select>
          </div>
          <button
            className="py-2 px-4 bg-blue-500 w-fit cursor-pointer rounded-md ml-auto bg-gradient-to-r from-blue-500 to-blue-950 text-white
            hover:scale-105 transition-all font-medium"
            type="submit"
          >
            Add Player
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlayersAddForm;
