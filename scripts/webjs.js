
/*

TITLE:			WebJS Framework
DESCRIPTION:	WebJS is a web framework for client side web development.
VERSION:		2.0 2019-11-28
CODE:			github.com/ivoprogram/webjs
LICENSE:		GNU General Public License v3.0 http://www.gnu.org/licenses/gpl.html
DEPENDENCY:     JQuery

AUTHOR:			Ivo Gjorgjievski
WEBSITE:		ivoprogram.github.io

*/


// Global object
var webjs = webjs || {};

// Closure 
(function () {

    var homePage = "home.html";

    // ready
    $(document).ready(function () {
        init();

    }); // $(document).ready


    // init
    function init() {

         // Check if initialized.
        if (webjs.init) { return; }
        else { webjs.init = true; }

        // Add event handlers on links 
        $("a").on("click", webjs.contentRequest);

        // Load home page
        webjs.contentLoad(homeUrl());

    } // function


    // homeUrl
    function homeUrl() {

        // Get home url from variable or url parameters
        var url = homePage;

        if (document.URL.indexOf("c=") !== -1)
        {
            url = document.URL.split("c=")[1];
        }

        if (document.URL.indexOf("content=") !== -1) {
            url = document.URL.split("content=")[1];
        }

        if (document.URL.indexOf("a=") !== -1) {
            url = "articles/" + document.URL.split("a=")[1];
        }

        if (document.URL.indexOf("article=") !== -1) {
            url = "articles/" + document.URL.split("article=")[1];
        }

        url = url.split("?")[0];    // Remove additional parameters
        url = url.split("&")[0];

        return url;

    } // function


    // contentRequest
    webjs.contentRequest = function (event) {

        // Avoid target
        if ($(this).attr("target")) {
            return;
        }

        // Avoid anchors
        if ($(this).context.hash.indexOf("#") === 0) {
            return;
        }

        // Stop click propagation
        event.preventDefault();

        // Load url in content area
        var url = $(this).context.href;
        webjs.contentLoad(url);

    }// function


    // Load url in content area
    webjs.contentLoad = function (url) {

        var content = $("<html></html>");

        $(content).load(url, function (response, status, xhr) {

            // If error
            if (status != "success") {
                console.log(xhr.statusText + " url: " + url);
                return;
            }

            // Filter content, replace, scroll
            content.find("title,meta,link,script").remove();
            $(".content").html($(content).html());
            window.scrollTo(0, 0);

            // Event handlers
            $(".content a").on("click", webjs.contentRequest);
            $(".content").trigger("ready");

        });
    } // function


}()); // Closure 




