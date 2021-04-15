# Doggos Webpage

## Welcome to our Webpage about dogs!

### *Overview* 
> Website Purpose <p>
> Data: Extracting, Transforming, Loading <p>
> Website Outline <p>
> Reflections on this Project <p>

## Website Purpose
*We love dogs, what more can we say?*  <p>
The purpose of this website is to:
* provide information on dog breeds
* help users find their perfect dog
* provide meaning data visualizations of our doggy data
* AND -last but not least - create a Dungeons&Dragons-style game where users can select dog characters to "play" against each other and see who wins out (cleverly named Dungeons&Doggos).  <p>  <p>

#### Our project had to include the following:
* Python Flask-powered API 
* HTML, CSS, & JavaScript
* One Database (relational or non-relational)
* 1 of 4 Tracks
* A new JS Library not already used in the course
* Dataset with at least 100 records
* User-driven interactions (drop-downs, menus, textboxes)
* Visualizations with at least 3 views

This is how we decided to fulfill these requirements:
* *Python Flask-powered API, HTML, CSS, & JavaScript* - fulfilled when creating the website
* *One Database (relational or non-relational)* - SQL (relational), using Postgres (PgAdmin)
* *1 of 4 Tracks* - custom “creative” D3.js project (i.e., a nonstandard graph or chart)
* *A new JS Library not already used in the course* - Lodash
* *Dataset with at least 100 records* - [The Dog API](https://thedogapi.com/), contains 172 dog breeds!
* *User-driven interactions (drop-downs, menus, textboxes)* - fulfilled when creating the structure of our website (dashboard)
* *Visualizations with at least 3 views* - 4 pages (Dog Breed information, Find Your Perfect Dog, Dog Data Visualization, Dungeons&Doggos) each containing their own unique views of the data
 
## Data: Extracting, Transforming, Loading
*We just need an API of good quality dog data, how hard can that be? Everyone loves dogs!* <p>

When we went on our initial quest in search of basic dog breed information in the form of an API, we stumbled upon [The Dog API](https://thedogapi.com/) website. It showed promising results, as the picture below shows:

![The Dog API Sample](Proposal/readme/thedogapisample.PNG)

#### Hopeful Beginnings
We were excited to have all this data. This API would give us a dog breed name, its life span, country of origin, rarity, a reference image ID (for adding a picture), physical characteristics (short legs, suppressed tail, etc), temperaments, and a wikipedia url. We had come up with a few ideas for how to use this information:
* country of origin - wouldn't it be cool to have a heat map of where dog breeds originated from? Would we see any patterns?
* physical characteristics (short legs, suppressed tail, etc) - we could add these traits to our D&Doggos game as bonuses/penalties to dog abilities (for example, short legs could give a -2 to jumping or a bonus to evasion - we all know how hard tiny animals are to catch)
* temperaments - we could break down this list and look for frequency of each temperament to see what dogs are most commonly bred for
* wikipedia url - if users need more information, we could guide them to wikipedia

#### The Truth Comes Out (Data Cleaning)
In our first steps of data cleaning, we needed to retrieve the API's json information and create a dataframe from this data. This is when we realized what we were really working with:

![The Actual API json](Proposal/readme/datacounts.PNG)
<p>
 
The image above shows a dictionary of all keys given for the dog breeds, the values show how many times those keys came up in the whole set. As you can gather, there were some fields that were either minimal or non-existant ('origin' shows 5 occurances in all 172 dog breed records and phsyical attributes were not included at all). We're not sure what the developers of this API have updated or changed since the example was presented in their documentation, but apparently a lot was missing or had changed drastically. 
## Website Outline

## Reflections on this Project
