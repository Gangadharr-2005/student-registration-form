$(document).ready(function() {

 function isValidEmail(email) {
    var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    return pattern.test(email);
}

  // Real-time validation
  $("#regForm input, #regForm select").on("blur change", function() {
    if ($(this).val().trim() === "") {
      $(this).css("border-color", "red");
    } else {
      $(this).css("border-color", "green");
    }
  });

  // Email validation
  $("#email").keyup(function() {
    let email = $(this).val();
    if(email !== "" && isValidEmail(email)) {
      $(this).css("border-color", "green");
      $("#errorMsg").text("");
    } else {
      $(this).css("border-color", "red");
      $("#errorMsg").text("⚠️ Please enter a valid email!");
    }
  });

  // Live Preview of Name
  $("#fullname").keyup(function() {
    let name = $(this).val();
    if (name.length > 0) {
      $("#previewBox").slideDown();
      $("#previewName").text("👋 Hello, " + name + "!");
    } else {
      $("#previewName").text("");
    }
  });

  // Image preview
  $("#photo").change(function(e) {
    let reader = new FileReader();
    reader.onload = function(e) {
      $("#previewImg").attr("src", e.target.result).fadeIn();
      $("#previewBox").slideDown();
    };
    reader.readAsDataURL(this.files[0]);
  });

  // Conditional Submit Button
  $("#agree").change(function() {
    $("button").prop("disabled", !$(this).is(":checked"));
  }).trigger("change");

  // Form Submit Validation + Animation
  $("#regForm").submit(function(e) {
    e.preventDefault();
    let valid = true;

    $("#regForm input, #regForm select").each(function() {
      if ($(this).val().trim() === "") {
        valid = false;
        $(this).css("border-color", "red");
      }
    });

    let email = $("#email").val().trim();
    if(email === "" || !isValidEmail(email)) {
      valid = false;
      $("#email").css("border-color", "red");
      $("#errorMsg").text("⚠️ Please enter a valid email!");
    }

    if (!valid) {
      $(".container").animate({ left: "-10px" }, 100)
                     .animate({ left: "10px" }, 100)
                     .animate({ left: "0px" }, 100);
      return;
    }

    $("#errorMsg").text("");

    if (confirm("Are you sure you want to submit your registration?")) {
      $(".container").animate({
        opacity: 0.5,
        width: "350px"
      }, 600).animate({
        opacity: 1,
        width: "400px"
      }, 600, function() {
        $("h1").text("⏳ Processing your registration...");
        setTimeout(() => {
          $("#regForm")[0].submit();
        }, 1000);
      });
    }
  });
});
