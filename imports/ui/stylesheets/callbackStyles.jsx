export const callbackStyles = theme => ({
  btnwrapper: {
    margin: '24px 0',
    position: 'relative',
    width: 'fit-content',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
});
