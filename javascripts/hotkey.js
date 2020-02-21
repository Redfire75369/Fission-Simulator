const key = Mousetrap;

key.bind("m", function(){
	for (let i = 0; i < 8; i++) {
		buyMaxReactor(i);
	}
	buyMaxEff();
});

key.bind("s", function(){
	buyMeteor();
});

key.bind("n", function(){
	buyNaniteResearch();
});