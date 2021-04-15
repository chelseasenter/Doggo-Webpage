/////////////////////////////////////////////////////////////////////////////////////////////////////
// Add js code to connect to SQL database here
/////////////////////////////////////////////////////////////////////////////////////////////////////

 
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Starting with a static list, hopefully find a way to call jupyter list directly (dynamic)
// array to hold the dog breed list (static)
const breeds = ['Affenpinscher',
    'Afghan Hound',
    'African Hunting Dog',
    'Airedale Terrier',
    'Akbash Dog',
    'Akita',
    'Alapaha Blue Blood Bulldog',
    'Alaskan Husky',
    'Alaskan Malamute',
    'American Bulldog',
    'American Bully',
    'American Eskimo Dog',
    'American Eskimo Dog (Miniature)',
    'American Foxhound',
    'American Pit Bull Terrier',
    'American Staffordshire Terrier',
    'American Water Spaniel',
    'Anatolian Shepherd Dog',
    'Appenzeller Sennenhund',
    'Australian Cattle Dog',
    'Australian Kelpie',
    'Australian Shepherd',
    'Australian Terrier',
    'Azawakh',
    'Barbet',
    'Basenji',
    'Basset Bleu de Gascogne',
    'Basset Hound',
    'Beagle',
    'Bearded Collie',
    'Beauceron',
    'Bedlington Terrier',
    'Belgian Malinois',
    'Belgian Tervuren',
    'Bernese Mountain Dog',
    'Bichon Frise',
    'Black and Tan Coonhound',
    'Bloodhound',
    'Bluetick Coonhound',
    'Boerboel',
    'Border Collie',
    'Border Terrier',
    'Boston Terrier',
    'Bouvier des Flandres',
    'Boxer',
    'Boykin Spaniel',
    'Bracco Italiano',
    'Briard',
    'Brittany',
    'Bull Terrier',
    'Bull Terrier (Miniature)',
    'Bullmastiff',
    'Cairn Terrier',
    'Cane Corso',
    'Cardigan Welsh Corgi',
    'Catahoula Leopard Dog',
    'Caucasian Shepherd (Ovcharka)',
    'Cavalier King Charles Spaniel',
    'Chesapeake Bay Retriever',
    'Chinese Crested',
    'Chinese Shar-Pei',
    'Chinook',
    'Chow Chow',
    'Clumber Spaniel',
    'Cocker Spaniel',
    'Cocker Spaniel (American)',
    'Coton de Tulear',
    'Dalmatian',
    'Doberman Pinscher',
    'Dogo Argentino',
    'Dutch Shepherd',
    'English Setter',
    'English Shepherd',
    'English Springer Spaniel',
    'English Toy Spaniel',
    'English Toy Terrier',
    'Eurasier',
    'Field Spaniel',
    'Finnish Lapphund',
    'Finnish Spitz',
    'French Bulldog',
    'German Pinscher',
    'German Shepherd Dog',
    'German Shorthaired Pointer',
    'Giant Schnauzer',
    'Glen of Imaal Terrier',
    'Golden Retriever',
    'Gordon Setter',
    'Great Dane',
    'Great Pyrenees',
    'Greyhound',
    'Griffon Bruxellois',
    'Harrier',
    'Havanese',
    'Irish Setter',
    'Irish Terrier',
    'Irish Wolfhound',
    'Italian Greyhound',
    'Japanese Chin',
    'Japanese Spitz',
    'Keeshond',
    'Komondor',
    'Kooikerhondje',
    'Kuvasz',
    'Labrador Retriever',
    'Lagotto Romagnolo',
    'Lancashire Heeler',
    'Leonberger',
    'Lhasa Apso',
    'Maltese',
    'Miniature American Shepherd',
    'Miniature Pinscher',
    'Miniature Schnauzer',
    'Newfoundland',
    'Norfolk Terrier',
    'Norwich Terrier',
    'Nova Scotia Duck Tolling Retriever',
    'Old English Sheepdog',
    'Olde English Bulldogge',
    'Papillon',
    'Pekingese',
    'Pembroke Welsh Corgi',
    'Perro de Presa Canario',
    'Pharaoh Hound',
    'Plott',
    'Pomeranian',
    'Poodle (Miniature)',
    'Poodle (Toy)',
    'Pug',
    'Puli',
    'Pumi',
    'Rat Terrier',
    'Redbone Coonhound',
    'Rhodesian Ridgeback',
    'Rottweiler',
    'Russian Toy',
    'Saint Bernard',
    'Saluki',
    'Samoyed',
    'Schipperke',
    'Scottish Deerhound',
    'Scottish Terrier',
    'Shetland Sheepdog',
    'Shiba Inu',
    'Shih Tzu',
    'Shiloh Shepherd',
    'Siberian Husky',
    'Silky Terrier',
    'Smooth Fox Terrier',
    'Soft Coated Wheaten Terrier',
    'Spanish Water Dog',
    'Spinone Italiano',
    'Staffordshire Bull Terrier',
    'Standard Schnauzer',
    'Swedish Vallhund',
    'Thai Ridgeback',
    'Tibetan Mastiff',
    'Tibetan Spaniel',
    'Tibetan Terrier',
    'Toy Fox Terrier',
    'Treeing Walker Coonhound',
    'Vizsla',
    'Weimaraner',
    'Welsh Springer Spaniel',
    'West Highland White Terrier',
    'Whippet',
    'White Shepherd',
    'Wire Fox Terrier',
    'Wirehaired Pointing Griffon',
    'Wirehaired Vizsla',
    'Xoloitzcuintli',
    'Yorkshire Terrier'
];

//array to store html to add to the select list
var html = [];

//loop through the array
for (var i = 0; i < breeds.length; i++) {//begin for loop
  
    //add the option elements to the html array
    html.push('<li><a id="' + breeds[i] + '" class="dropdown-item" onclick="submitChoices(\'' + breeds[i] + '\')">' + breeds[i] + '</a></li>')
  }//end for loop
  
  //add the option values to the select list with an id of breed
  document.querySelector(".dropdown-menu").innerHTML = html.join('');
  
/////////////////////////////////////////////////////////////////////////////////////////////////////
// Adding action to submit choices and find dog
/////////////////////////////////////////////////////////////////////////////////////////////////////


function getSQLresults(breedSelection){
    const url = `http://127.0.0.1:5000/dog_breed_info/${breedSelection}`;
    console.log(url)
    return fetch(url).then(response => response.json());
}

function submitChoices(breedSelection){
    // Calling results from SQL
    console.log('Its been clicked');
    console.log(breedSelection);
    getSQLresults(breedSelection).then(response => {
        console.log(response);
        d3.select(".card-body").text(`Awesome! You've selected ${breedSelection}!\n
                    This puppers can live up to ${response[0].mlifespan} years.\n
                    It can grow to be ${response[0].mweight} lbs, and ${response[0].mheight} inches tall! Woof!`);
    });
// image source 
}

/////////////////////////////////////////////////////////////////////////////////////////////////////