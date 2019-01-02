import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createHistory from 'history/createBrowserHistory';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import red from '@material-ui/core/colors/red';
import Callback from '../Callback';

const history = createHistory();

const styles = theme => ({
	paper: {
		padding: 18
	},
	btn: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
});

class FavoriteListItem extends Component {
	constructor(props){
		super(props);
		this.state = {
			dialog: false,
			selectedItem: '',
			checked: '',
      message: '',
			callback: false, //Is callback open?
			variant: false, //callback: False == error, true === success
		}
	}
	go = () => {
		history.push(`/my/favorites/${this.props.item._id}`)
		history.go()
	}
  callback = (message, err ) => {
		this.setState({
			message: message,
			callback: true,
			variant: err,
			loading: false,
		});
	}
	render(){
		const { classes, item } = this.props;

		return(
      <React.Fragment>
        <TableRow key={item._id}>
          <TableCell padding="checkbox">
            <Checkbox
              checked={item.private}
              onChange={() => this.props.onChecked(item)}
            />
          </TableCell>
          <TableCell onClick={this.go}>
            <a href={`/my/favorites/${item._id}`}>{item.name}</a>
          </TableCell>
          <TableCell>
            <Button
              variant="contained"
							className={classes.btn}
              onClick={() => this.props.openDialog(item)}
            >
							<DeleteIcon />
              Delete
            </Button>
          </TableCell>
        </TableRow>
      </React.Fragment>
		)
	}
}

FavoriteListItem.propTypes = {
	classes: PropTypes.object.isRequired,
	item: PropTypes.object.isRequired,
	openDialog: PropTypes.func,
	onChecked: PropTypes.func,
};

export default withStyles(styles)(FavoriteListItem);
