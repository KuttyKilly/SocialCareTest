//Header set Access-Control-Allow-Origin "http://softwarehuttest.x10.mx/public/account/login/"    
//LOGGING IN AND GOING TO HOME PAGE ON SUCCESS
$(document).on("pageinit", "#loginForm", function () {
    $("#form1").on("submit", function (event) {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: "http://softwarehuttest.x10.mx/public/account/login/",
            data: $("#form1").serialize(),
            success: function (data) {
                console.log(data);
                if (data.loggedIn) {
                    $.mobile.changePage("#home");
                } else {
                    alert("You entered the wrong username or password. Please try again.");
                }
            }
        });
    });
});

$(document).ready( function() {     
    var listDescription;
    var listDescription1;
    var payment;
    var payment1;

    //expense page ACCESS SET METHOD
    $('#add_list').click( function() {
       
        listDescription = $('#list_description').val();
        payment = $('#payment').val();      
        $('.expense_list').prepend('<div>' + "\u00A3 "  + listDescription + "\t\t\t" + payment + "\t" + '</div>');
        //end of append

        //sending the expense list information to the server each time it is added.
        $.ajax({
            url: "http://softwarehuttest.x10.mx/public/user/spent",
            data: {
                amount: listDescription,
                account: payment
                  },
            type: "GET",
            dataType:'json',
            async:true,
            cache:false,
            success: function (data) {
                alert(data.status); 
            },
            error: function (xhr, status, error) {
                alert(error);  
            }
        });
 
        $('#list_form')[0].reset();
        return false;                           
    });     

    //earnings page ACCESS SET METHOD
    $('#add_list1').click( function() {

        //appending information to the list in earnings page
        listDescription1 = $('#list_description1').val();
        payment1 = $('#payment1').val();      
        $('.expense_list1').prepend('<div>' + "\u00A3 "  + listDescription1 + "\t\t\t" + payment1 + '</div>');
        //end of append
        
        //sending the earnings list information to the server each time it is added.
        /*
        $.ajax({
            url: "http://softwarehuttest.x10.mx/public/user/spent",
            data: {
                amount: listDescription1,
                account: payment1
                  },
            type: "GET",
            dataType:'json',
            async:true,
            cache:false,
            success: function (data) {
                alert("success"); //just a debugging line. should be removed.
            },
            error: function (xhr, status, error) {
                alert(error); //just a debugging line. should be removed. 
            }
        });
        */

        ////

        $.getJSON("http://softwarehuttest.x10.mx/public/user/income", {
            amount: listDescription1,
            account: payment1
        }, function(data) {
            alert(data.status);
        }).fail(function() {
            alert("error");
        })

        ////

        $('#list_form1')[0].reset();
        return false;                           
    });     
}); 
//END OF SET METHOD ACCESS

//refreshed everytime page created (mainly for benefits/ bills page) //CURRENTLY NOT USING
$(document).on("pagecreate",function(){
    });//end of page create
    
  //UPDATING THE BILLS PAGE WITH INFO FROM DATABASE // ACCESSING GET METHOD   
  //WORKS FINE
  $.getJSON("http://softwarehuttest.x10.mx/public/user/listbills/",function(data){
        //Loop for each element on the data
        $.each(data,function(elem){
            var wrap = $("<div/>").attr('data-role', 'collapsible');
            //Create the h1 and the other elements appending them to bills List
            $("<h1/>",{
                text:data[elem].reference
            }).appendTo(wrap);
            
            $("<p/>",{
                text:"Date: "+ data[elem].due.date
            }).appendTo(wrap);
            
            $("<p/>",{
                text:"Days: "+ data[elem].due.days
            }).appendTo(wrap);
            
            $("<p/>",{
                text:"Amount: "+ data[elem].amount
            }).appendTo(wrap);
            wrap.appendTo('#billsList');    
        })//end of for each loop
        $( "#billsList" ).collapsibleset( "refresh" );
    })//end of bills page update
  
  
//UPDATING BENEFITS PAGE WITH INFO FROM DATABASE
//WORKS FINE
$.getJSON("http://softwarehuttest.x10.mx/public/user/listincome/", function (data) {
    //Loop for each element on the data
    $.each(data, function (elem) {
        var wrap = $("<div/>").attr('data-role', 'collapsible');
        //Create the h1 and the other elements appending them to benefits List
        $("<h1/>", {
            text: data[elem].reference
        }).appendTo(wrap);

        $("<p/>", {
            text: "Date: " + data[elem].due.date
        }).appendTo(wrap);

        $("<p/>", {
            text: "Days: " + data[elem].due.days
        }).appendTo(wrap);

        $("<p/>", {
            text: "Amount: " + data[elem].amount
        }).appendTo(wrap);
        wrap.appendTo('#benefitsList');
    });//end of for loop
    $( "#benefitsList" ).collapsibleset( "refresh" );
});//end of benefits page update

//UNPAID BILLS
$.getJSON("http://softwarehuttest.x10.mx/public/user/listunpaidbills/",function(data){
        //Loop for each element on the data
        $.each(data,function(elem){
            var wrap = $("<div/>").attr('data-role', 'collapsible');
            //Create the h1 and the other elements appending them to bills List
            $("<h1/>",{
                text:data[elem].reference
            }).appendTo(wrap);   
            $("<p/>",{
                text:"Account: "+ data[elem].account
            }).appendTo(wrap);        
            $("<p/>",{
                text:"Amount: "+ data[elem].amount
            }).appendTo(wrap);
            wrap.appendTo('#unpaidList');    
        })//end of for each loop
        $( "#unpaidList" ).collapsibleset( "refresh" );
    })//end of unpaid bills page update
////////////////////////////////////////////////////////////////////////////////


//Budget
/*
$.getJSON( "http://softwarehuttest.x10.mx/public/user/balance/", function( data ) {
    var wrap = '<div data-role="page">' +
               '<p>Bank: ' + data.bank + '</p>' +
               '<p>Cash: ' + data.cash + '</p>' +
               '<p>Daily Budget: ' + data.daily_aim + '</p>' +
               '<p>Todays Expense: ' + data.spent_today + '</p>' +
               '</div>';

    $('#budgetList').html(wrap); 
});
*/

$.getJSON("http://softwarehuttest.x10.mx/public/user/listunpaidbills/",function(data){
        //Loop for each element on the data
        $.each(data,function(elem){
            var wrap = $("<div/>").attr('data-role', 'collapsible');
            //Create the h1 and the other elements appending them to bills List
            $("<h1/>",{
                text:data[elem].reference
            }).appendTo(wrap);   
            $("<p/>",{
                text:"Account: "+ data[elem].account
            }).appendTo(wrap);        
            $("<p/>",{
                text:"Amount: "+ data[elem].amount
            }).appendTo(wrap);
            wrap.appendTo('#budgetList');    
        })//end of for each loop
        $( "#budgetList" ).collapsibleset( "refresh" );


//back button for all pages less home
$.mobile.page.prototype.options.addBackBtn = "true"; 
$.mobile.page.prototype.options.backBtnText = "Go Back";

