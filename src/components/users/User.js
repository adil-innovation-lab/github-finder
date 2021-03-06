import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const User = ({ user, loading, getUser, getUserRepos, repos, match }) => {
    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // eslint-disable-next-line
    }, []);

    const { name, company, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gists, hireable } = user;

    if (loading) return <Spinner />;

    return (
        <Fragment>
            <Link to='/' className="btn btn-light">Back to Search Results</Link>
            Hireable: { hireable ? <i className="fas fa-check text-success"></i> : <i className="fas fa-times-circle text-danger"></i> }
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} alt="Profile" className="round-img" style={{ width: '150px'}} />
                    <h2>{name}</h2>
                    {location && (
                        <Fragment>
                            <h5>Location: {location}</h5>
                        </Fragment>
                    )}
                </div>
                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className='btn btn-dark my-1' target='_blank' rel='noreferrer' >GitHub Profile</a>
                    <ul>
                        <li>
                            {login && (
                                <Fragment>
                                    Username: {login}
                                </Fragment>
                            )}
                        </li>
                        <li>
                            {company && (
                                <Fragment>
                                    Company: {company}
                                </Fragment>
                            )}
                        </li>
                        <li>
                            {blog && (
                                <Fragment>
                                    Website: {blog}
                                </Fragment>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-light">Public Repos: {public_repos}</div>
                <div className="badge badge-dark">Public Gists: {public_gists}</div>
            </div>

            <Repos repos={repos} />
        </Fragment>
    )
}

User.propTypes = {
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
}

export default User
