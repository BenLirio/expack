import io from 'socket.io-client';

const socket = io()

socket.emit('test', 'testing data')


document.addEventListener('DOMContentLoaded', function() {
  var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
  }
  myGameArea.start()
});

export default {  }