參考 : 
	https://github.com/mbostock/d3/wiki/Tutorials
	
0.) what is d3.js
	Data-Driven Documents
	a new visualization library to build visualizations in SVG.
	
1.) 挑選出來範例先 run 過一遍
2.) 按照 introduction 來 run 實作
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------		
		WAT?		Thinking with Joins
		svg circle elements.
			先複習一下 SVG Circle 的寫法
				<svg>
				   <circle cx="100" cy="50" r="40" stroke="black" fill="red" />
				</svg> 
			但是在d3裡我們可以先define一塊畫布出來
				<div id="ida"></div>
				var sampleSVG = 
						d3.select("#ida")		// 先 select 我的 element
							.append("svg:svg")
							.attr("width", 100)		// 畫布的尺寸 (寬)
							.attr("height", 100)		// 畫布的尺寸 (高)
							.style("background-color","gray");
							
			畫布定義好了之後，來畫圈圈
			   sampleIDA.append("svg:circle")
					.style("stroke","red")
					.style("stroke-width","3")
					.style("fill","white")
					.attr("cx","50")
					.attr("cy","50")
					.attr("r","20")
					;
					
			圈圈的 on mouse over 效果
				.on("mouseover", function(){
					d3.select(this).style("fill","yellow");
				})
				.on("mouseout", function(){
					d3.select(this).style("fill","white");
				})
				
			接下來我要它動
			改變 R 屬性：它的大小就跟著變,
			改變 X軸與Y軸：它的位置就改變。
				.on("click", function(){
					console.log("transition start");
					d3.select(this)
					.transition()
					.duration(2000)
					.attr("r", 10)
					.attr("cx", "30")
					.attr("cy", "20")
					console.log("transition end");
				})
	   

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------		
		圈圈的變形
			http://localhost:7000/DDD/I_did/03_animation.htm

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------		
		3個圈圈 	Three Little Circles
			http://localhost:8888/20120711/circle/circle01.htm
			
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------		
		bar chart
			http://localhost:8888/20120711/bar/04_bar_c.htm
			
<div class="chart" id="chart"></div>
<script>
	// 3. 定義我的資料來源
	var data = [2, 16, 28, 25, 29,10];				
	
	// 4. select 我的 div
	var chart = d3.select("#chart");				
	
	// 5. 先把大框框 (畫布) 畫出來, 全部指定 style , 
	//     寬度 + 框框 + 框框的style + 框框的顏色
	chart.style("width", 300)							// 寬度
		.style("text-align","right")
		.style("border", "3px")							// 框框
		.style("border-style", "solid")				// 框框的style
		.style("border-color", "pink");				// 框框的顏色


	// 6. 開始畫長條圖。 
	//     拿出 array + enter() + append("div") + 指定文字.text 
	//     並 return + 長條圖的寬度.style 的 width 並 return + 
	//     長條圖的顏色 + 長條圖的文字顏色 + 長條圖不要黏在一起
	chart.selectAll("div")
		
		// 先把 data 那個 arrya  拿進來
		.data(data)											
		
		// 每個 data 內每個 item  以 enter 作區隔, 從這裡開始以下就是針對每個 item 作處理
		.enter()												
		
		// 將每個 item append 為 div
		.append("div")										
		
		// 各自 item 除了在畫 div 以外,還想讓上頭顯示自己的內容,利用 text func 來回傳自己的 item
		.text(function(item) { 							 
			return item; 
		})
		
		// 各自 item 有自己的 div, 用 div 來畫自己的長條圖
		.style("width", function(item) {			
			return item * 10 + "px"; 					// return 每個 div 的長度
		})
		
		.style("background-color", "steelblue")	// 長條圖的顏色
		.style("color", "white")							// 長條圖的文字顏色
		.style("margin", "1.5px");						// 長條圖不要黏在一起

			
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------		
		pie chart
			http://localhost:8888/20120711/pie/pie02.html
		
<div id="ida"></div>
<script type="text/javascript">

	// 定義我的資料來源
	var 
		data1 = [10, 20, 50, 20, 40],
		data2 = [200, 200, 200, 200, 200],
		data = data1;
	
	// 先定義畫布跟派的位置與外觀
	var w = 500,						// 畫布的寬
	    h = 300,						// 畫布的高
	    r = Math.min(w, h) / 2,	// 派的半徑
	    
		 // 派的外觀：各區塊的顏色與layout, 定義在 d3 的 source 裡, 有興趣的自己看哈~~
	    color = d3.scale.category20(),			
	    donut = d3.layout.pie().sort(null),	 
	    arc = d3.svg.arc().innerRadius(r - 100).outerRadius(r - 20);
	
	// 畫布的屬性
	var svg = d3.select("#ida")
		.append("svg:svg")
	    .attr("width", w)
	    .attr("height", h)
	    .style("background-color","#ffeeff")		// 底色
		.append("svg:g")
	    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
	    ;
	
	// 派裡各區塊的屬性
	var arcs = svg.selectAll("path")
	    .data(donut(data))
		.enter().append("svg:path")
	    .attr("fill", function(d, i) { return color(i); })		// 各區塊的顏色
	    .attr("d", arc)
	    .each(function(d) { this._current = d; });
	
	// 如果我要讓它變換另一組數字
	d3.select("#ida").on("click", function() {
	  data = data === data1 ? data2 : data1; // swap the data
	  arcs = arcs.data(donut(data)); // recompute the angles and rebind the data
	  arcs.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
	});
	
	// Store the currently-displayed angles in this._current.
	// Then, interpolate from this._current to the new angles.
	function arcTween(a) {
	  var i = d3.interpolate(this._current, a);
	  this._current = i(0);
	  return function(t) {
	    return arc(i(t));
	  };
	}




