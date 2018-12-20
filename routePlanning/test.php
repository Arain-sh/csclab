<!DOCTYPE html>
<html>

<head>
	<meta charset = "utf-8" name = "viewport" content = "width = device-width, initial-scale = 1.0">
	<title>Simple Navigating System</title>
	<link href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
	<script src="https://cdn.staticfile.org/jquery/2.0.0/jquery.min.js"></script>
	<script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>

<style>
	header {
		background-color: AliceBlue;
		color: MidnightBlue;
		text-align: center;
		padding: 5px;
	}
		
	.lineH {
		line-height: 28px;
	}
	
	.bgcolor {
		background-color: AliceBlue;
	}
	
</style>

<body class = "bgcolor">
	<?php
		$x1 = $y1 = $x2 = $y2 = $time = "";
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
			$x1 = test_input($_POST["startX"]);
			$y1 = test_input($_POST["startY"]);
			$x2 = test_input($_POST["endX"]);
			$y2 = test_input($_POST["endY"]);
			$time = test_input($_POST["time"]);
			
		}
		function test_input($data) {
			$data = trim($data);
			$data = stripslashes($data);
			$data = htmlspecialchars($data);
			return $data;
		}
	?>
	
	<header> <h1>Simple Routing System</h1> </header>
	<br>
	<div class = "col-lg-offset-1 col-sm-3 col-md-3 col-lg-3">			
		<form class = "form-horizontal" role = "form" action = "<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" method = "post"> 
			<h3>Search Module</h3> <br>
			<h4>StartPoint</h4>
			<div class = "form-group">
			<label class = "col-lg-1 control-label">X</label>
			<div class = "col-lg-2"><input type = "text" class = "form-control" name = "startX"></div>
			<label class = "col-lg-1 control-label">Y</label>
			<div class = "col-lg-2"><input type = "text" class = "form-control" name = "startY"></div>
			</div>
			
			<h4>EndPoint</h4>			
			<div class = "form-group">
			<label class = "col-lg-1 control-label">X</label>
			<div class = "col-lg-2"><input type = "text" class = "form-control" name = "endX"></div>
			<label class = "col-lg-1 control-label">Y</label>
			<div class = "col-lg-2"><input type = "text" class = "form-control" name = "endY"></div>			
			
			</div>
			<div class = "form-group">
			<label class = "col-lg-1 control-label">TIME</label>
			<div class = "col-lg-5"><input type = "text" class = "form-control" name = "time"></div>
			<div class = "col-lg-2"><input type = "submit" class = "btn" value = "SEARCH"></div>
			</div>			
			<p>(Note: The StartPoint and EndPoint must be integers, range from 0 to 59, 
			and the time should be "xx:xx", such as 08:00)</p><br>
		
		<?php
		exec("python3 test1218.py");
		echo $x1."\n";
		echo $y1."\n";
		echo $x2."\n";
		echo $y2."\n";
		echo $time;
		?>
		</form>		
	</div>
	
	
	<div class = "col-sm-8 col-md-8 col-lg-8">
		<script src="http://d3js.org/d3.v3.min.js" charset="utf-8" ></script>
		<script>
			var width = 1080;
			var height = 1080;
			
			var xScale = d3.scale.linear()
						.domain([-13000,18000])
						.range([0,width]);
						
			var yScale = d3.scale.linear()
						.domain([-13000,16000])
						.range([0,height]);
						
			var zoom = d3.behavior.zoom()
						.scaleExtent([1,10])
						.scale(1)
						.translate([0,0])
						.on("zoom",zoomed);
			function zoomed() {
				d3.select(this)
				.attr("transform","translate("+d3.event.translate+")scale("+d3.event.scale+")");
			}
			
			var svg = d3.select("body")
					.append("svg")
					.attr("width", width)
					.attr("height", height)				
					.attr("transform", "translate(0, 0)");		
			
			d3.json("district.json", function(error, data){
				if (error)
					return console.error(error);
				console.log(data.features);
				
				svg .append("g")
					.call(zoom)
				    .selectAll("polygon")
					.data(data.features)
					.enter()
					.append("polygon")
					.attr("stroke", "#000")
					.attr("stroke-width", 0.3)
					.attr("fill", "#FAEBD7")
					.attr("opacity", 0.5)
					.attr("points", function(d) {
						return d.points.map(
							function(d) {return [xScale(d[0]), height - yScale(d[1])].join(",");}
							).join(" ");
					})
					.append("title")
					.text(function(d) {return d.properties.名称;});
			});	
		</script>
	</div>
</body>

</html>