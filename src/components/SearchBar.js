function SearchBar(props) {
  return (
    <input
      type="text"
      className="input search-bar column is-half"
      name="search"
      placeholder="Search"
      onKeyUp={(event) => props.filterFoods(event.target.value)}
    />
  );
}

export default SearchBar;
