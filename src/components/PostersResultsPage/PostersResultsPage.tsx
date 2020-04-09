import React, { useState, Fragment } from 'react';
import { Switch, Route, useRouteMatch, Link, useHistory } from 'react-router-dom';
import PostersResultsList from '../PostersResultsList/PostersResultsList';
import PostersResultsDetail from '../PostersResultsDetail/PostersResultsDetail';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from '../SearchBar/SearchBar';
import { makeStyles, fade, CircularProgress } from '@material-ui/core';
import { AxiosResponse } from 'axios';
import { axiosCache as axios } from '../../util/axiosCache';
import { 
  MorressierPoster, 
  MorressierEvent, 
  SearchResultsResponseData, 
  SinglePosterResponseData, 
  NumericalQueryParam
} from '../../interfaces/app';
import CenteredComponent from '../CenteredComponent/CenteredComponent';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
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


const POSTERS_API_URL = "/events_manager/v3/posters/search";
const POSTERS_API_DETAIL_URL = "/events_manager/v2/posters";
const POSTERS_PER_PAGE = 6;


const PostersResultsPage: React.FC = () => {
  let { path } = useRouteMatch();
  let classes = useStyles();
  let history = useHistory();

  let [query, setQuery] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [posters, setPosters] = useState<MorressierPoster[]>([]);
  let [events, setEvents] = useState<MorressierEvent[]>([]);
  let [selectedPosterInfo, setSelectedPosterInfo] = useState<SinglePosterResponseData>();

  /**
   * 
   * @param searchTerm the serach term
   */
  const handleSearch = (searchTerm: string) => {
    history.push(`/posters?query=${searchTerm}&offset=${0}&limit=${POSTERS_PER_PAGE}`);
  }

  /**
   * Fetch the (incomplete) data for all the Posters, Events & Users
   */
  const fetchPosters = (query: string, offset: NumericalQueryParam, limit: NumericalQueryParam) => {
    return new Promise((resolve, reject) => {
      setQuery(query);
      setIsLoading(true);
      axios.get(`${POSTERS_API_URL}?query=${query}&offset=${offset}&limit=${limit}`)
        .then((response: AxiosResponse<SearchResultsResponseData>) => {
          setIsLoading(false);
          setPosters(response.data.posters);
          setEvents(response.data.events);
          resolve(`axios -- fetchPosters succeeded with params: ${query} ${offset} ${limit}`);
        }).catch(() => reject(`axios -- fetchPosters failed with params: ${query} ${offset} ${limit}`))
    })
  }

  /**
   * Set the clicked poster to current one and navigate to detail page.
   * @param posterId the poster id
   */
  const handleGoToDetail = (posterId: NumericalQueryParam) => {
    history.push(`/posters/${posterId}`);
  }

  /**
   * Fetch the data for a given Poster.
   * @param posterId poster id
   */
  const fetchPosterDetail = (posterId: NumericalQueryParam) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      axios.get(`${POSTERS_API_DETAIL_URL}/${posterId}`)
        .then((response: AxiosResponse<SinglePosterResponseData>) => {
          setSelectedPosterInfo(response.data);
          setIsLoading(false);
          resolve();
        }).catch(() => {
          reject('Something went terribly wrong');
        })
    })    
  }

  return (
    <Fragment>
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
        <Route path={`${path}/:posterId`}>
          {isLoading ? (
            <CenteredComponent>
              <CircularProgress />
            </CenteredComponent>
          ) : (
            <PostersResultsDetail handleFetchPosterDetail={fetchPosterDetail} posterInfo={selectedPosterInfo}/>
          )}
        </Route>
        <Route exact path={path}>
          <PostersResultsList 
            posters={posters} 
            events={events} 
            handleGoToDetail={handleGoToDetail}
            handleFetchPosters={fetchPosters} /> 
        </Route>
      </Switch>
    </Fragment>
  );
}

export default PostersResultsPage;
