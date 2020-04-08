import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, Link, useHistory, useLocation } from 'react-router-dom';
import PostersResultsList from '../PostersResultsList/PostersResultsList';
import PostersResultsDetail from '../PostersResultsDetail/PostersResultsDetail';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from '../SearchBar/SearchBar';
import { makeStyles, fade, CircularProgress } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import { MorressierPoster, MorressierEvent, SearchResultsResponseData } from '../../interfaces/app';


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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

//Hook to parse the query string.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const POSTERS_API_URL = "/events_manager/v3/posters/search";


const PostersResultsPage: React.FC = () => {
  let { path } = useRouteMatch();
  let queryParams = useQuery();
  let classes = useStyles();
  let history = useHistory();

  let [isLoading, setIsLoading] = useState(true);
  let [posters, setPosters] = useState<MorressierPoster[]>([]);
  let [events, setEvents] = useState<MorressierEvent[]>([]);

  const query = queryParams.get('query') || "";
  const offset = queryParams.get('offset') || 0;
  const limit = queryParams.get('limit') || 10;

  const handleSearch = (searchTerm: string) => {
    history.push(`/posters?query=${searchTerm}&offset=${offset}&limit=${limit}`);  
  }

  useEffect(() => {
    //Redirect to welcome page if we don't even provide a query term.
    if (!query) {
      history.push('/welcome');
    }

    setIsLoading(true);
    
    axios.get(`${POSTERS_API_URL}?query=${query}&offset=${offset}&limit=${limit}`)
      .then((response: AxiosResponse<SearchResultsResponseData>) => {
        setIsLoading(false);
        setPosters(response.data.posters);
        setEvents(response.data.events);
      })
  }, [query, offset, limit, history]);

  return (
    <div className={classes.root} data-testid="PostersResultsPage">
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/welcome" className={classes.link}>
              Morresier Search
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <SearchBar search={handleSearch} inNavBar={true} query={query} />
          </div>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path={path}>
          {isLoading ? (
            <CircularProgress />
          ) : (<PostersResultsList posters={posters} events={events} />)} 
        </Route>
        <Route path={`${path}/:posterId`}>
          <PostersResultsDetail />
        </Route>
      </Switch>
    </div>
  );
}

export default PostersResultsPage;
