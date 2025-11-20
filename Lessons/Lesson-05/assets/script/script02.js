fetch('/assets/data/MOCK_DATA.json')
  .then(response => response.json()) 
  .then(data => displayData(data))
  .catch(error => displayError(error)); 

  function displayData(data) {
    console.log(data);

    // Filter
    const FILTERED = data.filter((obj) => obj.age > 20 && obj.age < 39 );
    // const SUB_FILTER = FILTERED.filter((obj) => obj.gender == any );
    console.log(FILTERED.length);

    // SORT
    const SORT = FILTERED.sort((a,b) => a.age - b.age );

    // const SORT_NAME = SUB_FILTER.sort((a,b) => a.first_name.localeCompare(b.first_name) );

    for (let person of FILTERED) {

    // PERSON
    const PERSON = document.createElement('li');
    const PERSON_INFO = document.createElement('div');
    
    PERSON_INFO.textContent = `${person.first_name} ${person.last_name} ${person.gender} ${person.age}`;
    CONTAINER.appendChild(PERSON_INFO);


    // BAR
    const BAR = document.createElement('div');

    CONTAINER.appendChild(BAR);

    // BAR.style.backgroundColor = 'lightblue';
    // BAR.style.height = '20px';
    
    const BAR_WIDTH = person.age * 5;
    BAR.style.width = `${BAR_WIDTH}px`;
    BAR.className = 'bar';

    let BAR_COLOR = 'lightblue';
    if (person.gender == 'Female') {
        BAR_COLOR = 'lightcoral';
    }
    else if (person.gender == 'Male') {
        BAR_COLOR = 'lightseagreen';
    }


    BAR.style.backgroundColor = BAR_COLOR;
}
  }
  function displayError(error) {
    console.error('Error:', error);
  }