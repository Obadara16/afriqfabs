import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faCircleCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { resetMessages } from "../redux/userRedux";

const Alert = ({ color, data }) => {
  const textColor = `text-${color}`;
  const alertColor = `bg-transparent  border border-${color} text-${color}`;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    dispatch(resetMessages());
    setVisible(false);
  };

  return visible ? (
    <div className={`alert ${alertColor} rounded-md p-4`} role="alert" style={{ marginTop: 5 }}>
      <div className="flex justify-between">
        <div className="flex items-center">
          <span className="mx-2">
            <FontAwesomeIcon
              icon={color === "success" ? faCircleCheck : faCircleExclamation}
              color={color}
              className={`${textColor} pt-2`}
            />
          </span>
          <span className={`${textColor} font-normal  pt-1`}>{data}</span>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faTimes}
            color="black"
            type="button"
            aria-label="Close"
            size="xs"
            onClick={handleClose}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default Alert;
