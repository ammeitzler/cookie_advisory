//list of class names often found in cookie popups
var cookie_classes = [".SCK_BannerContainer",".cbd-body div.text"]
var cookie_array = ["cook1.png", "cook15.png", "cook20.png", "cook26.png", 
"cook31.png", "cook37.png", "cook42.png", "cook6.png", "cook10.jpeg", "cook16.png", 
"cook21.png", "cook27.jpg", "cook32.png", "cook38.png", "cook43.png", "cook7.png", 
"cook11.jpg", "cook17.png", "cook22.png", "cook28.jpg", "cook33.png", "cook39.png", 
"cook44.png", "cook8.jpg", "cook12.jpeg", "cook18.png", "cook23.png", 
"cook34.png", "cook4.jpg", "cook45.png", "cook9.jpg", "cook13.jpeg", "cook19.png", 
"cook24.png", "cook3.jpg", "cook35.png", "cook40.png", "cook46.png", "cook14.png", 
"cook30.png", "cook36.png", "cook41.png", "cook5.jpg"]

//loop through cookie array and add cookieimage
var blurImage = function(){
    console.log("ran blur image")

    cookie_classes.forEach(function (arrayItem) {
        if ($(arrayItem).length > 0) {
            console.log("found")
            $(arrayItem).addClass('cookieimage');
        }
    });
}

//loop through cookie array and remove cookieimage
var unblurImage=function(){
    console.log(" ran remove image")
    
        cookie_classes.forEach(function (arrayItem) {
            if ($(arrayItem).length > 0) {
                console.log("found")
                $(arrayItem).removeClass('cookieimage');
            }
        });
}

//get random element in array
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

var addListeners=function(){
     var myCookie = cookie_array.randomElement();
     var selected_URL = chrome.extension.getURL("images/"+myCookie);
    $( "<style> .cookieimage { background: url(" + selected_URL + ") no-repeat !important; -webkit-background-size: cover !important; -moz-background-size: cover !important; -o-background-size: cover !important; background-size: cover !important; background-position-y: 36% !important; min-height: 250px !important;} </style>" ).appendTo( "head" );
    setTimeout(function(){
        blurImage();
    }, 5000);
 
    // $(window).scroll(function(){
    //     blurImage();
    // });
    // $('.blurimage').click(function(){
    //     $(this).removeClass('.blurimage'); //if user wanted to see image let them click and see
    // });
    // $('.blurthumb').click(function(){
    //     $(this).removeClass('.blurthumb'); //if user wanted to see image let them click and see
    // });
}

var removeListeners=function(){
    $(window).unbind('scroll');
    $('.cookieimage').unbind('click');
    unblurImage();
}

//message listener for background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {
    if(request.command === 'init'){
        addListeners();
    }else{
        removeListeners();
    }
    sendResponse({result: "success"});
});

//on init perform based on chrome stroage value
window.onload=function(){  
    chrome.storage.sync.get('hide', function(data) {
        if(data.hide){
            addListeners();
        }else{
            removeListeners();
        } 
    });
}

