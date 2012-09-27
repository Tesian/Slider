$(document).ready(function(){

    // global
    var uid = 0;
    // var time = new Date(0, 0, 0, 0, 0, 0, 0);
    // var save_time = time.getTime();

    // function wait() {
    // 	while (have_event_now() == true) {}
    // }

    // function have_event_now() {
    // 	child = $("#wrapper div:eq(0)");
    // 	i = 0;
    // 	while (child.length != 0) {
    // 	    i++;
    // 	    if (child.queue().length != 0) {
    // 		return true;
    // 	    }
    // 	    selector = "#wrapper div:eq(" + i + ")";
    // 	    child = $(selector);
    // 	}
    // 	return false;
    // }

    // function sleep(time) {
    // 	var date = new Date();
    // 	var start = date.getTime();
    // 	while (start + time > date.getTime()) true;
    // 	return;
    // }

    // function sleep2(ms) {
    // 	var notifier = new EventNotifier ();
    // 	setTimeout(notifier, ms);
    // 	notifier.wait->();
    // }

    // function end_animate()
    // {
    // 	sleep(15);
    // 	$('#wrapper').dequeue();
    // }

    // function animate(size, element)
    // {
    	// if ( typeof this.animate == 'undefined') this.animate = 0;

	
    // if (el == 'undefined')
    // {
    //     this.animate = 0;
    //     alert('salut');
    // }
    // while (this.animate == 0) {}
    // if (element)
    // {
    //     alert(element);
    // this.animate = 1;
    // 	    $('#wrapper').queue(function(element, size) {
    // 		element.animate({'left': size}, {duration: 1500, complete: animate()});
    // 		this.dequeue();
    // 	    });
    // 	}
    // }

    function make_event(el) {
    	if ((el.attr("class") == "on_child" && $('#wrapper').slideToNext() == true) ||
	    (el.attr("class") == "on_father" && $('#wrapper').slideToPrev() == true))
	{
	    uid++;
	    history.pushState({uid: uid, last_move: "next"}, "", "/articles/" + $('.slide-active').data("id"));	    
	}
    }
    

    // a element call a child, this element go center=>left and the child go right=>center
    $.fn.slideToNext = function( ) {
        var child =	$("div#article_" + ($('.slide-active').data("id") + 1));
        var father =	$("div.slide-active");

	if (child.length != 0) {
	    father.removeClass('slide-active');	    
	    // $("#wrapper").queue(function() {
	    father.animate({'left': '-1000px'}, 1500);
	    // });
	    
	    child.addClass('slide-active');
	    // $("#wrapper").queue(function() {
	    child.animate({'left': '0px'}, 1500);
	    // });
	    return (true);
	}
	return (false);
    };

    // a element call his father, this element go center=>right and the father go left=>center
    $.fn.slideToPrev = function( ) {
    	var child = 	$("div.slide-active");
	var father =	$("div#article_" + ($('.slide-active').data("id") - 1));

	if (father.length != 0) {
    	    child.removeClass('slide-active');
	    // if (save_time + 1500 < time.getTime())
	    // {
	    // 	child.animate({'left': '1000px'}, 1500);
	    // }
	    // else
	    // {
	    // 	setTimeout(function() {
	    child.animate({'left': '1000px'}, 1500);
	    // 	}, (time.getTime() - save_time) + 1500);
	    // }
	    // save_time = time.getTime();

    	    father.addClass('slide-active');
	    // setTimeout(function() {
	    father.animate({'left': '0px'}, 1500);
	    // }, (time.getTime() - save_time) + 1500);
	    // save_time = time.getTime();
	    return (true);
	}
	return (false);
    };

    // a element call a child

    $(".on_child, .on_father").click(function(e){
	e.preventDefault();
	// if (save_time + 1 > time.getTime())
	// {
	//     alert("Goodbye");
	    make_event($(this));
	// }
	// else
	// {
	//     alert("salut");
	//     var el = $(this)
	//     setTimeout(function() { 
    	// 	if (($(this).attr("class") == "on_child" && $('#wrapper').slideToNext() == true) || ($(this).attr("class") == "on_father" && $('#wrapper').slideToPrev() == true))
	// 	{
	// 	    uid++;
	// 	    history.pushState({uid: uid, last_move: "next"}, "", "/articles/" + $('.slide-active').data("id"));	    
	// 	}
	//     } , (time.getTime() - save_time) + 1500);
	// }
	// save_time = time.getTime();
    });

    // $(".on_child").click(function(e){
    // 	// wait();
    // 	e.preventDefault();
    // 	if ($('#wrapper').slideToNext() == true)
    // 	{
    // 	    uid++;
    // 	    history.pushState({uid: uid, last_move: "next"}, "", "/articles/" + $('.slide-active').data("id"));
    // 	}
    // });

    // // a element call his father
    // $(".on_father").click(function(e){
    // 	// wait();
    // 	e.preventDefault();
    // 	if ($('#wrapper').slideToPrev() == true)
    // 	{
    // 	    uid++;
    // 	    history.pushState({uid: uid, last_move: "prev"}, "", "/articles/" + $('.slide-active').data("id"));
    // 	}
    // });

    // gestion du clic sur le bouton précédent du navigateur
    $(window).bind('popstate', function(event) {
	if (!event.originalEvent.state || event.originalEvent.state.uid < uid) {
	    if (event.originalEvent.state) {
		uid = event.originalEvent.state.uid;
		if (event.originalEvent.state.last_move == "next") {
		    $('#wrapper').slideToPrev();
		}
		else {
		    $('#wrapper').slideToNext();
		}
	    } else {
		$('#wrapper').slideToPrev();
		uid = 0;
	    }
	} else {
	    if (event.originalEvent.state.last_move == "next") {
		$('#wrapper').slideToNext();
	    }
	    else {
		$('#wrapper').slideToPrev();
	    }
	    uid = event.originalEvent.state.uid;
	}
    });

});
