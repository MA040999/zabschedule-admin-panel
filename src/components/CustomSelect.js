import React from "react";
import Select from "react-select";

function CustomSelect({
  placeholder,
  options,
  isMulti,
  value,
  onChange,
  controlShouldRenderValue,
  isDisabled,
  isClearable,
  isSearchable,
}) {
  return (
    <Select
      menuPortalTarget={document.body}
      menuPosition={"fixed"}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      placeholder={placeholder}
      options={options}
      noOptionsMessage={() => "No record available"}
      onChange={onChange}
      isMulti={isMulti}
      value={value}
      className="search-select"
      controlShouldRenderValue={controlShouldRenderValue}
      isDisabled={isDisabled}
      isClearable={isClearable}
      isSearchable={isSearchable}
    />
  );
}

export default CustomSelect;
