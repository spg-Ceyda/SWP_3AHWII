
// So liegt der Normalwert bei Männern laut Deutscher Gesellschaft für Ernährung
// im Intervall von 20 bis 25 kg / m², während er sich
// bei Frauen im Intervall von 19 bis 24 kg / m² befindet.

class Person {
    /* Gewicht in kg, Größe in m */
    #name;
    #gewicht;
    #groesse;
    #geschlecht;
    constructor(namePar, gewichtPar, groessePar, geschlechtPar) {
        this.name = namePar;
        this.gewicht = gewichtPar;
        this.groesse = groessePar;
        this.geschlecht = geschlechtPar;

    }

    set name(namePar) {
        if (typeof namePar !== 'string') {
            throw new Error('ungültiger Name');
        }
        if (namePar.length < 3) {
            throw new Error('Name zu kurz');
        }
        this.#name = namePar;
    }

    set gewicht(gewichtPar) {
        // gewicht in kg
        if (gewichtPar < 10 || gewichtPar > 500) {
            throw new Error('ungültiges Gewicht');
        }
        this.#gewicht = gewichtPar;
    }
    get gewicht() {
        return this.#gewicht;
    }
    set groesse(groessePar) {
        if (groessePar < 0.5 || groessePar > 3.0) {
            throw new Error('ungültige Groesse');
        }
        this.#groesse = groessePar;
    }

    set geschlecht(geschlechtPar) {
        if (geschlechtPar !== 'm' && geschlechtPar !== 'w') {
            throw new Error('ungültiges Geschlecht');
        }
        this.#geschlecht = geschlechtPar;
    }

    getbmi() {
        const bmi = this.#gewicht / (this.#groesse * this.#groesse);
        if (this.#geschlecht === 'm') {
            if (bmi < 20) {
                return 'Untergewicht';
            } else if (bmi >= 20 && bmi < 25) {
                return 'Normalgewicht';
            } else if (bmi >= 25) {
                return 'Übergewicht';
            }
        } else if (this.#geschlecht === 'w') {
            if (bmi < 19) {
                return 'Untergewicht';
            } else if (bmi >= 19 && bmi < 24) {
                return 'Normalgewicht';
            } else if (bmi >= 24) {
                return 'Übergewicht';
            }
        }
    }
    
    toString() {
        return `
            Name: ${this.#name} <br>
            Gewicht: ${this.#gewicht} kg <br>
            Größe: ${this.#groesse} m <br>
            Geschlecht: ${this.#geschlecht} <br>
            BMI: ${this.bmi} <br>
            Kategorie: ${this.getbmi()} 
        `;
    }
}

function bmirechnen() {
    const name = document.getElementById('name').value;
    const groesse = parseFloat(document.getElementById('groesse').value);
    const geschlecht = document.getElementById('geschlecht').value;
    const gewicht = parseFloat(document.getElementById('gewicht').value);

    try {
        const person = new Person(name, gewicht, groesse, geschlecht);
        const bmiResult = person.getbmi;
        document.getElementById('ergebnis').innerHTML = 'BMI: ' + bmiResult;
    } catch (error) {
        document.getElementById('ergebnis').innerHTML = 'Fehler: ' + error.message;
    }
}
