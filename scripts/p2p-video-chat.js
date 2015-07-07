navigator.getWebcam = (
	navigator.getUserMedia ||
	navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia ||
	navigator.msGetUserMedia
	);




//create peer object
var peer = new Peer({
	key: '6nl73zes0za1yvi',
	debug: 3,
	config: {'iceServers':[
	{url: 'stun:stun.1.google.com:19302'},
	{url: 'stun:stun1.1.google.com:19302'},
	{url: 'turn:numb.viagenie.ca', username:'benjaminbb@gmail.com', credential:'webrtcdemo'}
	]}
});

//listen for when peer is open.. then set peer id
peer.on('open', function(){
	$('#my-id').text(peer.id);
});

//on answer
peer.on('call', function(){
	//auto answer
	call.answer(window.localStream);
	step3(call);
});


//all click handlers
$(function(){
	$('#make-call').click(function(){
		//initiate a call
		var call = peer.call($('#their-id').val(), window.localStream)
	});

	$('#end-call').click(function(){
		//initiate a call
		window.existingCall.close();
		step2();
	});

	$('#step1-retry').click(function(){
		//initiate a call
		$('#step1-error').hide();
		step1();
	});

	step1();
})

function step1(){
	//get a/v stream
	navigator.getWebcam({audio:false, video:true}, function(stream){
		//display steam
		$('#my-video').prop('src',URL.createObjectURL(stream));
		window.localStream = stream;

		step2();

	}, function(){
		$('$step1-error').show();
	});

}

//show your id and hide other divs
function step2(){
	//mod UI
	$('#step1', '#step3').hide();
	$('#step2').show();
}


//
function step3(){
	//hang up on call if present
	if(window.existingCall){
		window.existingCall.close();
	}

	//wait for stream on call, then setup peer vid

	call.on('stream', function(stream){
		$('#their-video').prop('src', URL.createObjectURL(stream));
	})

	$('#step1', '#step2').hide();
	$('#step3').show();
}