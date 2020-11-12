import React, { FC, useState, FormEvent, useRef } from "react";
import "./Spinner.css";

export const Spinner: FC<{}> = () => {
  return (
    <div className="Spinner">
      <div className="Spinner__circle"></div>
    </div>
  )
}
