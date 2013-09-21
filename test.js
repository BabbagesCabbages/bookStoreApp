document.createElement("aside");


var allBooks=function(){
	return bookData.books;
}


var countBooks=function(){
	return allBooks().length;
}

var findBook=function(pred){
	return _.find(allBooks(),pred);
}

var findBooks=function(pred){
	return _.filter(allBooks(), pred);
}

var findBooksWhere=function(params){
	return _.where(allBooks(),params);
}

var MONTHS=["jan","feb","mar","apr","may","jun","jul","aug",
			"sep","oct","nov","dec"];

var numberToMonth=function(n){
	var index=Math.max(0,Math.min(n-1,11));
	return MONTHS[index];
}

var authorToString=function(author){
	return author.firstName+ " " + author.lastName;
}

var priceToString=function(book){
	return book.price;
}

var getTemplate=function(name){
	return $("script#"+name).text().trim();
}

var renderBook=function(book){
	var bookTemplate = _.template(getTemplate("book-template"));
	return bookTemplate(book);
}

var SHOPPING_CART=[];
var addToCart=function(shoppingCart,f){
	var temp=SHOPPING_CART;
	var result=f(temp);
	SHOPPING_CART=temp;
	return result;
}

var addBook=function(book){
	var id=Date.now();
	var book={"id":id,"book":book};
	return SHOPPING_CART.push(book);
}


$(document).ready(function(){
	var $bookStore=$("#books-store");
	_.each(allBooks(),function(book){
		var $listBook=$(renderBook(book));
		$bookStore.append($listBook);

	})
	 
});


//test for button, was trying out code that posted object data 
//to a table. Works outside of template but not inside template
//when I call $(".add-to-cart") instead of $("#test-button").
$("#test-button").on('click',function(){
	var data=["yo1","yo2"];
	var templ="<tr><td><%= value %></td></tr>";
	var rows=_.map(data, function(item){
	return _.template(templ, {value:item});
	});
		var html=rows.join("");
		$("#my-table").empty().append(html);
});
