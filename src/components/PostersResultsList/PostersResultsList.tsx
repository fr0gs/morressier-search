import React, {  } from 'react';
import { MorressierPoster, MorressierEvent } from '../../interfaces/app';
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
} from '@material-ui/core';


interface Props {
  posters: MorressierPoster[];
  events: MorressierEvent[];
  handleGoToDetail: Function;
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
  info: {

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

/**
 * List of Posters painted in a Grid layout.
 */
const PostersResultsList: React.FC<Props> = ({ posters, events, handleGoToDetail }) => {
  const classes = useStyles();

  const findEventName = (eventId: string) => events.find(ev => ev.id === eventId)?.name || 'No event associated';
  const goToDetail = (e: any, posterId: string) => {
    e.preventDefault();
    handleGoToDetail(posterId)
  };

  return (
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
                    <p><strong>author:</strong> {poster.author_names.join(' ')}</p>
                    <p><strong>keywords:</strong> {poster.keywords?.join(', ')}</p>
                    <p><strong>event name:</strong> {findEventName(poster.event) }</p>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={(e) => goToDetail(e, poster.id)}>
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default PostersResultsList;
