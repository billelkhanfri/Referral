import { IoMdSearch } from "react-icons/io";

function SearchBox() {
  return (
    <div className="searchBox position-relative d-flex align-items-center">
      <IoMdSearch className="mr-2"/>

      <input type="text" name="" id="" placeholder="Recherche" />
    </div>
  );
}

export default SearchBox;
