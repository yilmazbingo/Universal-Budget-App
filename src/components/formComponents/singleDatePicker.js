import React from "react";
import moment from "moment";
import Form from "./Form";

import { SingleDatePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

export default class DatePicker extends Form {
  //   state = { createdAt: moment(), focused: false };

  render() {
    return (
      <SingleDatePicker
        date={this.state.createdAt} // momentPropTypes.momentObj or null
        onDateChange={createdAt => this.setState({ createdAt })} // PropTypes.func.isRequired
        focused={this.state.focused} // PropTypes.bool
        onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
        id="your_unique_id" // PropTypes.string.isRequired,
        numberOfMonths={1}
        isOutsideRange={() => false}
      />
    );
  }
}
