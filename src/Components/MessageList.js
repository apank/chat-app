import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const List = styled.ul `
    display: flex;
    flex-direction: column;
    margin: 0 0 45px;
    overflow: scroll;
    list-style-type: none;
    height: 100vh;
`;

const Message = styled.li `
    background-color: #fff;
    width: 100%;
    padding: 8px;
    font-size: 14px;

    &:nth-child(odd) {
        background-color: #eee;
    }

    &.status {
        text-align: center;
    }
`;

class MessageList extends Component {
    static propTypes = {
        data: PropTypes.array,
    };

    render() {
        const { data } = this.props;
        return (
            <List id="messages">
                {data.map((datum, i) => datum[0] !== '' ?
                    (
                        <Message key={i}>
                            <strong>{datum[0]}</strong>: {datum[1]}
                        </Message>
                    )
                    : (
                        <Message key={i} className="status">
                            {datum[1]}
                        </Message>
                    )
                )}
            </List>
        );
    }
}

export default MessageList;
