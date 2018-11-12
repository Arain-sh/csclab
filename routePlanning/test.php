<!DOCTYPE html>
<html>
	<style>
		.error {color: #FF0000;}
	</style>
	<body>
		<?php
			$nameErr = $emailErr = $genderErr = $websiteErr = "";
			$name = $email = $website = $comment = $gender = "";
			if ($_SERVER["REQUEST_METHOD"] == "POST") {
				if (empty($_POST["name"])) {
					$nameErr = "Name is required";
				}
				else {
					$name = test_input($_POST["name"]);
				}
				if (empty($_POST["email"])) {
					$emailErr = "Email is required";
				}
				else {
					$email = test_input($_POST["email"]);
				}
				if (empty($_POST["website"])) {
					$websiteErr = "Website is required";
				}
				else {
					$website = test_input($_POST["website"]);
				}
				$comment = test_input($_POST["comment"]);
				if (empty($_POST["gender"])) {
					$genderErr = "Gender is required";
				}
				else {
					$gender = test_input($_POST["gender"]);
				}
			}
			function test_input($data) {
				$data = trim($data);
				$data = stripslashes($data);
				$data = htmlspecialchars($data);
				return $data;
			}
		?>
		
		<h2>表单测试</h2>
		<p><span class = "error">* 必需的字段</span></p>
		<form method = "post" action = "<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
			姓名： <input type = "text" name = "name">
			<span class = "error">* <?php echo $nameErr; ?></span>
			<br><br>
			邮件： <input type = "text" name = "email">
			<span class = "error">* <?php echo $emailErr; ?></span>
			<br><br>
			网址： <input type = "text" name = "website">
			<span class = "error">* <?php echo $websiteErr; ?></span>
			<br><br>
			评论： <textarea name = "comment" rows = "5" cols = "40"></textarea> <br><br>
			性别：
				<input type = "radio" name = "gender" value = "female">女性
				<input type = "radio" name = "gender" value = "male">男性
				<span class = "error">* <?php echo $genderErr; ?></span>
				<br><br>
			<input type = "submit" name = "submit" value = "Submit">
		</form>
			
		<?php
			echo "<h2> Your Input: </h2>";
			echo $name;
			echo "<br>";
			echo $email;
			echo "<br>";
			echo $website;
			echo "<br>";
			echo $comment;
			echo "<br>";
			echo $gender;
			
			$python = `python test.py`;
			echo $python;
		?>
		
	</body>
</html>