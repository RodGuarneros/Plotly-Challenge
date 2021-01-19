// ------------------------CREATING A DASHBOARD------------------------------------
// Function to rederize every chart
function getDashboard(id){

// Getting data to make the charts
  d3.json("samples.json").then((data) => {

// --------------------BAR and Bubble Charts--------------------------------------

// We need to operate in data.sample object and having an idea of the structure
// so as to get the key variables: sample_values, otu_ids and otu_labels
        let dat = data["samples"];
        console.table(dat);
// Get the variables needed to the barchart based on id 
        let s =  dat.filter(d => d.id.toString() === id)[0];
        console.log(s)
    
// Values
        let values = s.sample_values.slice(0,10).reverse();
        console.log(values)

//Label values
        let labels = s.otu_ids.slice(0,10).reverse();
        console.log(labels)
    
// create an array with labels requiered in the graph
        let finalLabels = labels.map(d => "OTU " + d);
        console.log(finalLabels)
    
// create a hovertext for our visualization
        let hovertext = s.otu_labels.slice(0,10).reverse();
        console.log(hovertext)
    
        console.log(`Sample Values: ${values}`)
        console.log(`Bacterias: ${finalLabels}`)
        console.log(`hover: ${hovertext}`)
  
// Prepating the trace BARCHART
        let trace = {
            x: values,
            y: finalLabels,
            hovertemplate:  '<i>Frequency of the specie</i>: %{x}' +
                            '<br><i>%{text}</i>',
            text: hovertext,
            hoverlabel: {namelength : 0},
            type: "bar",
            orientation: "h"
        };
// Data array
        let data1 = [trace];

// layout
        let layout = {
            title: "<b>10 Dominant Species<br>in the Belly Button</b>",
            yaxis:{
                tickmode:"linear"
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
              },
            height: 550,
            width: 600
            };

    Plotly.newPlot("bar", data1, layout);
    
// Creating the BUBBLE CHART
        let trace2 = {
          x: s.otu_ids,
          y: s.sample_values,
          hovertemplate:  '<i>Frequency</i>: %{y}' +
                        '<br><i>%{text}</i>'+
                        '<br><b>OTU</b>-%{x}<br>',
          mode: 'markers',
          text: s.otu_labels,
          hoverlabel: {namelength : 0},
          marker: {
            size: s.sample_values,
            color: s.otu_ids
          }
        };
// Data array      
        let data2 = [trace2];
// Layout      
        let layout2 = {
          title: '<b>Relative size of every specie by sample</b>',
          xaxis: { title: "ID-Number" },
          yaxis: { title: "Total number of bacteria in the belly button"},
          showlegend: false,
          height: 800,
          width: 1250
        };
      
    Plotly.newPlot('bubble', data2, layout2);
 
// --------------------GAUGE CHART--------------------------------------

// The key variable is washing frequency (wfreq). This is in the object "metadata",
// inside the database, so we need to filter also by id but in other object

      let dat1 = data["metadata"]
        
      let m = dat1.filter(d => d.id.toString() === id)[0];
      console.log(m)
// getting the wfreq
      let wfreq = parseFloat(m.wfreq);
      console.log(wfreq);

// Defining the trace for gauge chart
      let trace3 = {
      type: 'pie',
      showlegend: false,
      hole: 0.4,
      rotation: 90,
      values: [180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180/9, 180],
      text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
      direction: 'clockwise',
      textinfo: 'text',
      textposition: 'inside',
      marker: {
        colors: ['#F8F3EC','#F4F1E5','#E9E6CA','#E2E4B1','#D5E49D','#B7CC92','#8CBF88','#8ABB8F','#85B48A','white'],
        labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9',''],
        hoverinfo: "label"
        },
      hoverinfo: "skip"
    };

// Defining the dot where the needle "originates"
      let dot = {
        type: 'scatter',
        x: [0],
        y: [0],
        marker: {
          size: 17,
          color:'Blue'
        },
        showlegend: false,
        hoverinfo: "skip"
      };

// Defining weights to define degrees (a monotonal transformation)
      let weight = 0;
        if (wfreq == 2 || wfreq == 3){
          weight = 3;
      } else if (wfreq == 4){
          weight = 1;
      } else if (wfreq == 5){
          weight = -.5;
      } else if (wfreq == 6){
          weight = -2;
      } else if (wfreq == 7){
          weight = -3;
  };

// The operations for transformation of wfreq to degrees (20 degrees to each 9 gauge sections)
      let degrees = 180-(20 * wfreq + weight); 
      let radius = 0.5;
      let radians = (degrees * Math.PI) / 180;
      let x = radius * Math.cos(radians);
      let y = radius * Math.sin(radians);

  // Path: may have to change to create a better triangle
      let mainPath = "M -.0 -0.05 L .0 0.05 L ";
      let pathX = String(x);
      let space = " ";
      let pathY = String(y);
      let pathEnd = " Z";
      let path = mainPath.concat(pathX, space, pathY, pathEnd);

      let gaugeLayout = {
        title: "<b>Washing Frequency<br>Scrubs per Week</b>",
        height: 550,
        width: 550,
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: 'red',
              line: {
                color: 'red'
              }
        }],
        xaxis: {zeroline:false, 
                showticklabels:false,
                showgrid: false, 
                range: [-1, 1],
                fixedrange: false
              },
        yaxis: {zeroline: false, 
                showticklabels:false,
                showgrid: false, 
                range: [-1, 1],
                fixedrange: false
            }
  };

    Plotly.newPlot("gauge", [trace3, dot], gaugeLayout);

})
    
};

    
// Prepare the function to gather information from the data base
function getInformation(id) {
    // read the json file to get data
    d3.json("samples.json").then((data)=> {
        
        // get the metadata info for the demographic panel
        let metadata = data.metadata;

        console.log(metadata)

        // filter meta data info by id
        let result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select demographic panel to put data
        let demographicInfo = d3.select("#sample-metadata");
        
        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((k) => {   
                demographicInfo.append("h5").text(k[0].toUpperCase() + ": " + k[1] + "\n");
                
                
        });
    });

}

// create the function for the change event
function optionChanged(id) {
    getDashboard(id);
    getInformation(id);
}

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
        let dropdown = d3.select("#selDataset");

    // read the data 
        d3.json("samples.json").then((data)=> {
          console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
          getDashboard(data.names[0]);
          getInformation(data.names[0]);
      });
}

init();
