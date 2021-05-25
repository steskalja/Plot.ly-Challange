let opt;
function GetData(row){
    if(+row.id === +opt)
    {   
        return row
    };
}

function BuildDemo(row){
    const dInfo = d3.selectAll('#sample-metadata');
    dInfo.selectAll("*").remove();
    const keycount = Object.keys(row[0]).length;
    for(var j =0; j < keycount; j++)
    {
        dInfo.append("p")
        .text(`${Object.keys(row[0])[j]}: ${Object.values(row[0])[j]}`)
    }
}

function BuildDash(row){
    //const dBar = d3.selectAll('#bar');
    //const dBubble = d3.selectAll('#bubble');
    let dBar = [{
        type: 'bar',
        x: row[0].sample_values.slice(0,10),
        y: row[0].otu_ids.slice(0,10),
        text: row[0].otu_labels.slice(0,10),
        orientation: 'h'
      }];
    let barLayout = {
        showlegend: false,
        xaxis: {
            tickangle: -45
        },
        yaxis: {
            zeroline: false,
            gridwidth: 2
        },
        bargap :0.001
    }

    let dBubble =[{
        x: row[0].otu_ids.slice(0,10),
        y: row[0].sample_values.slice(0,10),
        mode: 'markers',
        marker: {
            color: row[0].otu_ids.slice(0,10),
            opacity: [1, 0.8, 0.6, 0.4],
            size: row[0].sample_values.slice(0,10)
        },
        text: row[0].otu_labels.slice(0,10)    
    }];
    Plotly.newPlot('bar', dBar);
    Plotly.newPlot('bubble', dBubble);
}
d3.json('samples.json').then( d => {
    const dSelect = d3.select('#selDataset');
    d.names.forEach(d => {
        const dOpt = dSelect.append("option");
        dOpt.attr('value',d)
        .text(d);
    })
    optionChanged(d.names[0]);
})

// d3.select('#selDataset').on('change', d => {
//     console.log(d.value);
// })

function optionChanged(o)
{
    opt = o;
    d3.json('samples.json').then( d => {
        
        const dMetadata = d.metadata;
        const dSamples = d.samples;
        const mRows = dMetadata.filter(GetData);
        const sRows = dSamples.filter(GetData);
        BuildDemo(mRows);
        BuildDash(sRows);
        
    })
}