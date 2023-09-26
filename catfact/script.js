"use strict";
        const catFactsEl = document.getElementById('cat-facts');
        const loadMoreBtn = document.getElementById('load-more');

        function loadsomeCatFacts() {
            const CAT_URL = `https://cat-fact.herokuapp.com/facts/random?amount=5`;
            fetch(CAT_URL)
           .then(response => response.json())
            .then(responseJson =>
                {
                    catFactsEl.innerHTML = '';
                    for (let fact of responseJson) {
                        const catFact = document.createElement('p');
                        catFact.innerText = fact.text;
                        catFactsEl.append(catFact);
                     }
                })
        .catch(error => console.error('Error',error));
      
            }
