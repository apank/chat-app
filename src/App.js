import React, { useEffect } from 'react';
import useLocalStorage from 'react-use-localstorage';
import useSocket from 'use-socket.io-client';
import { useImmer } from 'use-immer';
import UserList from './Components/UserList';
import MessageList from './Components/MessageList';
import JoinForm from './Components/JoinForm';
import MessageForm from './Components/MessageForm';
import styled from 'styled-components';

const MainContainer = styled.div `
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
`;

const MessageContainer = styled.div `
    position: relative;
    flex: 3;
`;

export default () => {
    const [room, setRoom] = useLocalStorage('room', '');
    const [id, setId] = useLocalStorage('id', '');

    const [socket] = useSocket('http://localhost:8000');

    const [messages, setMessages] = useImmer([]);
    const [onlineList, setOnline] = useImmer([]);

    useEffect(() => {
        socket.connect();

        if (id) socket.emit('join', id, room);

        socket.on('message-que', (username, message) => {
            setMessages(draft => {
                draft.push([username, message])
            })
        });

        socket.on('update', message => setMessages(draft => {
            draft.push(['', message]);
        }))

        socket.on('users-list', users => {
            let newState = [];
            for(let user in users){
                newState.push([users[user].id, users[user].username]);
            }
            setOnline(draft => { draft.push(...newState) });
        });

        socket.on('add-user', (username, id) => {
            setOnline(draft => {
                draft.push([id, username])
            })
        })

        socket.on('remove-user', id => {
            setOnline(draft => draft.filter(user => user[0] !== id))
        })

        socket.on('message',(username, message) => {
            setMessages(draft => { draft.push([username, message]) })
        })
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        const name = document.querySelector('#username').value.trim();
        const roomValue = document.querySelector('#room').value.trim();
        setId(name);
        setRoom(roomValue);
        socket.emit('join', name, roomValue);
    };

    const handleSend = e => {
        e.preventDefault();
        const input = document.querySelector('#message');
        if(input.value.trim() !== ''){
            socket.emit('message', input.value, room);
            input.value = '';
        }
    }

    const logOut = () => {
        socket.disconnect();
        setOnline(draft => []);
        setMessages(draft => []);
        setId('');
        socket.connect();
    }

    return id !== '' ? (
        <MainContainer>
            <MessageContainer>
                <MessageList data={messages} />
                <MessageForm onSubmit={e => handleSend(e)} />
            </MessageContainer>
            <UserList data={onlineList} onClick={() => logOut()} />
        </MainContainer>
    ) : ( <JoinForm onSubmit={event => handleSubmit(event)} /> );
};