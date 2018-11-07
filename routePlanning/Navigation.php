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
		$x1 = $y1 = $x2 = $y2 = $mode = $status = "";
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
			$x1 = test_input($_POST["startX"]);
			$y1 = test_input($_POST["startY"]);
			$x2 = test_input($_POST["endX"]);
			$y2 = test_input($_POST["endY"]);
			$mode = test_input($_POST["mode"]);
			$status = test_input($_POST["TrafficStates"]);
		}
		function test_input($data) {
			$data = trim($data);
			$data = stripslashes($data);
			$data = htmlspecialchars($data);
			return $data;
		}
	?>
	
	<header> <h1>Simple Navigating System</h1> </header>

	<div class = "col-lg-offset-1 col-sm-3 col-md-3 col-lg-3">			
		<form class = "form-horizontal" role = "form" action = "<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" method = "post"> 
			<h3>Search Module</h3>
			<h4>StartPoint</h4>
			<div class = "form-group">
			<label class = "col-lg-1 control-label">X</label>
			<div class = "col-lg-2"><input type = "text" class = "form-control" name = "startX" size = "3"></div>
			<label class = "col-lg-1 control-label">Y</label>
			<div class = "col-lg-2"><input type = "text" class = "form-control" name = "startY" size = "3"></div>
			</div>
			
			<h4>EndPoint</h4>			
			X: <input type = "text" name = "endX" size = "3"> &nbsp;
			Y: <input type = "text" name = "endY" size = "3">
			<input type = "submit" value = "SEARCH">  <br>
			
			<span style = "line-height:35px">
			<input type = "radio" name = "mode" value = "path first">PathFirst
			<input type = "radio" name = "mode" value = "time first">TimeFirst	</span>	<br>
			</span><br>	
			
			<small>(Note: The StartPoint and EndPoint must be integers, range from 0 to 59)</small><br><br>
			
			<p><b>Traffic States Viewing</b></p>
			<select name = "TrafficStates">
				<option value = "-1"> </option>
				<option value = "0">Currently</option>
				<option value = "5">5 minutes Later</option>
				<option value = "10">10 minutes Later</option>
				<option value = "20">20 minutes Later</option>
			</select> <br>
			<?php
				echo "The StartPoint is: ".$x1." ".$y1."<br>";
				echo "The EndPoint is: ".$x2." ".$y2."<br>";
				echo "The Mode is: ".$mode."<br>";
				echo "The traffic state view choose ".$status; 
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
						
			var svg = d3.select("body")
					.append("svg")
					.attr("width", width)
					.attr("height", height)
					.append("g")
					.attr("transform", "translate(0, 0)");		
			
			d3.json("district.json", function(error, data){
				if (error)
					return console.error(error);
				console.log(data.features);
				
				svg.selectAll("polygon")
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
					});
			});
							
			d3.json("main2015.json", function(error, root){
				if (error)
					return console.error(error);
				console.log(root.features);
				
				svg	.append("g")
					.selectAll("polygon")
					.data(root.features)
					.enter()
					.append("polygon")
					.attr("stroke", "#000")
					.attr("stroke-width", 0.1)
					.attr("fill", "#00FF00")
					.attr("points", function(d) {
						return d.points.map(
							function(d) {return [xScale(d[0]), height - yScale(d[1])].join(",");}
							).join(" ");
					})
					.on("mouseover", function(d,i){return d3.select(this).attr("fill","yellow");})
					.on("mouseout", function(d,i){return d3.select(this).attr("fill","#00FF00");});
			});

		</script>
	</div>
</body>

</html>