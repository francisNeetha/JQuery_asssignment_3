$(document).ready(function(){
    $("#nameError").hide();
    $("#mailError").hide();
    $("#feedbackError").hide();
   
    $("#detailsForm").on("submit" ,function(event){
        event.preventDefault();
        let name = $("#fname").val();
        let mail = $("#email").val();
        let feedback =  $("#feedback").val();
        console.log(!name);
        let valid = true;
        if(name === ""){
            $("#nameError").show();
            valid = false;
        }else{
            $("#nameError").hide();
        }

        if(mail === "" && IsEmail(mail)){
            $("#mailError").show();
            valid = false;
        }else{
            $("#mailError").hide();
        }

        if(feedback === ""){
            $("#feedbackError").show();
            valid = false;
        }else{
            $("#feedbackError").hide();
        }

        if(valid){
            const details = {
                Name: name,
                Email: mail,
                Feedback: feedback
            }

            $.ajax({
                url: 'https://jsonplaceholder.typicode.com/posts',
                type: 'POST',
                data: JSON.stringify(details),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(data, textStatus, jQxhr){
                    $(".status").text("Status: " + "SUCCESS!");
                    $(".data").text(JSON.stringify(data));
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    $(".status").text("Status: " + "FAILED");
                    console.log(errorThrown);
                }
            });
            
            console.log(details);
            $("#detailsForm")[0].reset();;
            alert("form submitted successful");
        }

    });
    function IsEmail(email) {
        const regex =/^([a-zA-Z0-9_\.\-\+]) + \@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return !regex.test(email) ? "false" : "true" ;
    }
});