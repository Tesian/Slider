$(document).ready(function(){

    var uid = 0;

    function create_article(id, el)
    {
	if ($("div#article_" + id).length == 0)
	{
	    var data;
	    $.ajax({
		url: "../articles/" + id,
		dataType: 'json',
		data: data,
		success: function(data){
		    var new_article = document.createElement("div");
		    new_article.setAttribute("id", "article_" + data["id"]);
		    new_article.setAttribute("data-id", data["id"]);

		    var title = document.createElement("h3");
		    title.innerHTML =  data["title"];
		    new_article.appendChild(title);

		    var body = document.createElement("p");
		    body.innerHTML = data["body"];
		    new_article.appendChild(body);

		    document.getElementById('wrapper').appendChild(new_article);
		    $("#article_" + id).css("left", "1000px");
		    make_event(el);
		}
	    });
	}
	else
	{
	    make_event(el);
	}
    }

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
        var child =	$("#article_" + ($('.slide-active').data("id") + 1));
	var father =	$("div.slide-active");

	if (child.length != 0) {

	    father.removeClass('slide-active');	    
	    father.animate({'left': '-1000px'}, 1500);
	    
	    child.addClass('slide-active');
	    child.animate({'left': '0px'}, 1500);
	    return (true);
	}
	return (false);
    };

    // a element call his father, this element go center=>right and the father go left=>center
    $.fn.slideToPrev = function( ) {
    	var child = 	$("div.slide-active");
	var father =	$("#article_" + ($('.slide-active').data("id") - 1));

	if (father.length != 0) {

    	    child.removeClass('slide-active');
	    child.animate({'left': '1000px'}, 1500);

    	    father.addClass('slide-active');
	    father.animate({'left': '0px'}, 1500);
	    return (true);
	}
	return (false);
    };

    // a element call a child

    $(".on_child").click(function(e){
    	e.preventDefault();
	$(this).hide();
	create_article($('.slide-active').data("id") + 1, $(this));
	setTimeout(function(){
	    $(".on_child").show();
	}
		   , 1500);
    });

    $(".on_father").click(function(e){
    	e.preventDefault();
	$(this).hide();
	create_article($('.slide-active').data("id") - 1, $(this));
	setTimeout(function(){
	    $(".on_father").show();
	}
		   , 1500);
    });

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
