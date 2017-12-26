function toRadians (angle) {
  return angle * (Math.PI / 180);
}

var goldenRatio = 1.61803; 

var shardH = 600;
var shardW = shardH/goldenRatio;


var shard = document.getElementById("shard")
	shard.style.width = shardW + 'px'
	shard.style.height = shardH + 'px'

var shardCenter = {
	x: shardW/2, 
	y: shardH*0.8
}

/*var shardCenterDot = document.createElementNS("http://www.w3.org/2000/svg", "circle")

shardCenterDot.setAttribute('cx', parseInt(shardCenter.x))
shardCenterDot.setAttribute('cy', parseInt(shardCenter.y))
shardCenterDot.setAttribute('stroke', 'black')
shardCenterDot.setAttribute('fill', 'black')
shardCenterDot.setAttribute('r', 2)

shard.appendChild(shardCenterDot)*/

shardLeftMargin = document.createElementNS("http://www.w3.org/2000/svg", "line")
shardLeftMargin.setAttribute('x1', parseInt(shardCenter.x))
shardLeftMargin.setAttribute('x2', Math.cos(toRadians(-120)) * 500 + shardCenter.x)
shardLeftMargin.setAttribute('y1', parseInt(shardCenter.y))
shardLeftMargin.setAttribute('y2', Math.sin(toRadians(-120)) * 500 + shardCenter.y)
shardLeftMargin.setAttribute('stroke', 'black')
shardLeftMargin.setAttribute('fill', 'black')

shard.appendChild(shardLeftMargin)

shardRightMargin = document.createElementNS("http://www.w3.org/2000/svg", "line")
shardRightMargin.setAttribute('x1', parseInt(shardCenter.x))
shardRightMargin.setAttribute('x2', Math.cos(toRadians(-60)) * 500 + shardCenter.x)
shardRightMargin.setAttribute('y1', parseInt(shardCenter.y))
shardRightMargin.setAttribute('y2', Math.sin(toRadians(-60)) * 500 + shardCenter.y)
shardRightMargin.setAttribute('stroke', 'black')
shardRightMargin.setAttribute('fill', 'black')

shard.appendChild(shardRightMargin)

shardMirrorLine = document.createElementNS("http://www.w3.org/2000/svg", "line")
shardMirrorLine.setAttribute('x1', parseInt(shardCenter.x))
shardMirrorLine.setAttribute('x2', shardCenter.x)
shardMirrorLine.setAttribute('y1', parseInt(shardCenter.y))
shardMirrorLine.setAttribute('y2', 0)
shardMirrorLine.setAttribute('stroke', 'gray')
shardMirrorLine.setAttribute('fill', 'gray')

shard.appendChild(shardMirrorLine)

var shardGridGroup;
var verticalGridDistance;

