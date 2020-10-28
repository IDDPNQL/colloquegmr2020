define(["dojo/topic"], function(topic) {
	/*
	* Custom Javascript to be executed while the application is initializing goes here
	*/

	// The application is ready
	topic.subscribe("tpl-ready", function(){
	/*
	 * Custom Javascript to be executed when the application is ready goes here
	 */
	});

	var WEBMAP_ID = "b83a88a330e94e46a7e60911e006bdc5",
		LAYER_ID = "info_generale_data_20201027_6325";

	var clickHandlerIsSetup = false;

	topic.subscribe("story-loaded-map", function(result){
		if ( result.id == WEBMAP_ID && ! clickHandlerIsSetup ) {
			var map = app.maps[result.id].response.map,
			layer = map.getLayer(LAYER_ID);

			if ( layer ) {
        // On mouseover, change cursor to pointer; show tooltip
				layer.on("mouse-over", function(e){
					map.setMapCursor("pointer");
					map.infoWindow.setFeatures([e.graphic]);
					map.infoWindow.show(e.graphic.geometry);
					map.infoWindow.resize();
				});
        
        //On mouseout, revert to default cursor and hide tooltip
				layer.on("mouse-out", function(e){
					map.setMapCursor("default");
					map.infoWindow.hide();
				});
        
        //On click, scroll to corresponding MJ section
				layer.on("click", function(e){
					var index = e.graphic.attributes["fid"];
					topic.publish("story-navigate-section", index);
				});
			}
		}
	});
});
