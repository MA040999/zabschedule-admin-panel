import React from "react";
import Select from "react-select";

function CustomSelect({
  placeholder,
  options,
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
      onChange={onChange}
      defaultValue={defaultValue}
      className="search-select"
      controlShouldRenderValue={controlShouldRenderValue}
    />
  );
}

export default CustomSelect;
