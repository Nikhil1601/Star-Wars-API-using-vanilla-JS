
document.addEventListener("DOMContentLoaded", async () => {
    
    const storedType = sessionStorage.getItem('selectedTab');
    
    if (!storedType || storedType === 'people') {
        await fetchPeople();
        console.log('hiiiii');
        document.getElementById('people').classList.add('active');
    } 
    else if (storedType === 'films') {
        await fetchFilms();
        console.log('hiii');
        document.getElementById('films').classList.add('active');
    }

    document.getElementById('people').addEventListener('click', async () => {
        await fetchPeople();
        sessionStorage.setItem('selectedTab', 'people');
    });

    document.getElementById('films').addEventListener('click', async () => {
        console.log('hi');
        sessionStorage.setItem('selectedTab', 'films');
        await fetchFilms();
    });
});

const fetchPeople = async () => {
    console.log("fetching people...");
    try {
        const res = await axios.get('https://swapi.dev/api/people/');
        const peopleList = document.getElementById('maintab');
        peopleList.className = 'row';
        peopleList.innerHTML = '';
        res.data.results.forEach(ele => {
            const title = createTile(ele, 'people');
            title.addEventListener('click', () => showDetail(ele));
            peopleList.appendChild(title);
        });
    } catch (error) {
        console.log('Error fetching people', error);
    }
};

const fetchFilms = async () => {
    console.log("Fetching films...");
    try {
        const res = await axios.get('https://swapi.dev/api/films/');
        const filmsList = document.getElementById('maintab');
        filmsList.className = 'row';
        filmsList.innerHTML = '';
        res.data.results.forEach(ele => {
            const tile = createTile(ele, 'films');
            tile.addEventListener('click', () => showDetail(ele));
            filmsList.appendChild(tile);
        });
    } catch (error) {
        console.error('Error fetching films:', error);
    }
};

const createTile = (item, type) => {
    const tile = document.createElement('div');
    tile.classList.add('col-md-4', 'mb-3');
    tile.innerHTML = `
        <div class="card bg-dark text-white h-100">
            <div class="card-body d-flex flex-column justify-content-between">
                <h5 class="card-title">${item.name || item.title}</h5>
                <p class="card-text">${item.birth_year || item.opening_crawl}</p>
                <p class="card-text">Created On: ${item.created}</p>
                <button class="btn bg-warning text-dark" onclick="showDetail('${type}', '${item.url}')">Read More</button>
                </div>
        </div>`;

    return tile;
};

const showDetail = (type, url) => {
    const entityId = url.split('/').filter(Boolean).pop();
    window.location.href = `details.html?type=${type}&id=${entityId}`;
};

