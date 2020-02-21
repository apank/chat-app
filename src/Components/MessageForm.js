import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Form = styled.form `
    border-top: #000;
    background-color: #ccc;
    display: flex;
    flex-direction: row;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`;

const Input = styled.input `
    background-color: #fff;
    flex: 3;
    margin: 4px;
    padding: 8px;
    font-size: 14px;
    border: none;
`;

const Button = styled.button `
    flex: 1;
    margin: 4px;
    padding: 8px;
    border: none;
    background-color: #0968c3;
    color: #fff;
    text-align: center;
    font-size: 14px;
    transition: all .3s ease-in-out;
    cursor: pointer;

    &:hover {
        background-color: #064785;
    }
`;

class MessageForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
    };

    static defaultProps = {
        onSubmit: () => {},
    };

    render() {
        const { onSubmit } = this.props;
        return (
            <Form onSubmit={onSubmit}>
                <Input id="message" />
                <Button>Send</Button>
            </Form>
        );
    }
}

export default MessageForm;