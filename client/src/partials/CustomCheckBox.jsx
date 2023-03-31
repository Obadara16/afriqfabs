
import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { colors } from "../data";

export default function CustomCheckBox() {
    
    const [selectedColor, setSelectedColor] = useState([colors[1]]);

    const oncolorChange = (e) => {
        let _selectedColor = [...selectedColor];

        if (e.checked)
            _selectedColor.push(e.value);
        else
            _selectedColor = _selectedColor.filter(color => color.id !== e.value.id);

        setSelectedColor(_selectedColor);
    };

    return (
        <div className="card flex justify-content-center">
            <div className="flex flex-col gap-3 px-5 py-6 ">
                {colors.map((color) => {
                    return (
                        <div key={color.id} className="flex align-items-center">
                            <Checkbox inputId={color.key} name="color" value={color} onChange={oncolorChange} checked={selectedColor.some((item) => item.id === color.id)} className="text-white bg-white" />
                            <label htmlFor={color.key} className="ml-2 capitalize">
                                {color.name}
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
        