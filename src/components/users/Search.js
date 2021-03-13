import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const [text, setText] = useState('');

    // This method is used to dynamically update state whenever text input changes in the search form
    const onChange = e => setText(e.target.value);

    // This method is used to submit the search form
    const onSubmit = e => {
        e.preventDefault();
        if(text==='') {
            alertContext.setAlert('Please enter a username', 'light')
        } else {
            githubContext.searchUsers(text);
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
            {githubContext.users.length > 0 && (
                <button onClick={githubContext.clearUsers} className="btn btn-light btn-block">Clear</button>
            )}
        </div>
    )
}

export default Search;