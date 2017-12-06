import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";



class TicketList extends React.Component {
  render() {

    return(
      <div>
        {this.props.ticketList.map((ticket,index) =>

          <Ticket
            location={ticket.location}
            names={ticket.names}
            issue={ticket.issue}
            timeSinceOpened={ticket.timeSinceOpened}
            key={index}/>

        )}

      </div>
    );

  }

}

TicketList.propTypes = {
  ticketList: PropTypes.array
}

export default TicketList;
