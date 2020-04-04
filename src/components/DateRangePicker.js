import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { setStartDate, setEndDate } from "../actions/filters";

class DateRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().startOf("month"),
      endDate: moment().endOf("month"),
      focusedInput: null,
    };
  }
  onDatesChange = ({ startDate, endDate }) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
    // this.setState({ startDate, endDate });
  };
  render() {
    return (
      <DateRangePicker
        startDate={this.props.filters.startDate}
        startDateId="your_unique_start_date_id"
        endDate={this.props.filters.endDate}
        endDateId="your_unique_end_date_id"
        onDatesChange={this.onDatesChange}
        focusedInput={this.state.focusedInput}
        onFocusChange={(focusedInput) => this.setState({ focusedInput })}
        numberOfMonths={1}
        isOutsideRange={() => false}
        showClearDates={true}
      />
    );
  }
}

const mapStateToPros = (state) => ({ filters: state.filters });

export default connect(mapStateToPros)(DateRange);
