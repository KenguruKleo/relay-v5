import React from 'react';
import User from './user';

class Main extends React.Component {
    render () {
        return (
            <div className="todoapp">
                <h1>Relay</h1>
                <User userId="me" />
                <hr />
            </div>
        );
    }
}

export default Main;
