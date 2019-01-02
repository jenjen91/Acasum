import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

class GridInputBtn extends Component {
	render(){
		const { left, right } = this.props;
		return(
      <Grid container spacing={8} alignItems="center">
        <Grid item xs={9}>
          {left}
        </Grid>
        <Grid item xs={3}>
          {right}
        </Grid>
      </Grid>
		)
	}
}

GridInputBtn.propTypes = {
  left: PropTypes.element,
  right: PropTypes.element,
}

export default GridInputBtn;
