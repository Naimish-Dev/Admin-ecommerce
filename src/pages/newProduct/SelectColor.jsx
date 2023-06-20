import React, {  useState } from "react";



const SelectColor = ({ parentcom,   }) => {
  const [color, setcolor] = useState("");
  const [colors, setcolors] = useState([]);

  const colorpicker = (e) => {
    setcolor(e.target.value);
  };
  const removecolorhendler = (e) => {
    const remaincolor = colors.filter((val) => val !== e);
    setcolors(remaincolor);
  };

  const setvalueinbox = (e) => {
    e.preventDefault();
    if (color) {
      setcolors((pre) => {
        return [...pre, color];
      });
      parentcom([...colors,color]);
    
    } else {
      alert("please select color");
    }
  };
  return (
    <div className="colors">
      <label className="colorstore">
        <ul className="ulcolor">
          {colors?.map((val, index) => {
            return (
              <li
                key={index}
                className="colorbox"
                onClick={() => removecolorhendler(val)}
                style={{ backgroundColor: val }}
              >
                🗙
              </li>
            );
          })}
        </ul>
      </label>
      <div className="button-color">
        <input
          className="coloselect"
          type="color"
          onBlur={colorpicker}
/>
        <button className="addbtn" onClick={setvalueinbox}>
          Select
        </button>
      </div>
    </div>
  );
};

export default SelectColor;
