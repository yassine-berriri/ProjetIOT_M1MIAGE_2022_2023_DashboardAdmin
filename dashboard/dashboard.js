
/******/
document.addEventListener('DOMContentLoaded', async () => {
  const tableBody = document.querySelector('#table-body');

  try {
    const response = await fetch('https://iot-27a4.onrender.com/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    let data = await response.json();

    console.log("data =", data);

    const uniqueItems = []; // Tableau pour stocker les éléments uniques

    for (const item of data) {
      // Vérifier si l'élément existe déjà dans le tableau uniqueItems
      const duplicateItems = uniqueItems.filter(existingItem =>
        existingItem.id_user === item.id_user && existingItem.id_piscine === item.id_piscine
      );

      if (duplicateItems.length === 0) {
        // L'élément est unique, l'ajouter au tableau uniqueItems
        uniqueItems.push(item);
      } else if (duplicateItems.length === 1) {
        // La deuxième occurrence de l'élément, afficher cette occurrence
        const existingItem = duplicateItems[0];
        Object.assign(existingItem, item); // Remplacer les valeurs de l'élément existant
      }
    }

    for (const item of uniqueItems) {
      // ... le reste du code pour créer les lignes du tableau
      console.log("Unique item", item);
      const row = document.createElement('tr');

      const idUserCell = document.createElement('td');
      idUserCell.textContent = item.id_user;
      row.appendChild(idUserCell);

      const nomUserCell = document.createElement('td');
      nomUserCell.textContent = item.Nom_user;
      row.appendChild(nomUserCell);

      const idPiscineCell = document.createElement('td');
      idPiscineCell.textContent = item.id_piscine;
      row.appendChild(idPiscineCell);

      const distanceCell = document.createElement('td');
      distanceCell.textContent = item.distance;
      row.appendChild(distanceCell);


      const ville = await findVille(item.lan_piscine, item.lat_piscine);
      const villeCell = document.createElement('td');
      villeCell.textContent = ville;
      row.appendChild(villeCell);

     
      /*
      const lanPiscineCell = document.createElement('td');
      lanPiscineCell.textContent = item.lan_piscine;
      row.appendChild(lanPiscineCell);

      const latPiscineCell = document.createElement('td');
      latPiscineCell.textContent = item.lat_piscine;
      row.appendChild(latPiscineCell);
      */

      const tempPiscineCell = document.createElement('td');
      tempPiscineCell.textContent = item.temp_piscine;
      row.appendChild(tempPiscineCell);

      
      const dateEntreeCell = document.createElement('td');
      dateEntreeCell.textContent = item.Date_d_entree;
      row.appendChild(dateEntreeCell);

      const dateSortieCell = document.createElement('td');
      if(item.Date_d_sortie == "00/00/0000")
      {
        dateSortieCell.textContent = "n'est pas sortie";
      }
      else {
        dateSortieCell.textContent = item.Date_d_sortie;
      }
      
      row.appendChild(dateSortieCell);

      const etatLedCell = document.createElement('td');

      const ledSpan = document.createElement('span');
      if (item.etat_led) {
      ledSpan.innerText = 'Rouge';
      ledSpan.style.color = 'red';
      } else {
  ledSpan.innerText = 'Vert';
  ledSpan.style.color = 'green';
}

  etatLedCell.appendChild(ledSpan);
  row.appendChild(etatLedCell);
  tableBody.appendChild(row);
    

      // Le reste des cellules de données...

      tableBody.appendChild(row);
    }
  } catch (error) {
    console.error(error);
  }
});


async function findVille(lan, lat) {
  console.log("latitude :", lat);
  console.log("lan :", lan);

  const apiUrl = `https://geocode.xyz/${lan},${lat}?json=1&auth=965827557143594293525x5792`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    
    if (data.error) {
      throw new Error(data.error.description);
    }
    const ville = data.city;

     // Filtrer les résultats pour la Côte d'Azur
     
     const isCoteAzur = checkCoteAzur(lat, lan);
     if (isCoteAzur) {
       console.log("Ville de la Côte d'Azur :", ville);
     } else {
       console.log("Ville en dehors de la Côte d'Azur :", ville);
     }
    //console.log("ville" + data);
    console.log("Données de l'API :", JSON.stringify(data, null, 2));

    return ville;
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la recherche de la ville :', error);
    return null;
  }
}

function checkCoteAzur(lat, lon) {
  // Coordonnées approximatives de la Côte d'Azur
  const coteAzurLatMin = 43.3;
  const coteAzurLatMax = 43.9;
  const coteAzurLonMin = 6.9;
  const coteAzurLonMax = 7.6;

  if (lat >= coteAzurLatMin && lat <= coteAzurLatMax && lon >= coteAzurLonMin && lon <= coteAzurLonMax) {
    return true;
  } else {
    return false;
  }
}

