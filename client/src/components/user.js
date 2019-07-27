// @flow
import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import environment from '../api/relay-environment';
import type {userQuery} from 'relay/userQuery.graphql';

export default class User extends React.Component {
    render () {
        return (
            <QueryRenderer
                environment={environment}
                query={graphql`
                  query userQuery {
                    user(id: "me") {
                      id
                    }  
                  }
                `}
                variables={{}}
                render={({ error, props }: { error: ?Error, props: userQuery }) => {
                    if (error) {
                        return <div>Error!</div>;
                    }
                    if (!props) {
                        return <div>Loading...</div>;
                    }
                    return <div>User ID: {props.user.id}</div>;
                }}
            />
        );
    }
}
