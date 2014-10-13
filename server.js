/**
 * TODO
 * Graph Database
 * 	I love Graph Databases.
 *	In the future, I want to wire this
 * 	baby up with a graph database. The 
 * 	graph db would be used to keep track
 * 	of the online user list and public
 * 	group chats
 *
 * How much do we track
 *	This is a good question.
 *
 */

// ~~ HTTP Server
/** 
 * This is a very basic HTTP
 * server, all it does is render 
 * a file. I'm thinking about 
 * making this also act as an API
 * to get information but I think 
 * the socket.io server will do a
 * sufficient job of distributing 
 * information to people
 *
 * I'm considering using SailsJS
 * to make it a bit more robust 
 * ... We will see.
 */
var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
	res.sendfile('./index.html');
});

app.get('/online', function(req, res){
	res.json({ users: onlineList});
});

http.listen(8080, function(){
	console.log("~~ HTTP server started on localhost:8080 ~~")
});


// ~~ Peer Server
/**
 * The PeerJS Server is used to broker 
 * connections between peers. Once 
 * a connection is established all 
 * information goes through it in good
 * ol' P2P fashion.
 */
var PeerServer = require('peer').PeerServer;
var server = new PeerServer({port: 9000});

// NOTE: in the future convert this to a graph db type of thing
var onlineList = []; // variables that holds all our online users

// Track connected clients
server.on('connection', function(id) {

	// Add user to our user object
	var user = {};
	user[id] = { 
		user_id: id,
		name: "Ned Flanders",
		ip: server._clients.peerjs[id].ip,
		fingerprint: "xx"
	}

	onlineList.push(user);

	console.log(" \t Peer `" + id + "` has connected to the PeerServer");

});

server.on('disconnect', function (id) {
	console.log(" \t Peer `" + id + "` has disconnected");
});

console.log("~~ PeerServer started on localhost:9000 ~~");


// ~~ Socket.IO
/**
 * Socket.IO is used to allow the server to 
 * talk to the users in real time. I want
 * to minimise the "centrality" of the app
 * but sometimes it is necessary for the 
 * server to be able to send info out to 
 * connected users. PeerJS doesn't offer
 * any functionality to send information 
 * too a peer from the server (it'd be 
 * nice if it did). Socket.io will bridge
 * that gap nicely by being our communicator
 */
var io = require('socket.io')(http);

var clients = {};


io.on('connection', function(socket) {

	/**
	 * /user/join
	 * Track the user connecting
	 *
	 * FIX ME: This shouldn't be something where 
	 * it sends the entire client list everytime
	 * it should send the connected client and 
	 * display it, just as it should send the 
	 * notification for a disconnected client 
	 * and remove it
	 */
	socket.on('/user/connect', function(data){

		clients[data.token] = {
			"socket": socket.id,
			"username": data.username
		};

		console.log("Socket.IO hears request to join");
		console.log(clients);

		socket.emit('/user/list', clients);

	});


	/**
	 * @deprecated 
	 * /chat/new
	 * Tracks the creation of a new 
	 * room to chat in
	 */
	socket.on('/chat/new', function(data) {

	});


	/**
	 * /chat/connect
	 * Tracks when a client has joined 
	 * a conversation 
	 */
	socket.on('/chat/join', function(room) {
		console.log("Chat join " + room);
	});

	/**
	 * /chat/vote/new
	 * Tracks the fact that a poll has been
	 * started. 
	 */
	socket.on('/chat/vote/new', function(data) {

	});


	/**
	 * /chat/vote/cast
	 * Tracks a vote being cast by a connected
	 * client
	 *
	 */
	socket.on('/chat/vote/cast', function(data) {

	})



});


