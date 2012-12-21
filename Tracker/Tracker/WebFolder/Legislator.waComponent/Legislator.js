
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Legislator';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var button_search = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	button_search.click = function button_search_click (event)// @startlock
	{// @endlock
		var leg_name = $$('component_legislator_legislator_search').getValue();
		sources.component_legislator_legislator.query('last_name = :1', leg_name + '*');
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_button_search", "click", button_search.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
