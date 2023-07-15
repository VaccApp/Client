import ReactDatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.module.css";

export default function DatePicker() {
  const [date, setDate] = useState(Date.now());
  console.log(date);
}
