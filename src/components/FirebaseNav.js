import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PostScream from './PostScream';
import {NavLink} from 'react-router-dom';
//MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


export class FirebaseNav extends Component {
    render() {
        const {authenticated} = this.props;
        return (
            <AppBar>
                <Toolbar className = "nav-container">
                   {authenticated ? (
                       <Fragment>
                         <ul>
                             <li style={{display: 'inline-block', padding: '-10px'}}>
                                <PostScream/>
                             </li>
                             <li style={{display: 'inline-block', padding: '8px', color: 'white'}}>
                           <NavLink exact activeStyle={{color: 'grey'}} to="/">Home</NavLink>

                             </li>
                             <li style={{display: 'inline-block', padding: '8px'}}>
                           <NavLink exact activeStyle={{color: 'grey'}} to="/explore">Profile</NavLink>

                             </li>
                             <li style={{display: 'inline-block', padding: '8px'}}>

                           <NavLink  activeStyle={{color: 'grey'}} to="/browse">Browse</NavLink>
                             </li>

                         </ul>

                       </Fragment>
                   ) : (
                    <Fragment>
                        <ul>
                             <li style={{display: 'inline-block', padding: '8px'}}>
                           <NavLink exact activeStyle={{color: 'grey'}} to="/">Home</NavLink>

                             </li>
                             <li style={{display: 'inline-block', padding: '8px'}}>
                           <NavLink exact activeStyle={{color: 'grey'}} to="/explore">Profile</NavLink>

                             </li>
                             <li style={{display: 'inline-block', padding: '8px'}}>

                           <NavLink  activeStyle={{color: 'grey'}} to="/browse">Browse</NavLink>
                             </li>
                             <li style={{display: 'inline-block', padding: '8px'}}>

                            <NavLink  activeStyle={{color: 'grey'}} to="/login">Login</NavLink>
                            </li>
                            <li style={{display: 'inline-block', padding: '8px'}}>

                            <NavLink  activeStyle={{color: 'grey'}} to="/signup">Signup</NavLink>
                         </li>
                        </ul>
                    </Fragment>
                   )}
                </Toolbar>
            </AppBar>
        )
    }
}

FirebaseNav.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(FirebaseNav)
