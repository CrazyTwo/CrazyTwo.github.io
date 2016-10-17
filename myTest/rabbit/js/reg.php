
<?php 

	$conn = mysqli_connect('localhost','root','','jc');

	$conn -> query("set names utf8");
	
	$act = $_POST['act'];

	switch($act)
	{
		case 'check':
			$name = $_POST['name'];
			$sql = "SELECT * FROM user2 WHERE name='{$name}'";

			$conn->query($sql);

			if(mysqli_affected_rows($conn)>0){
				echo '{"error":"1"}';
			}
			else{
				echo '{"error":"0"}';
			}

		break;

		case 'add':
			$name = $_POST['name'];
			$pwd = md5($_POST['pwd']);
			$sql = "INSERT INTO user2(name,pwd) VALUES ('{$name}','{$pwd}')";

			$conn->query($sql);

			if(mysqli_affected_rows($conn)>0){
				echo '{"error":"1"}';
			}
			else{
				echo '{"error":"0"}';
			}


		break;
	}
?>