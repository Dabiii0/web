document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play-button');
    const startPage = document.getElementById('start-page');
    const categoryPage = document.getElementById('category-page');
    const gamePage = document.getElementById('game-page');
    const resultPage = document.getElementById('result-page');
    const boysButton = document.getElementById('boys-button');
    const girlsButton = document.getElementById('girls-button');
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    const progress = document.getElementById('progress');
    const finalChoice = document.getElementById('final-choice');
    const instaLink = document.getElementById('insta-link');

    let category = '';
    let photos = {};
    let currentChoice = '';
    let level = 1;

    const boysPhotos = [
        { src: 'boys1.jpg', name: 'Boy 1', instagram: 'https://instagram.com/boy1' },
        { src: 'boys2.jpg', name: 'Boy 2', instagram: 'https://instagram.com/boy2' },
        { src: 'boys3.jpg', name: 'Boy 3', instagram: 'https://instagram.com/boy3' }
    ];

    const girlsPhotos = [
        { src: 'girls1.jpg', name: 'Girl 1', instagram: 'https://instagram.com/girl1' },
        { src: 'girls2.jpg', name: 'Girl 2', instagram: 'https://instagram.com/girl2' },
        { src: 'girls3.jpg', name: 'Girl 3', instagram: 'https://instagram.com/girl3' }
    ];

    playButton.addEventListener('click', () => {
        startPage.classList.remove('active');
        startPage.classList.add('hidden');
        categoryPage.classList.remove('hidden');
        categoryPage.classList.add('active');
    });

    boysButton.addEventListener('click', () => startGame('boys'));
    girlsButton.addEventListener('click', () => startGame('girls'));

    function startGame(selectedCategory) {
        category = selectedCategory;
        photos = category === 'boys' ? boysPhotos : girlsPhotos;
        categoryPage.classList.remove('active');
        categoryPage.classList.add('hidden');
        gamePage.classList.remove('hidden');
        gamePage.classList.add('active');
        level = 1;
        currentChoice = '';
        progress.textContent = `Level: ${level}/10`;
        showNewPair();
    }

    function showNewPair() {
        const randomIndexes = getRandomPair();
        image1.src = photos[randomIndexes[0]].src;
        image2.src = photos[randomIndexes[1]].src;

        image1.onclick = () => makeChoice(randomIndexes[0]);
        image2.onclick = () => makeChoice(randomIndexes[1]);
    }

    function makeChoice(selectedIndex) {
        currentChoice = photos[selectedIndex];
        if (level < 10) {
            level++;
            progress.textContent = `Level: ${level}/10`;
            showNewPair();
        } else {
            endGame();
        }
    }

    function endGame() {
        gamePage.classList.remove('active');
        gamePage.classList.add('hidden');
        resultPage.classList.remove('hidden');
        resultPage.classList.add('active');
        finalChoice.src = currentChoice.src;
        document.querySelector('#result-page h2').textContent = `You chose: ${currentChoice.name}`;
        instaLink.href = currentChoice.instagram;
        instaLink.textContent = currentChoice.instagram;
    }

    function getRandomPair() {
        let first, second;
        do {
            first = Math.floor(Math.random() * photos.length);
            second = Math.floor(Math.random() * photos.length);
        } while (first === second);
        return [first, second];
    }
});
