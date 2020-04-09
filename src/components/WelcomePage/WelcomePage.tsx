import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { useHistory, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import CenteredComponent from '../CenteredComponent/CenteredComponent';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const WelcomePage: React.FC = () => {
  let history = useHistory();
  let classes = useStyles();

  const handleSearch = (searchTerm: string) => {
    history.push(`/posters?query=${searchTerm}`);
  }

  return  (
    <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/welcome" className={classes.link}>
              Morresier Search
            </Link>
          </Typography>
          </Toolbar>
        </AppBar>
        <CenteredComponent>
          <h2>Please introduce your search term..</h2>
          <SearchBar search={handleSearch} inNavBar={false} />
        </CenteredComponent>
    </div>
  )
}
export default WelcomePage;
