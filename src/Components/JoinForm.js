import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const Form = styled.form `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
`;

const Heading = styled.h1 `
    text-align: center;
    font-size: 25px;
    margin: 16px 0;
    color: #222;
`;

const Input = styled.input `
    background-color: #fff;
    margin: 4px;
    padding: 8px;
    width: 250px;
    font-size: 14px;
    border: 1px solid #4d4d4d;
`;

const Button = styled.button `
    margin: 4px;
    padding: 8px;
    width: 250px;
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

class JoinForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
    };

    static defaultProps = {
        onSubmit: () => {},
    }

    render() {
        const { onSubmit } = this.props;
        return (
            <Form onSubmit={onSubmit}>
                <Heading>Chat App</Heading>
                <Input id='username' required placeholder='Username' />
                <Input id='room' placeholder='Room Name' />
                <Button type='submit'>Join</Button>
            </Form>
        );
    }
}

export default JoinForm;