function generateShardGrid(distance){
	verticalGridDistance = distance;
	if(shardGridGroup){ //if it exist, remove it and regenarate new
		shardGridGroup.parentNode.removeChild(shardGridGroup)
		shardGridGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
	}else{
		shardGridGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")

	}

	for(var i = 0; i < 50; i++){
		var lenght = 400

			//V lines

		var V1 = document.createElementNS("http://www.w3.org/2000/svg", "line")
		V1.setAttribute('x1', parseInt(shardCenter.x))
		V1.setAttribute('x2', Math.cos(toRadians(-60)) * lenght + shardCenter.x)
		V1.setAttribute('y1', parseInt(shardCenter.y - i*verticalGridDistance))
		V1.setAttribute('y2', Math.sin(toRadians(-60)) * lenght + shardCenter.y - i*verticalGridDistance)
		V1.setAttribute('stroke', 'gray')
		V1.setAttribute('stroke-width',0.2)

		var V2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
		V2.setAttribute('x1', parseInt(shardCenter.x))
		V2.setAttribute('x2', Math.cos(toRadians(-120)) * lenght + shardCenter.x)
		V2.setAttribute('y1', parseInt(shardCenter.y - i*verticalGridDistance))
		V2.setAttribute('y2', Math.sin(toRadians(-120)) * lenght + shardCenter.y - i*verticalGridDistance)
		V2.setAttribute('stroke', 'gray')
		V2.setAttribute('stroke-width',0.2)

		shardGridGroup.appendChild(V1)
		shardGridGroup.appendChild(V2)


			// A lines

		var A1 = document.createElementNS("http://www.w3.org/2000/svg", "line")
		A1.setAttribute('x1', parseInt(shardCenter.x))
		A1.setAttribute('x2', Math.cos(toRadians(60)) * lenght + shardCenter.x)
		A1.setAttribute('y1', parseInt(shardCenter.y - i*verticalGridDistance))
		A1.setAttribute('y2', Math.sin(toRadians(60)) * lenght + shardCenter.y - i*verticalGridDistance)
		A1.setAttribute('stroke', 'gray')
		A1.setAttribute('stroke-width',0.2)

		var A2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
		A2.setAttribute('x1', parseInt(shardCenter.x))
		A2.setAttribute('x2', Math.cos(toRadians(120)) * lenght + shardCenter.x)
		A2.setAttribute('y1', parseInt(shardCenter.y - i*verticalGridDistance))
		A2.setAttribute('y2', Math.sin(toRadians(120)) * lenght + shardCenter.y - i*verticalGridDistance)
		A2.setAttribute('stroke', 'gray')
		A2.setAttribute('stroke-width',0.2)

		shardGridGroup.appendChild(A1)
		shardGridGroup.appendChild(A2)



				// horizontal lines
		var H = document.createElementNS("http://www.w3.org/2000/svg", "line")
		H.setAttribute('x1', parseInt(shardCenter.x) - 300)
		H.setAttribute('x2', parseInt(shardCenter.x) + 300)
		H.setAttribute('y1', parseInt(shardCenter.y) - i*verticalGridDistance/2)
		H.setAttribute('y2', parseInt(shardCenter.y) - i*verticalGridDistance/2)
		H.setAttribute('stroke', 'gray')
		H.setAttribute('stroke-width',0.2)

		shardGridGroup.appendChild(H)

	}



	shard.appendChild(shardGridGroup)
}

generateShardGrid(60)




var shardMainGroup = document.getElementById("shardMainGroup")

var H = 600;
var W = 600;

var canvas = document.getElementById("canvas")
	canvas.style.width = W + 'px'
	canvas.style.height = H + 'px'

var center = { 
	x: W/2,
	y: H/2
}






var selectedLayerId = null;
var layerSerialNumber = 1; //dont start with 0 cuz if(0)


document.getElementById("drawButton").onclick = function(){
	disposePolyognDrawing();
	delesectAllLayers();
	copyShardToCanvas();
	drawBackgoundPreview();
	shardMainGroup.innerHTML = ""
}


function delesectAllLayers(){
	var layers = document.getElementsByClassName("layer")
	for (var i = 0; i < layers.length; i++) {
	    layers[i].style.border = "dotted 1px gray"
	}

}

function copyShardToCanvas(){

	var shardGroupBounding = shardMainGroup.getBoundingClientRect()
	var shardBounding = shard.getBoundingClientRect()

	var startAngle = 0;
	var currentLayer = layerSerialNumber;
	layerSerialNumber++;

	var layerGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
	layerGroup.setAttribute('layerId', currentLayer)

	for(var i = 0; i < 6; i++){
		var c = document.createElementNS("http://www.w3.org/2000/svg", "g")
		
		var angle = startAngle + i*60

		c.innerHTML = shardMainGroup.innerHTML

		c.setAttribute("transform-origin",shardCenter.x + " " + shardCenter.y)
		console.log(W/shardW * shardCenter.x / 2)
		c.setAttribute("transform", ' translate(114,-180) rotate('+angle+')')
		layerGroup.appendChild(c)
	}

	canvas.appendChild(layerGroup);


	var layer = document.createElement("div")
	layer.style.width = layer.style.height = "50px";
	layer.style.display = "inline-block"
	layer.className = "layer"
	layer.setAttribute("layerId", currentLayer)
	layer.style.border = "solid black 1px"
	layer.onclick = function(){
		delesectAllLayers();
		layer.style.border = "solid 1px black"
		selectedLayerId = currentLayer
	}
	selectedLayerId = currentLayer

	document.getElementById("layersSpan").appendChild(layer);


	var miniSvg = document.createElementNS("http://www.w3.org/2000/svg","svg")
	miniSvg.style.width = layer.style.width
	miniSvg.style.height = layer.style.height

	var g = document.createElementNS("http://www.w3.org/2000/svg", "g")
	g.style.transform = "scale("+ (50 / W) + "," + (50 / H) + ")"
	g.innerHTML = layerGroup.innerHTML
	
	miniSvg.appendChild(g)	

	layer.appendChild(miniSvg)




}


