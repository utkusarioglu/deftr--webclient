import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const CopyrightView = () => {
  const classes = useStyles();
  return (
    <Grid
      {...{
        container: true,
        justify: 'center',
      }}
    >
      <Typography
        {...{
          className: classes.container,
          variant: 'body2',
          color: 'textSecondary',
          align: 'center',
          noWrap: true,
        }}
      >
        {'Copyright © '}
        <Link color="inherit" href="http://www.utkusarioglu.com">
          Utku Sarioglu
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    bottom: theme.spacing(1),
  },
}));

export default CopyrightView;
