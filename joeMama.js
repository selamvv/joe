var promise = d3.json("penguins/classData.json")

promise.then(function(joe){
    console.log("joe",joe)
    setup(joe)   
},
function(mama){
    console.log("joeMama",mama)
})

var screen = {width: 1280, height: 720};
var margins = {top: 30, right: 50, bottom: 50, left: 50};

var setup = function(classData){
    d3.select("svg")
      .attr("width",screen.width)
      .attr("height", screen.height)
      .append("g")
      .attr("id", "graph")
      .attr("transform", "translate( "+margins.left+","+margins.top+")");

    var width = screen.width - margins.left - margins.right;
    var height = screen.height - margins.top - margins.bottom;
    
    var xScale = d3.scaleLinear()
                .domain([0,40])
                .range([0,width])

    var yScale = d3.scaleLinear()
                .domain([0,10])
                .range([height,0])
    
    var cScale = d3.scaleOrdinal(d3.schemeTableau10)
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    d3.select("svg")
      .append("g")
      .classed("axis", true)
 
    d3.select(".axis")
    .append("g")
    .attr("id","xAxis")
    .attr("transform", "translate("+margins.left+","+(margins.top+height)+")")
    .call(xAxis)
    
    d3.select(".axis")
    .append("g")
    .attr("id","yAxis")
    .attr("transform", "translate(35,"+margins.top+")")
    .call(yAxis)
    
    drawArray(classData, xScale, yScale, cScale);
}

var drawArray = function(classData,xScale,yScale,cScale){
    var arrays = d3.select("#graph")
                .selectAll("g")
                .data(classData)
                .enter()
                .append("g")
                .attr("fill", "none")
                .attr("stroke", function(arr){
                    console.log("arr", arr.picture)
                    return cScale(arr.picture);
                })
                .attr("stroke-width", 3)
    //          .on("mouseover", function(d,i){
                    //d3.select("g").append("text")
                    //.text(d.x)
                    //  .attr("x", x(d.x))
      //  .attr("y", y(d.y)); 
    
    var lineGenerator = d3.line()
    .x(function(num, index){
        return xScale(index)
    })
    .y(function(num){return yScale(num)})
    .curve(d3.curveCardinal)
    
    arrays.datum(function(obj){return quiz(obj)})
        .append('path')
        .attr("d", lineGenerator)
}

var quiz = function(pen){
    var mapQuiz = pen.quizes.map(function(q){
        return q.grade;
    })
    return mapQuiz;
}


