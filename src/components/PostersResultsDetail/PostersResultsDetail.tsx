import React from 'react';
import { MorressierPoster } from '../../interfaces/app';

interface Props {
  poster?: MorressierPoster;
}

const PostersResultsDetail: React.FC<Props> = ({ poster }) => {
  console.log('I come through');

  return (
    <h1>Poster Detail</h1>
  )
}

export default PostersResultsDetail;
