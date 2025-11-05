<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $fullname = htmlspecialchars($_POST['fullname']);
  $email = htmlspecialchars($_POST['email']);
  $gender = htmlspecialchars($_POST['gender']);
  $course = htmlspecialchars($_POST['course']);
  $year = htmlspecialchars($_POST['year']);
  $skills = htmlspecialchars($_POST['skills']);

  // Handle photo upload
  $photoPath = "";
  if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
      $target_dir = "uploads/";
      if(!is_dir($target_dir)){
          mkdir($target_dir, 0777, true);
      }
      $target_file = $target_dir . basename($_FILES["photo"]["name"]);
      move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file);
      $photoPath = $target_file;
  }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Registration Successful</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>✅ Registration Successful!</h1>

    <?php if($photoPath != ""): ?>
      <img src="<?php echo $photoPath; ?>" alt="Profile Photo" class="profile-photo">
    <?php endif; ?>

    <p><strong>Name:</strong> <?php echo $fullname; ?></p>
    <p><strong>Email:</strong> <?php echo $email; ?></p>
    <p><strong>Gender:</strong> <?php echo $gender; ?></p>
    <p><strong>Course:</strong> <?php echo $course; ?></p>
    <p><strong>Year:</strong> <?php echo $year; ?></p>
    <p><strong>Skills:</strong> <?php echo $skills; ?></p>

    <a href="index.html"><button>Go Back</button></a>
  </div>
</body>
</html>
