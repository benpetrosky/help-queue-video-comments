import React from "react";
import Ticket from "../models/ticket.js"
import PropTypes from "prop-types";


class NewTicketForm extends React.Component {
  constructor(props){
    super(props);
    this.handleNewTicketFormSubmission = this.handleNewTicketFormSubmission.bind(this);
  }
  handleNewTicketFormSubmission(event){
    event.preventDefault();
    const {_names, _location, _issue} = this.refs;
    var newTicket = new Ticket(_names.value, _location.value, _issue.value);
    console.log(newTicket)
    this.props.onNewTicketCreation(newTicket);
    this.props.hideFormAfterSubmission();

  }
  render(){
    return(
      <form onSubmit={this.handleNewTicketFormSubmission}>
        <input
            type="text"
            id="names"
            placeholder="Pair Names"
            ref="_names">
        </input>
        <input
            type="text"
            id="location"
            placeholder="Location"
            ref="_location">
        </input>
        <textarea
            type="text"
            id="issue"
            placeholder="Describe your issue"
            ref="_issue">
        </textarea>
        <button type="submit">Send</button>
      </form>
    );
  }
}
NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func,
  hideFormAfterSubmission: PropTypes.func
}

export default NewTicketForm;
