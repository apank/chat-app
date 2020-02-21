import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const List = styled.ul `
    border-left: 1px solid #0968c3;
    position: relative;
    flex: 1;
    list-style: none;
    overflow: scroll;
    list-style-type: none;
`

const User = styled.li `
    background-color: #fff;
    font-size: 14px;
    padding: 8px;
    &:nth-child(odd) {
        background-color: #eee;
    }
`;

const LeaveButton = styled.div `
    background-color: #0968c3;
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 13px;
    color: #fff;
    width: 22px;
    height: 22px;
    border-radius: 100%;
    transition: all .3s ease-in-out;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &:hover {
        background-color: #064785;
    }
`;

const Heading = styled.strong `
    display: block;
    margin: 8px;
`;

class UserList extends Component {
    static propTypes = {
        data: PropTypes.array,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        onClick: () => {},
    }

    render() {
        const { data, onClick } = this.props;
        return (
            <List id="online">
                <LeaveButton onClick={onClick}>
                    <span>&#10005;</span>
                </LeaveButton>
                <Heading>
                    User List
                </Heading>
                <hr/>
                {data.map((datum, i) => {
                    return (
                        <User key={i} id={datum[0]}>
                            {datum[1]}
                        </User>
                    );
                })}
            </List>
        );
    }
}

export default UserList;
