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
var findBookWhere=function(params){
	return _.findWhere(allBooks(),params);
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

var renderAuthor=function(author){
	var authorTemplate = _.template(getTemplate("author-template"));
	return authorTemplate(author);
}

var renderAuthors=function(authors){
	return _.map(authors,renderAuthor).join(", ");
}

var renderRating=function(rating){
	rating=Math.round(rating);

	var starTemplate=_.template(getTemplate("star-template")),
		blackStar={"star":htmlChar("blackStar"),
					"starClass": "gold-star"},
		whiteStar={"star":htmlChar("blackStar"),
					"starClass": "grey-star"};
	var blackStars= _.map(_.range(0,rating), function(){
		return starTemplate(blackStar);
	});
	var whiteStars=_.map(_.range(0, 5-rating),function(){
		return starTemplate(whiteStar);
	});
	return blackStars.concat(whiteStars).join("");
};

var SHOPPING_CART=[];


var addBookToCart=function(book){
	var id=Date.now();
	var item={"id":id,"book":book};
	SHOPPING_CART.push(item);
	refreshShoppingCart();
};

var HTML_CHARS={
	"blackStar": "#9733",
	"whiteStar": "#9734",
	"heart":"hearts",
	"dollarSign":"#36"
};

var htmlChar = function(name){
	var code= HTML_CHARS[name];
	if(code){
		return "&" +code+ ";";
	};
};

var handleAddToCart=function(e){
	var $button=$(e.target),
		data=$button.data(),
		book=findBookWhere(data);

		addBookToCart(book);
		refreshShoppingCart();
		console.log(SHOPPING_CART);
		
};

var renderLineItems=function(items){
	var lineItemTemplate= _.template(getTemplate("line-item-template"));
	return _.map(items, lineItemTemplate).join("");
}



var renderShoppingCart=function(){
	var shoppingCartTemplate=_.template(getTemplate("shopping-cart-template"));
	return $(shoppingCartTemplate({"items":SHOPPING_CART}));	
};

var renderTotalPrice=function(items){
	var totalPriceTemplate=_.template(getTemplate("total-price-template"));
	var totalPrice= _.reduce(items, function(total,item){
		return total+item.book.price;
	},0);
	return totalPriceTemplate({"totalPrice":totalPrice});
};

var refreshShoppingCart=function(shoppingCart){
	var $shoppingCart=$("#shopping-cart");
	$shoppingCart.empty();
	$shoppingCart.append(renderShoppingCart());
};

$(document).ready(function(){
	var $bookStore=$("#books-store");

	_.each(allBooks(),function(book){
		var $renderBook=$(renderBook(book));
	$renderBook.find("button").on("click",handleAddToCart);
	$bookStore.append($renderBook);
	refreshShoppingCart();
	});
});


