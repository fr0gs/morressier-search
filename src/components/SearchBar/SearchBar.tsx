import React, { useState } from 'react';
import { TextField, makeStyles } from '@material-ui/core';

interface Props {
  search: Function;
  inNavBar?: boolean;
}

const useStyles = makeStyles((theme) => ({
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

const SearchBar: React.FC<Props> = ({ search, inNavBar = false }) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  
  const handleSearchInputChanges = (e: any) => {
    setSearchValue(e.target.value);
  }

  const handleKeyPress = (evt: any) => {
    if (evt.key === 'Enter') {
      callSearchFunction(evt);
    } 
  }

  const callSearchFunction = (e: any) => {
    e.preventDefault();
    search(searchValue);
  }

return (
  <form className="search">
    <TextField
      id="searchbar" 
      color="primary" 
      value={searchValue}
      onKeyPress={handleKeyPress}
      onChange={handleSearchInputChanges}
      inputProps={{ 
        'aria-label' : 'search',
        ...inNavBar && { className: classes.inputInput } //This is just some fun, conditionally extend a key to the object if inNavBar is true
      }}
    />
  </form>
  );
}






export default SearchBar;
