
    class Person {
        #name;
        #gewicht;
        #groesse;
    
        constructor(name, gewichtPar, groesse) {
            this.#name = name;
            this.gewicht = gewichtPar;
            this.groesse = groesse;
        }
    
        get bmi() {return Math.round((this.gewicht / ((this.groesse / 100) ** 2)) * 10) / 10;}
            
    
        set gewicht(gewichtPar) {
            // Gewicht in kg
            if (gewichtPar < 1 || gewichtPar > 500) {
                throw new Error('Ungültiges Gewicht');
            }
            this.#gewicht = gewichtPar;
        }
    
        get gewicht() {
            return this.#gewicht;
        }
    
        set groesse(groesse) {
            // Größe in cm
            if (groesse < 50 || groesse > 300) {
                throw new Error('Ungültige Größe');
            }
            this.#groesse = groesse;
        }
    
        get groesse() {
            return this.#groesse;
        }
    }
    
    p = new Person('Hans', 80, 180);
    console.log(p.gewicht);
    console.log(p.bmi);

    p = new Person('Peter', 95, 175);
    console.log(p.gewicht);
    console.log(p.bmi);

    try {
        p = new Person('Lisa', 65, 165);
        console.log(p);
    } catch (error) {
        console.error(error.message);
    }


    
