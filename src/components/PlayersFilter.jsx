import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../hooks/useHttp";
import Spinner from "./Spinner";
import { activeFilterChanged, fetchFilters } from "../slices/filters-slice";
const PlayersFilter = () => {
  const { filters, filtersLoadingStatus, activeFilter } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFilters())
  }, []);

  const renderFetchingStatus = () => {
    if (filtersLoadingStatus === "loading") {
    return <Spinner classNames={"h-8 w-8 mx-auto mt-6 text-white"} />;
  } else if (filtersLoadingStatus === "error") {
    return <span className="text-red-500">Something went wrong</span>;
  }

  }

  const renderFilters = () => {
    if(!filters.length){
      return <span className="text-red-500">Filters not Found</span>;
    }

    return filters.map(({label, classes, id}) => (
        <button onClick={() => dispatch(activeFilterChanged(label))}  key={id} className={`px-4 py-2 !cursor-pointer ${classes} ${activeFilter === label && "font-bold !text-red-500"} hover:opacity-90 transition-all`}>
          {label}
        </button>
    ))
  }
  return (
    <div className="px-4 py-6 bg-white/10 rounded-md shadow-lg bg-gradient-to-b from-cyan-200 to-transparent mt-4">
      <h1 className="text-xl font-bold">Filter player by continent</h1>
      {renderFetchingStatus()}
      <div className="flex mt-2">
        {renderFilters()}
      </div>
    </div>
  );
};

export default PlayersFilter;
