<!-- saved from url=(0048)file:///C:/Users/jxb15/Desktop/Scratch/gist.html -->
<script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js"></script>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
</head>
<body>
    <script type="text/javascript">
    
    $(function(){
        var App = {   // defining app name space, You can rename it as per your project name..
          Models: {},
          Collections: {},
          Views: {}
        };

        App.Models.Person = Backbone.Model.extend({});
        
        var person = new App.Models.Person({name:"Taroon Tyagi", age: 26, occupation: "Graphics Designer"});
        
        console.log(person);

    });
    </script>
</body>
</html>