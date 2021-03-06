
//shim for browser syntax variationss
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

//hide unneccessary steps on page load
$(document).ready(function(){
         if($( '#step2' ).is(":visible")){
              $( '#step2' ).hide();
         } 
		if($( '#step3' ).is(":visible")){
              $( '#step3' ).hide();
         }
});

//listen for when peer is open.. then set peer id (my id)
peer.on('open', function(id){
	console.log('my id is:'+id);
	$('#my-id').text(peer.id);
});

//on answer
peer.on('call', function(){
	//auto answer
	//call.answer(window.localStream);
	call.answer(mediaStream);
	//then go to the call handler step
	step3(call);
});


//all click handlers
$(function(){
	$('#make-call').click(function(){
		//initiate a call
		var call = peer.call($('#callto-id').val(), window.localStream);
		$('#step2').hide();
		step3(call);
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
	console.log('getting local A/V stream');
	//get a/v stream
	navigator.getWebcam({audio:false, video:true}, function(stream){
		//display steam
		$('#my-video').prop('src',URL.createObjectURL(stream));
		window.localStream = stream;
		//$('#step1').hide();
		step2();

	}, function(){
		$('$step1-error').show();
	});

}

//show your id and hide other divs
function step2(){
	console.log('show/hide divs');
	//mod UI
	  if($( '#step1' ).is(":visible")){
              $( '#step1' ).hide();
         } 

          if($( '#step3' ).is(":visible")){
              $( '#step3' ).hide();
         } 

	$('#step2').show();
}


//
function step3(call){
	console.log('waiting for other party');
	//hang up on call if present
	if(window.existingCall){
		console.log('existing call in progress, closing call');
		window.existingCall.close();
	}

	//wait for stream on call, then setup peer vid
	call.on('stream', function(stream){
		console.log('stream initiated');
		$('#their-video').prop('src', URL.createObjectURL(stream));
	});

	$('#step1', '#step2').hide();
	$('#step3').show();
}