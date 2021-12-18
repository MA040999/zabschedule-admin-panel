import React from "react";
import Select from "react-select";

function CustomSelect({
  placeholder,
  options,
  isMulti,
  defaultValue,
  onChange,
  controlShouldRenderValue,
}) {
  return (
    <Select
      menuPortalTarget={document.body}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      placeholder={placeholder}
      options={options}
      noOptionsMessage={() => "No record available"}
      onChange={onChange}
      isMulti={isMulti}
      defaultValue={defaultValue}
      className="search-select"
      controlShouldRenderValue={controlShouldRenderValue}
    />
  );
}

export default CustomSelect;
