import React, { useEffect, Fragment, useState } from 'react';
import { MorressierPoster, MorressierEvent, NumericalQueryParam } from '../../interfaces/app';
import { 
  Container, 
  Grid, 
  makeStyles, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  Button,
  CircularProgress, 
} from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import CenteredComponent from '../CenteredComponent/CenteredComponent';


interface Props {
  posters: MorressierPoster[];
  events: MorressierEvent[];
  handleGoToDetail: Function;
  handleFetchPosters: (query: string, offset: NumericalQueryParam, limit: NumericalQueryParam) => Promise<any>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

//Hook to parse the query string.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}


/**
 * List of Posters painted in a Grid layout.
 */
const PostersResultsList: React.FC<Props> = ({ posters, events, handleGoToDetail, handleFetchPosters }) => {
  const classes = useStyles();
  let queryParams = useQuery();

  //isLoading is here and not in PostersResultsPage like the one for PostersResultsDetail
  //because if the loading logic is on the outer component, it will chec
  let [isLoading, setIsLoading] = useState(false);

  const query = queryParams.get('query') || "";
  const offset = queryParams.get('offset') || 0;
  const limit = queryParams.get('limit') || 6;

  const findEventName = (eventId: string) => events.find(ev => ev.id === eventId)?.name || 'No event associated';
  const goToDetail = (posterId: string, eventName: string) => {
    handleGoToDetail(posterId, eventName);
  };

  useEffect(() => {
    setIsLoading(true)
    handleFetchPosters(query, offset, limit)
      .then(() => setIsLoading(false))
  }, [query, offset, limit]);

  return (
    <Fragment>
      {isLoading ? (
        <CenteredComponent>
          <CircularProgress />
        </CenteredComponent>
      ) : (
      <Container className={classes.heroContent} maxWidth="md">
        <Grid container spacing={4}>
          {posters.map((poster: MorressierPoster) => {
            return (
              <Grid item key={poster.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={poster.thumb_url}
                    title={`${poster.title.substr(0, 20)}...`}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {poster.title}
                    </Typography>
                    <Typography component={'span'}>
                      <p><strong>author:</strong> {poster.author_names.join(' & ')}</p>
                      <p><strong>keywords:</strong> {poster.keywords?.join(', ')}</p>
                      <p><strong>event name:</strong> {findEventName(poster.event) }</p>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={(e) => goToDetail(poster.id, findEventName(poster.event))}>
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Something here to give the footer a purpose!
          </Typography>
        </footer>
        </Grid>
      </Container>        
      )}      
    </Fragment>
  )
}

export default PostersResultsList;