function getAllElementsWithAttribute(attribute, value)
{
  var matchingElements = [];
  var allElements = document.getElementsByTagName('*');
  for (var i = 0, n = allElements.length; i < n; i++)
  {
  	var attr = allElements[i].getAttribute(attribute)
    if (attr && attr == value)
    {
      // Element exists with attribute. Add to array.
      matchingElements.push(allElements[i]);
    }
  }
  return matchingElements;
}


document.addEventListener('keydown', function (e) {
     if(e.key == "Delete" && selectedLayerId){
     	var elems = getAllElementsWithAttribute("layerId", selectedLayerId)
     	for(var i = 0; i < elems.length; i++){
     		elems[i].parentNode.removeChild(elems[i])
     	}
     	drawBackgoundPreview()
     }
     if(e.key == "ArrowLeft" && selectedLayerId){
     	var layer = document.getElementById("layerId")
     	var previousLayer = layer.previousElementSibling()
     	console.log(layer)
     	console.log(previousLayer)
     	if(layer && previousLayer){
     		layer.parentNode.insertBefore(layer, previousLayer)
     	}

     }
}, false);


document.getElementById("clearShardButton").onclick = function(){
	disposePolyognDrawing();
	shardMainGroup.innerHTML = ""
}



var drawingNow = "CIRCLE"  // CIRCLE, POLYGON


var polygonPoints = [];
var polygonTempDotsGroup = null;

