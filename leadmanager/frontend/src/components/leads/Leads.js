import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getLeads, deleteLead } from '../../actions/leads';
import PropTypes from 'prop-types';

export class Leads extends Component {
  componentDidMount() {
    const { getLeads } = this.props;
    getLeads();
  }

  handleDeleteLead = id => {
    const { deleteLead } = this.props;
    deleteLead(id);
  };

  render() {
    const { leads } = this.props;

    return (
      <Fragment>
        <h2>Leads</h2>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.message}</td>
                <td>
                  <button
                    className='btn btn-danger btn-sm'
                    onClick={() => this.handleDeleteLead(lead.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

Leads.propTypes = {
  leads: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getLeads: PropTypes.func.isRequired,
  deleteLead: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  leads: state.leads.leads
});

export default connect(
  mapStateToProps,
  { getLeads, deleteLead }
)(Leads);
