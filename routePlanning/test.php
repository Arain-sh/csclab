<!DOCTYPE html>
<html>
	<body>
		<h1>表单测试</h1>
		<form method = "post" action = "<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
			Name: <input type = "text" name = "name">
			Email: <input type = "text" name = "email">
			Website: <input type = "text" name = "website">
			Comment: <textarea name = "comment" rows = "5" cols = "40"></textarea>
			Gender:
				<input type = "radio" name = "gender" value = "female">Female
				<input type = "radio" name = "gender" value = "male">Male
		</form>
		
		<?php
			$name = $email = $website = $comment = $gender = "";
			if ($_SERVER["REQUEST_METHOD"] == "POST") {
				$name = test_input($_POST["name"]);
				$email = test_input($_POST["email"]);
				$website = test_input($_POST["website"]);
				$comment = test_input($_POST["comment"]);
				$gender = test_input($_POST["gender"]);
			}
			function test_input($data) {
				$data = trim($data);
				$data = stripslashes($data);
				$data = htmlspecialchars($data);
				return $data;
			}
		?>
	</body>
</html>