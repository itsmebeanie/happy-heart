var myvar;
$.ajax({
    url: 'http://happyheart.azurewebsites.net/api/',
    headers: {
      'Content-Type':'application/json'
    },
    type: 'POST',
    dataType: 'json',
    contentType:"application/json; charset=utf-8",
    data:
    {
        "emotionType": "calm"
    }
});


var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatDate = d3.time.format("%d-%b-%y-%H-%M");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

var svg = d3.select("#d3").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", type, function(error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.close; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
          .append("text")
                            .attr("dx", ".71em")
                            .attr("x",width-30)
          .style("text-anchor", "begin")
      .text("Time (hours)");


	


  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Heartrate(bpm)");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
      
  var g = svg.selectAll(".dot")
            .data(data)
            .enter().append("g")  
            

      g.append("circle")
            .attr("class", "dot")
            .attr("r", 9)
            .attr("cx", function(d) { return x(d.date); })
            .attr("cy", function(d) { return y(d.close); })
            .attr('fill-opacity', 0.5)
           .style('fill',function (d) {return d.color;})
  g.append("text")
            .attr("class", "comments")
.style("font-size","13px")
      .attr("x", function(d) { return x(d.date) + 5 ; })
        .attr("y", function(d) { return y(d.close) - 10; })
                    .attr('fill-opacity', 0.2)

    .text(function(d){
      return d.comment;
    });


      svg.selectAll('circle').on("mouseover", rollover);
            svg.selectAll('.comments').on("mouseover", displayText);

      svg.selectAll('circle, .comments').on("mouseleave",rollaway);

      //svg.selectAll('text').on("mouseover",removeText);
      svg.selectAll('circle').on("click", clickedCircle);

      function rollover(){
        d3.select(this).attr('fill-opacity',1.0);

              }


function displayText(){
        d3.select(this)
                .style("fill","black")
                .attr("stroke-width",1.0)
                .attr("stroke", "black")
                .attr('fill-opacity',0.8);
        

          console.log("bleh");
      }

        function rollaway(){
          d3.select(this).attr('fill-opacity',0.2)
        .attr("stroke","none");
      }




      

        function clickedCircle(){
          console.log(this);
           var $audio = $('<audio />', { 
      autoPlay : 'autoplay',
            src : 'mp3s/satie.mp3'

          });

  
 

   $("body").append( $audio );
  
    setTimeout( function( $audio ){
      $audio.remove();
    }, 4000, $audio );
  
  
          
         
      }

      d3.select(window).on('resize', resize); 

function resize() {
  /*console.log('thishappens');
    // update width

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  d3.select('#graph').attr('width',40);

    // reset x range
    x.range([0, width]);

    // do the actual resize...*/
}

});

function type(d) {
  d.date = formatDate.parse(d.date);
  d.close = +d.close;
  return d;
}