import React, { useEffect, Fragment, useState } from 'react';
import { SinglePosterResponseData, NumericalQueryParam } from '../../interfaces/app';
import CenteredComponent from '../CenteredComponent/CenteredComponent';
import { CardContent, Card, CardMedia, Typography, makeStyles, CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router-dom';

interface Props {
  posterInfo?: SinglePosterResponseData;
  handleFetchPosterDetail: (posterId: NumericalQueryParam) => Promise<any>;
}

const useStyles = makeStyles((theme) => ({
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
}));

const PostersResultsDetail: React.FC<Props> = ({ posterInfo, handleFetchPosterDetail }) => {
  const classes = useStyles();
  const { posterId } = useParams();
  let [isLoading, setIsLoading] = useState(false);

  const poster = posterInfo?.poster;
  const event = posterInfo?.event;
  const authors = posterInfo?.users;

  useEffect(() => {
    setIsLoading(true)
    handleFetchPosterDetail(posterId);
  }, [])

  const authorNames = () => authors?.map(author => author?.full_name).join('');
  const keyWords = () => poster?.keywords?.join(', ') || 'No keywords';

  return (
    <Fragment>
      {isLoading ? (
        <CenteredComponent>
          <CircularProgress />
        </CenteredComponent>
      ) : (
      <CenteredComponent>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={poster?.thumb_url_large}
            title={`${poster?.title.substr(0, 20)}...`}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {poster?.title}
            </Typography>
            <Typography component={'span'}>
              <p><strong>author:</strong> {authorNames()}</p>
              <p><strong>keywords:</strong> {keyWords()}</p>
              <p><strong>event name:</strong> {event?.name}</p>
            </Typography>
          </CardContent>
        </Card>
      </CenteredComponent> 
      )}
    </Fragment>  
  );
}

export default PostersResultsDetail;
