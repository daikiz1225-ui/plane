export const UI = {
    showLoading() {
        const grid = document.getElementById('listView');
        grid.innerHTML = '<div class="loading">検索中...</div>';
    },
    renderList(videos, onSelect) {
        const grid = document.getElementById('listView');
        grid.innerHTML = '';
        videos.forEach(v => {
            const card = document.createElement('div');
            card.className = 'video-card';
            card.innerHTML = `
                <img src="${v.snippet.thumbnails.medium.url}">
                <h4>${v.snippet.title}</h4>
            `;
            card.onclick = () => onSelect(v.id.videoId, v.snippet.title);
            grid.appendChild(card);
        });
    },
    switchView(viewName) {
        document.getElementById('listView').style.display = viewName === 'list' ? 'grid' : 'none';
        document.getElementById('watchView').style.display = viewName === 'watch' ? 'flex' : 'none';
    }
};
