var isZoom=false;
	var dX,dY,dS;
	jQuery(document).ready(function() {
		jQuery('#vmap').vectorMap({
			map: 'world_en',
			backgroundColor: '#ffffff',
			color: '#ffffff',
			hoverOpacity: 0.7,
			selectedColor: '#666666',
			borderColor: '#ffffff',
			colors : test,
			enableZoom: false,
			showTooltip: true,
			onRegionOver : function (element, code, region)
			{
				highlightRegionOfCountry(code);
			},
			onRegionOut : function (element, code, region)
			{
				unhighlightRegionOfCountry(code);
			},
			onRegionClick: function (element, code, region)
			{
				if(!isZoom){ //first click; zooms in
					if(countryMap[code]=="Asia"){
						dX=280;dY=-100;dS=1.3;
					}
					if(countryMap[code]=="Africa"){
						dX=150;dY=150;dS=1.7;
					}
					if(countryMap[code]=="Europe"){
						dX=170;dY=50;dS=2.4;
					}
					if(countryMap[code]=="northAmerica"){
						dX=-200;dY=-200;dS=1.5;
					}
					if(countryMap[code]=="Australia"){
						dX=470;dY=300;dS=2;
					}
					if(countryMap[code]=="southAmerica"){
						dX=-200;dY=300;dS=1.5;
					}
					zoomInOnContinent(dX,dY,dS);
					isZoom=true;
					setRegion(code);
					setRegionColors();
					$('#directions').text('Please select a country');
				}
				else{ //second click on country
					$('#description-box').html('');
					countrySelected = true;
					selectedCode = code;
					displayBoxText(code);
				}
			}
		});
		document.getElementById("description-box").style.display = "none";
		document.getElementById("backButton").style.display = "none";
		$('#directions').text('Please select a continent');
	});

	function backButtonClick(){
		if(isZoom){
			zoomOutOnContinent(dX,dY,dS);
			isZoom=false;
			$('#vmap').vectorMap('set', 'colors', test);
		}
	}