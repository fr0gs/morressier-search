import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  }
}));

const CenteredComponent: React.FC = (props) => {
  let classes = useStyles();

  return (
    <Container className={classes.heroContent} maxWidth="lg">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '30vh' }}
      >
        <Grid item xs={6}>
          {props.children}
        </Grid>   
      </Grid> 
  </Container>
  )
}

export default CenteredComponent;
