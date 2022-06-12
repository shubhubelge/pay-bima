$(document).ready(function()
			{
				$("#contact_no").change(function()
				{ 
					var contact_no = $("#contact_no").val();

					var user_id = '';

					//alert(contact_no);

					if(contact_no.length === 10)
					{
						$.ajax({  
									type: "POST",  
									url: "remote.php",  
									data: "contact_no="+contact_no+'&user_id='+user_id+'&action=chkusercontact',  
									success: function(result)
									{  
										var JSONObject = JSON.parse(result);

										var rslt = JSONObject[0]['status'];
										var msg = JSONObject[0]['msg'];

										if(rslt === "1")
										{ 
											BootstrapDialog.show(
											{
												title: '<center>Error' +" "+" "+'Response</center>',
												message:msg
											});
										}  
									} 
								}); 
					}
					else 
					{
						BootstrapDialog.show(
						{
							title: '<center>Error' +" "+" "+'Response</center>',
							message:'<font color = "red" size = "4"><b><center>Enter 10 Digit Mobile No</center></b></font>'
						});
					}
				});

				$("#email").change(function()
				{ 
					var email = $("#email").val();

					var user_id = '';

					$.ajax({  
									type: "POST",  
									url: "remote.php",  
									data: "email="+email+'&user_id='+user_id+'&action=chkuseremail',  
									success: function(result)
									{  
										var JSONObject = JSON.parse(result);

										var rslt = JSONObject[0]['status'];
										var msg = JSONObject[0]['msg'];

										if(rslt === "1")
										{ 
											BootstrapDialog.show(
											{
												title: '<center>Error' +" "+" "+'Response</center>',
												message:msg
											});
										}  
									} 
								});
				});
				
				
			});
		
			

			function add()
			{
				
              var contact_form = $('#contact_form').serialize();

              var dataString = contact_form+'&action=add_data';

              $.ajax({

                          type: "POST",
                          url: 'add.php', 
                          data: dataString,
                          cache: false,

                          success: function(result)
                          {

                              var JSONObject = JSON.parse(result);

                              var rslt = JSONObject[0]['status'];

                              var msg = JSONObject[0]['msg'];
                              
                              if(rslt == '0')
                              {
                                window.location = 'thankyou.html';
                                document.getElementById("error").style.display = "none";
                                  //document.getElementById("success").style.display = "block";
                                  $("#success").fadeOut(2000);
                                  $('#contact_form')[0].reset();
                              }
                              else 
                              {
                                  //document.getElementById("success").style.display = "none";
                                  document.getElementById("error").style.display = "block";
                                  document.getElementById("error").innerHTML = msg;
                                  $("#error").fadeOut(2000);
                              }
                          }
                      });
          }
		  
		function onlyNumbers(evt)
		{
			var e = window.event || evt; // for trans-browser compatibility
			var charCode = e.which || e.keyCode;

			if (charCode > 31 && (charCode < 45 || charCode > 57 ))
				   return false;

			return true;
		}
		
		function testInput(event)
		{
		   var value = String.fromCharCode(event.which);
		   var pattern = new RegExp(/[a-zåäö ]/i);
		   return pattern.test(value);
		}

$('#name').bind('keypress', testInput);