shard.onclick = function(e){
	
	var fillColor = document.getElementById("fillColor").style.backgroundColor;
	var strokeColor = document.getElementById("strokeColor").style.backgroundColor;
	var strokeSize = document.getElementById("strokeSize").value;

	var sides = document.getElementById("shard").getBoundingClientRect();
	
	var x = (e.clientX - sides.left);
	var y = (e.clientY - sides.top);

	if(document.getElementById("snapCheckbox").checked){

		var horizontalOneStepLength = 2*verticalGridDistance/2/Math.sqrt(3) 
	
		var wasOnLeftSide = x - shardCenter.x < 0 ? true: false;



		var distanceYFromCenter = Math.abs(y - shardCenter.y)
		var modY = distanceYFromCenter % (verticalGridDistance/2)

		if(modY < verticalGridDistance/4){
			y = shardCenter.y - distanceYFromCenter + modY
		}else{
			y = shardCenter.y - distanceYFromCenter - verticalGridDistance/2 + modY
		}





		//lets calculate everything on positive (right) side of shard
		var distanceXFromCenter = Math.abs(x - shardCenter.x)
		x = shardCenter.x + distanceXFromCenter
		var modX = distanceXFromCenter % (horizontalOneStepLength/2)
		if(modX < horizontalOneStepLength/4){
			x = x - modX
		}else{
			x = x + horizontalOneStepLength/2 - modX
		}

		if(wasOnLeftSide)
			x = x - 2*(x - shardCenter.x)

	}


	if(document.getElementById("circleOption").checked){
		disposePolyognDrawing();

		var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")

		circle.setAttribute("fill",fillColor)
		circle.setAttribute("stroke",strokeColor)
		circle.setAttribute("stroke-width",strokeSize)

		circle.setAttribute("cx",x)
		circle.setAttribute("cy",y)
		circle.setAttribute("r",document.getElementById("circleSize").value)

		shardMainGroup.appendChild(circle)

		if(document.getElementById("mirrorCheckbox").checked){
			var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
		
			circle.setAttribute("fill",fillColor)
			circle.setAttribute("stroke",strokeColor)
			circle.setAttribute("stroke-width",strokeSize)

			var centerDistance = Math.abs(x - shardCenter.x)
			if(x < shardCenter.x)
				circle.setAttribute("cx",shardCenter.x + centerDistance)
			else
				circle.setAttribute("cx",shardCenter.x - centerDistance)
			circle.setAttribute("cy",y)
			circle.setAttribute("r",document.getElementById("circleSize").value)

			shardMainGroup.appendChild(circle)
						
		}	
	}

	if(document.getElementById("polygonOption").checked){
		if(!polygonTempDotsGroup){
			polygonTempDotsGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
			shardMainGroup.appendChild(polygonTempDotsGroup)
		}

		var some = polygonPoints.some(p => 
			Math.sqrt( Math.pow(x - p.x,2) + Math.pow(y - p.y,2)) < 4
		)

		if(some){ //draw polygon
			var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
			polygon.setAttribute("points", polygonPointsToSvgPointNotation())
			polygon.setAttribute("style", "fill:"+fillColor+";stroke:"+strokeColor+";stroke-width:"+strokeSize)
			shardMainGroup.appendChild(polygon)

			if(document.getElementById("mirrorCheckbox").checked){
				var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
				polygon.setAttribute("points", mirrorPolygonPoints())
				polygon.setAttribute("style", "fill:"+fillColor+";stroke:"+strokeColor+";stroke-width:"+strokeSize)
				shardMainGroup.appendChild(polygon)

			}

			disposePolyognDrawing()

		}else{

			var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
			circle.setAttribute("cx",x)
			circle.setAttribute("cy",y)
			circle.setAttribute("r",2)

			polygonTempDotsGroup.appendChild(circle)
			polygonPoints.push({x: x, y: y})
		
		}




	}
}


function drawBackgoundPreview(){
	var preview = document.getElementById("backgoundPreview")
	preview.innerHTML = ""

	var everything = document.createElementNS("http://www.w3.org/2000/svg", "g")
	everything.innerHTML = canvas.innerHTML

	everything.setAttribute("transform", ' translate('+ -(center.x - shardCenter.x) +','+ -(center.y - shardCenter.y) +')') //id why 10 is needed but it is

	preview.appendChild(everything)


}


function disposePolyognDrawing(){
	polygonPoints = []
	if(polygonTempDotsGroup)
			polygonTempDotsGroup.parentNode.removeChild(polygonTempDotsGroup)
	polygonTempDotsGroup = null
}

function polygonPointsToSvgPointNotation(){
	return polygonPoints.map(p => p.x + "," + p.y).join(" ")
}

function mirrorPolygonPoints(){
	return polygonPoints.map(p => {
		var centerDistance = Math.abs(p.x - shardCenter.x)
		if(p.x < shardCenter.x)
			p.x = shardCenter.x + centerDistance
		else
			p.x = shardCenter.x - centerDistance

		return p
	}).map(p => p.x + "," + p.y).join(" ")
}















/*

//ukras

function janjax(url) {
  return new Promise( function(resolve, reject) {
  	  	var xhttp = new XMLHttpRequest();
	  	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
      		resolve(this.responseText)
		}
  };
  xhttp.open("GET", url, true);
  xhttp.send();

  });
}


janjax("/decoration1.svg").then(a => console.log(a))*/



function downloadSvg(){
	//get svg element.
	var svg = canvas;
	console.log("downloading")
	//get svg source.
	var serializer = new XMLSerializer();
	var source = serializer.serializeToString(svg);

	//add name spaces.
	if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
	    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
	}
	if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
	    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
	}

	//add xml declaration
	source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

	//convert svg source to URI data scheme.
	var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

	var imgToDownload = document.getElementById("downloadImage")
	imgToDownload.src = url
	imgToDownload.width = W
	imgToDownload.height = H

	location.href = "#"
	location.href = "#downloadImage"
}