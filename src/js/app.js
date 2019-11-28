import io from 'socket.io-client';

const socket = io()

socket.emit('test', 'testing data')

export default {  }