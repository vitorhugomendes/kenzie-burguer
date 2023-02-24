import { useContext, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { UserContext } from '../../../providers/UserContext/UserContext';

const SearchForm = () => {
  const { setSearch } = useContext(UserContext);
  const [searchValue, setSearchValue] = useState('');

  function searchSubmit() {
    setSearch(searchValue);
    setSearchValue('');
  }
  return (
    <StyledSearchForm
      onSubmit={(event) => {
        event.preventDefault();
        searchSubmit();
      }}
    >
      <input
        type='text'
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
        placeholder='Digitar pesquisa'
      />
      <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
