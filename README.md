# Plot.ly Dashboard

### By Rodrigo Guarneros

![Bacteria by filterforge.com](Images/microbes-sem.jpg)

This interactive dashboard explores the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

Based on D3, the dashboard building process was integrated by the following teps:

1. Read the dataset in a json format
2. Explore the structure of the database with console.log and console.table functions.
3. Identify and get the key variables for each visualization
4. Use plotly to make visualization and insert ina function getDashboard()
5. Create a function to gather the information from json dataset getInformation ()
6. Create a function related with the attribute onchange related to the dropdown menu optionChanged()
7. Create a function for the initial data rendering init()

The result was a dashboard with a Barchart, Bubble Chart and a Gauge Chart:

![Bacteria by filterforge.com](Images/rodguarneros_result.jpg)

### References and bibliography

Hulcr, J. et al.(2012) _A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable_. Retrieved from: [http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/](http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/)

Code reference: [https://stackoverflow.com/questions/14083524/how-to-extract-values-from-an-array-of-arrays-in-javascript/](https://stackoverflow.com/questions/14083524/how-to-extract-values-from-an-array-of-arrays-in-javascript)

Code reference: [https://plotly.com/javascript/bubble-charts/](https://plotly.com/javascript/bubble-charts/)

Code reference for hover text format: [https://plotly.com/javascript/hover-text-and-formatting/](https://plotly.com/javascript/hover-text-and-formatting/)

- - -
By Rodrigo Guarneros

