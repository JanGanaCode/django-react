import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import Leads from './Leads';

const Dashboard = ({ leads }) => {
  return (
    <Fragment>
      {leads.length === 5 && (
        <h4 style={{ textAlign: 'center' }}>
          <div className='badge badge-warning mt-4 pt-2 pr-3 pb-2 pl-3'>
            You have reached maximum leads limit. <br />
            To add a new lead, delete some of your previous leads first.
          </div>
        </h4>
      )}
      {leads.length < 5 && <Form />}
      <Leads />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  leads: state.leads.leads
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
