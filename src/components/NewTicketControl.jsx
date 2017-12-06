import React from "react";
import NewTicketForm from "./NewTicketForm";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {Modal} from "react-bootstrap";

class NewTicketControl extends React.Component {
  constructor(props){
    super(props);
    this.state = {formModalIsShowing: false};
    this.showFormModal = this.showFormModal.bind(this);
    this.hideFormModal = this.hideFormModal.bind(this);
  }

  showFormModal(){
    this.setState({formModalIsShowing: true})
  }

  hideFormModal(){
    this.setState({formModalIsShowing: false})
  }
  render(){


    return(
      <div>
        <Button
          bsStyle="primary" bsSize="large" block="true" onClick={this.showFormModal}>Request help
        </Button>
        <Modal
          show={this.state.formModalIsShowing}
          onHide={this.hideFormModal}
          bsSize="large">
          <Modal.Title>Request Help</Modal.Title>
          <Modal.Body>
            <NewTicketForm
        onNewTicketCreation={this.props.onNewTicketCreation}
            hideFormAfterSubmission={this.hideFormModal} />
          </Modal.Body>
        </Modal>
      </div>
    );
  };
}

NewTicketControl.propTypes = {
  onNewTicketCreation: PropTypes.func
}


export default NewTicketControl;
