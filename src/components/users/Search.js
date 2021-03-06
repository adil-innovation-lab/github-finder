import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {

    const [text, setText] = useState('');

    // This method is used to dynamically update state whenever text input changes in the search form
    const onChange = e => setText(e.target.value);

    // This method is used to submit the search form
    const onSubmit = e => {
        e.preventDefault();
        if(text==='') {
            setAlert('Please enter a username', 'light')
        } else {
            searchUsers(text);
            setText('');
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input type="text" name="text" placeholder="Search Users" 
                    value={text}
                    onChange={onChange}
                />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            {showClear && (
                <button onClick={clearUsers} className="btn btn-light btn-block">Clear</button>
            )}
        </div>
    )
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
}

export default Search;