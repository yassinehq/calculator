
        let operationActuelle = '0';
        let operationPrecedente = '';
        let operateur = null;

       
        const affichageActu = document.getElementById('operationActu');
        const affichagePrec = document.getElementById('operationPrec');


        function effacerTout() {
            operationActuelle = '0';
            operationPrecedente = '';
            operateur = null;
            mettreAJourAffichage();
        }

        
        function supprimerDernier() {
            if (operationActuelle === '0') return;
            operationActuelle = operationActuelle.slice(0, -1);
            if (operationActuelle === '') {
                operationActuelle = '0';
            }
            mettreAJourAffichage();
        }

        
        function ajouterChiffre(chiffre) {
            
            if (chiffre === '.' && operationActuelle.includes('.')) return;
            
            
            if (operationActuelle === '0' && chiffre !== '.') {
                operationActuelle = chiffre;
            } else {
                operationActuelle = operationActuelle + chiffre;
            }
            mettreAJourAffichage();
        }

        function choisirOperation(op) {
            if (operationActuelle === '') return;
            
            
            if (operationPrecedente !== '') {
                calculer();
            }
            
            operateur = op;
            operationPrecedente = operationActuelle;
            operationActuelle = '0';
            mettreAJourAffichage();
        }

        function calculer() {
            let resultat;
            const nombre1 = parseFloat(operationPrecedente);
            const nombre2 = parseFloat(operationActuelle);

            if (isNaN(nombre1) || isNaN(nombre2)) return;
            
            
            if (operateur === '+') {
                resultat = nombre1 + nombre2;
            } else if (operateur === '-') {
                resultat = nombre1 - nombre2;
            } else if (operateur === '*') {
                resultat = nombre1 * nombre2;
            } else if (operateur === '/') {
                resultat = nombre1 / nombre2;
            } else {
                return;
            }
            
            operationActuelle = resultat.toString();
            operateur = null;
            operationPrecedente = '';
            mettreAJourAffichage();
        }

        function mettreAJourAffichage() {
            affichageActu.textContent = operationActuelle;
            
            if (operateur != null) {
                let symbole = operateur === '*' ? '×' : operateur;
                affichagePrec.textContent = operationPrecedente + ' ' + symbole;
            } else {
                affichagePrec.textContent = '';
            }
        }

        document.addEventListener('keydown', function(e) {
            if (e.key >= '0' && e.key <= '9') {
                ajouterChiffre(e.key);
            }

            if (e.key === '.') {
                ajouterChiffre('.');
            }
     
            if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                choisirOperation(e.key);
            }
           
            if (e.key === 'Enter' || e.key === '=') {
                calculer();
            }
         
            if (e.key === 'Escape') {
                effacerTout();
            }
            
            if (e.key === 'Backspace') {
                supprimerDernier();
            }
        });